import fs from "fs";

export function updateSection(readmePath, newMarkdown, headerTitle) {
  const start = "<!--LATEST_RELEASES_START-->";
  const end = "<!--LATEST_RELEASES_END-->";

  const readme = fs.readFileSync(readmePath, "utf8");
  const regex = new RegExp(`${start}[\\s\\S]*?${end}`, "m");

  if (!regex.test(readme)) {
    console.error(
      `❌ Markers not found in ${readmePath}.\n` +
        `Please add the following to your README before running this action:\n\n` +
        `${start}\n\n${end}\n`
    );
    if (process.env.GITHUB_ACTIONS) process.exit(1);
    else console.warn("⚠️ Skipping README update (markers missing).");
  }

  const content = `${start}\n\n${headerTitle}\n\n${newMarkdown}\n${end}`;
  const updated = readme.replace(regex, content);
  fs.writeFileSync(readmePath, updated);
  console.log("✅ README updated successfully.");
}
