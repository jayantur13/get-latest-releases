import { formatDate } from "../utils/format.js";

export function renderList(
  releases,
  footerText,
  actorUrl,
  includeBody = true,
  showGlobalFooter = true,
  dateFormat = "ISO"
) {
  const markdown = releases
    .map((r) => {
      // 🏷️ Add badge if prerelease
      const preBadge = r.prerelease ? " ⚠️ *Pre-release*" : "";
      const releasesUrl = `https://github.com/${r.repo}/releases`;
      const header = `### [${r.repo}](${r.html_url}) — **${
        r.tag_name
      }**${preBadge} (${formatDate(r.published_at, dateFormat)})`;

      const bodySection =
        includeBody && r.body
          ? `\n<details>\n<summary>🔍 View Release Details</summary>\n\n${r.body
              .split("\n")
              .slice(0, 20)
              .join(
                "\n"
              )}\n\n[🔗 See all releases →](${releasesUrl})\n\n</details>`
          : `\n[🔗 See all releases →](${releasesUrl})`;

      return `${header}${bodySection}`;
    })
    .join("\n\n");

  return `\n${markdown}\n${
    showGlobalFooter ? `\n\n[${footerText}](${actorUrl})` : ""
  }`;
}
