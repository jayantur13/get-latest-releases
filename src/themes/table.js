import { formatDate } from "../utils/format.js";

export function renderTable(
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
      return `| [${r.repo}](${r.html_url}) | ${
        r.tag_name
      }${preBadge} | ${formatDate(r.published_at, dateFormat)} |`;
    })
    .join("\n");

  const detailsSection =
    includeBody && releases.some((r) => r.body)
      ? "\n\n---\n\n" +
        releases
          .filter((r) => r.body)
          .map((r) => {
            const releasesUrl = `https://github.com/${r.repo}/releases`;
            return `<details>\n<summary><strong>${r.repo} ${
              r.tag_name
            }</strong> – Details</summary>\n\n${r.body
              .split("\n")
              .slice(0, 20)
              .join(
                "\n"
              )}\n\n[🔗 See all releases →](${releasesUrl})\n\n</details>`;
          })
          .join("\n\n")
      : "";

  // 🩵 Footer should always come *after* the details section for readability
  const footer =
    showGlobalFooter && footerText && actorUrl
      ? `\n\n[${footerText}](${actorUrl})`
      : "";

  return `| Repository | Tag | Date |
|-------------|-----|------|
${rows}${detailsSection}${footer}`;
}
