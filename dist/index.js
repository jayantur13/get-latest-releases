import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ({

/***/ 679:
/***/ ((module) => {

module.exports = eval("require")("./src/themes/card.js");


/***/ }),

/***/ 732:
/***/ ((module) => {

module.exports = eval("require")("./src/themes/compact.js");


/***/ }),

/***/ 233:
/***/ ((module) => {

module.exports = eval("require")("./src/themes/list.js");


/***/ }),

/***/ 473:
/***/ ((module) => {

module.exports = eval("require")("./src/themes/table.js");


/***/ }),

/***/ 259:
/***/ ((module) => {

module.exports = eval("require")("./src/utils/commit.js");


/***/ }),

/***/ 672:
/***/ ((module) => {

module.exports = eval("require")("./src/utils/fetch.js");


/***/ }),

/***/ 547:
/***/ ((module) => {

module.exports = eval("require")("./src/utils/markdown.js");


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__nccwpck_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__nccwpck_require__.d(__webpack_exports__, {
  A: () => (/* binding */ run)
});

// EXTERNAL MODULE: ./node_modules/@vercel/ncc/dist/ncc/@@notfound.js?./src/utils/fetch.js
var fetch = __nccwpck_require__(672);
// EXTERNAL MODULE: ./node_modules/@vercel/ncc/dist/ncc/@@notfound.js?./src/utils/markdown.js
var utils_markdown = __nccwpck_require__(547);
// EXTERNAL MODULE: ./node_modules/@vercel/ncc/dist/ncc/@@notfound.js?./src/utils/commit.js
var commit = __nccwpck_require__(259);
// EXTERNAL MODULE: ./node_modules/@vercel/ncc/dist/ncc/@@notfound.js?./src/themes/table.js
var table = __nccwpck_require__(473);
// EXTERNAL MODULE: ./node_modules/@vercel/ncc/dist/ncc/@@notfound.js?./src/themes/list.js
var list = __nccwpck_require__(233);
// EXTERNAL MODULE: ./node_modules/@vercel/ncc/dist/ncc/@@notfound.js?./src/themes/card.js
var card = __nccwpck_require__(679);
// EXTERNAL MODULE: ./node_modules/@vercel/ncc/dist/ncc/@@notfound.js?./src/themes/compact.js
var compact = __nccwpck_require__(732);
;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fs");
;// CONCATENATED MODULE: ./src/index.js









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

async function run() {
  console.log("📘 Checking README.md for release section markers...");
  const readme = external_fs_namespaceObject.existsSync(README) ? external_fs_namespaceObject.readFileSync(README, "utf8") : "";

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
        (0,fetch.getLatestRelease)(r, { headers, excludePrereleases: EXCLUDE_PRE })
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
      render = list.renderList;
      break;
    case "card":
      render = card.renderCard;
      break;
    case "compact":
      render = compact.renderCompact;
      break;
    default:
      render = table.renderTable;
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

  if (external_fs_namespaceObject.existsSync(LAST_FILE)) {
    try {
      lastReleases = JSON.parse(external_fs_namespaceObject.readFileSync(LAST_FILE, "utf8"));
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
  (0,utils_markdown.updateSection)(README, markdown, HEADER ?? "");

  // Save latest state
  external_fs_namespaceObject.writeFileSync(LAST_FILE, JSON.stringify(newTags, null, 2));

  if (AUTO_COMMIT) {
    console.log("🪄 Auto-commit enabled — committing README changes...");
    (0,commit.autoCommit)(README);
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

var __webpack_exports__default = __webpack_exports__.A;
export { __webpack_exports__default as default };
