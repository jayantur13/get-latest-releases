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
      const preBadge = r.prerelease ? " ⚠️ *Pre-release*" : "";
      const releasesUrl = `https://github.com/${r.repo}/releases`;
      const dateStr = formatDate(r.published_at, dateFormat);

      const header = `### [${r.repo}](${r.html_url}) — **${r.tag_name}**${preBadge}${
        dateStr ? ` (${dateStr})` : ""
      }`;

      const bodySection =
        includeBody && r.body
          ? [
              "<details>",
              "<summary>🔍 View Release Details</summary>",
              "",
              r.body.split("\n").slice(0, 20).join("\n"),
              "",
              `[🔗 See all releases →](${releasesUrl})`,
              "</details>",
            ].join("\n")
          : `[🔗 See all releases →](${releasesUrl})`;

      return `${header}\n${bodySection}`.trim();
    })
    .join("\n\n");

  return `${markdown.trim()}${
    showGlobalFooter ? `\n\n[${footerText}](${actorUrl})` : ""
  }`;
}
