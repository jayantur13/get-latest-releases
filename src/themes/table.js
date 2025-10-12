const { formatDate } = require("../utils/format.js");

function renderTable(
  releases,
  footerText,
  actorUrl,
  includeBody = true,
  showGlobalFooter = true,
  dateFormat = "ISO"
) {
  const rows = releases
    .map((r) => {
      const preBadge = r.prerelease ? " (⚠️ *Pre-release*)" : "";
      const dateStr = formatDate(r.published_at, dateFormat);
      return `| [${r.repo}](${r.html_url}) | ${r.tag_name}${preBadge} | ${dateStr} |`;
    })
    .join("\n");

  const detailsSection =
    includeBody && releases.some((r) => r.body)
      ? "\n\n---\n\n" +
        releases
          .filter((r) => r.body)
          .map((r) => {
            const releasesUrl = `https://github.com/${r.repo}/releases`;
            return [
              `<details>`,
              `<summary><strong>${r.repo} ${r.tag_name}</strong> – Details</summary>`,
              "",
              r.body.split("\n").slice(0, 20).join("\n"),
              "",
              `[🔗 See all releases →](${releasesUrl})`,
              `</details>`,
            ].join("\n");
          })
          .join("\n\n")
      : "";

  const footer =
    showGlobalFooter && footerText && actorUrl
      ? `\n\n[${footerText}](${actorUrl})`
      : "";

  return [
    "| Repository | Tag | Date |",
    "|-------------|-----|------|",
    rows.trim(),
    detailsSection.trim(),
    footer.trim(),
  ]
    .filter(Boolean)
    .join("\n")
    .trim();
}

module.exports = { renderTable };
