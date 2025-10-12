import { getLatestRelease } from "./src/utils/fetch.js";
import { updateSection } from "./src/utils/markdown.js";
import { autoCommit } from "./src/utils/commit.js";
import { renderTable } from "./src/themes/table.js";
import { renderList } from "./src/themes/list.js";
import { renderCard } from "./src/themes/card.js";
import { renderCompact } from "./src/themes/compact.js";
import fs from "fs";

const INPUT = (name, def) => process.env[`INPUT_${name.toUpperCase()}`] || def;

const REPOS = INPUT("repos", "")
  .split("\n")
  .map((r) => r.trim())
  .filter(Boolean);
const TOKEN = INPUT("token", "");
const MAX = parseInt(INPUT("max_repos", "5"));
const INCLUDE_BODY = INPUT("include_body", "true") === "true";
const EXCLUDE_PRE = INPUT("exclude_prereleases", "true") === "true";
const THEME = INPUT("theme", "table");
const HEADER_INPUT = INPUT("header_title", "").trim();
const HEADER = HEADER_INPUT ? HEADER_INPUT : "";
const FOOTER = INPUT("footer_link_text", "Explore More →");
const SHOW_GLOBAL_FOOTER = INPUT("show_global_footer") === "true";
const DATE_FORMAT = INPUT("date_format", "ISO");
const SKIP_IF_NO_CHANGE = INPUT("skip_if_no_change", "true") === "true";
const AUTO_COMMIT = INPUT("auto_commit", "false") === "true";
const README = INPUT("readme_path", "README.md");
const ACTOR = process.env.GITHUB_ACTOR || "user";
const headers = TOKEN ? { Authorization: `token ${TOKEN}` } : {};

if (!REPOS.length) {
  console.error("❌ No repositories specified.");
  process.exit(1);
}

export default async function run() {
  console.log("📘 Checking README.md for release section markers...");
  const readme = fs.existsSync(README) ? fs.readFileSync(README, "utf8") : "";

  if (
    !readme.includes("<!--LATEST_RELEASES_START-->") ||
    !readme.includes("<!--LATEST_RELEASES_END-->")
  ) {
    console.error(
      `❌ Required markers not found in ${README}.\n` +
        `Please add the following section to your README before running this action:\n\n` +
        `<!--LATEST_RELEASES_START-->\n\n<!--LATEST_RELEASES_END-->\n`
    );
    process.exit(1);
  }

  console.log(`🔍 Fetching latest releases for ${REPOS.length} repo(s)...`);

  const results = (
    await Promise.all(
      REPOS.map((r) =>
        getLatestRelease(r, { headers, excludePrereleases: EXCLUDE_PRE })
      )
    )
  )
    .filter(Boolean)
    .slice(0, MAX);

  console.log(`📦 ${results.length} release(s) fetched successfully.`);

  // Pick renderer
  let render;
  switch (THEME) {
    case "list":
      render = renderList;
      break;
    case "card":
      render = renderCard;
      break;
    case "compact":
      render = renderCompact;
      break;
    default:
      render = renderTable;
  }

  const actorUrl = ACTOR ? `https://github.com/${ACTOR}?tab=repositories` : "";
  const markdown = render(
    results,
    FOOTER,
    actorUrl,
    INCLUDE_BODY,
    SHOW_GLOBAL_FOOTER,
    DATE_FORMAT
  );

  console.log("🔍 Checking for changes...");
  const LAST_FILE = ".last-releases.json";
  let lastReleases = {};

  if (fs.existsSync(LAST_FILE)) {
    try {
      lastReleases = JSON.parse(fs.readFileSync(LAST_FILE, "utf8"));
    } catch {
      console.warn(
        "⚠️  Could not parse .last-releases.json — continuing fresh."
      );
    }
  }

  // Map new release tags
  const newTags = Object.fromEntries(results.map((r) => [r.repo, r.tag_name]));

  // Compare old vs new
  const hasChanges = Object.keys(newTags).some(
    (repo) => newTags[repo] !== lastReleases[repo]
  );

  if (SKIP_IF_NO_CHANGE && !hasChanges) {
    console.log(
      "⏭️  No new releases detected — skipping README update and commit."
    );
    process.exit(0);
  }

  // Proceed only if there are new releases
  console.log("🧾 Updating README.md section...");
  updateSection(README, markdown, HEADER ?? "");

  // Save latest state
  fs.writeFileSync(LAST_FILE, JSON.stringify(newTags, null, 2));

  if (AUTO_COMMIT) {
    console.log("🪄 Auto-commit enabled — committing README changes...");
    autoCommit(README);
  } else {
    console.log("✅ Done! (Auto-commit disabled)");
  }
}

// Only auto-run if not being imported (i.e. in GitHub Actions or direct CLI use)
if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}

if (import.meta.url !== `file://${process.argv[1]}` && process.env.DEBUG) {
  console.log("🧪 Index.js imported (not auto-running)...");
}
