import { formatDate } from "../utils/format.js";

export function renderCard(
  releases,
  footerText,
  actorUrl,
  includeBody = true,
  showGlobalFooter = true,
  dateFormat = "ISO"
) {
  const markdown = releases
    .map((r) => {
      const releasesUrl = `https://github.com/${r.repo}/releases`;
      const preBadge = r.prerelease ? " ⚠️ *Pre-release*" : "";
      const formattedDate = formatDate(r.published_at, dateFormat);

      // Header line (no trailing extra blank lines)
      const header = `> 💠 **[${r.repo}](${r.html_url}) — ${r.tag_name}**${
        preBadge ? `  \n> ${preBadge}` : ""
      }${formattedDate ? ` _${formattedDate}_` : ""}`;

      // Body section (trimmed to avoid excess blank lines)
      const body =
        includeBody && r.body
          ? [
              "",
              "> <details>",
              "> <summary>📜 View details</summary>",
              ">",
              ...r.body
                .split("\n")
                .slice(0, 15)
                .map((line) => `> ${line}`),
              ">",
              `> [🔗 See all releases →](${releasesUrl})`,
              "> </details>",
            ].join("\n")
          : `\n> [🔗 See all releases →](${releasesUrl})`;

      return `${header}${body}`;
    })
    .join("\n\n");

  // Final return: trim overall markdown to avoid extra gaps if header_title=""
  return `${markdown.trim()}${
    showGlobalFooter ? `\n\n[${footerText}](${actorUrl})` : ""
  }`;
}

