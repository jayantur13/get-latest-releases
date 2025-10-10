import { formatDate } from "../utils/format.js";

export function renderCard(releases, footerText, actorUrl, includeBody = true, showGlobalFooter = true, dateFormat = "ISO") {
  const markdown = releases
    .map((r) => {
      const releasesUrl = `https://github.com/${r.repo}/releases`;
      // 🏷️ Add badge if prerelease
      const preBadge = r.prerelease ? " ⚠️ *Pre-release*" : "";
      const header = `> 💠 **[${r.repo}](${r.html_url}) — ${r.tag_name}**  \n>${preBadge} _${formatDate(r.published_at, dateFormat)}_`;
      const body =
        includeBody && r.body
          ? `\n> <details>\n> <summary>📜 View details</summary>\n>\n> ${r.body
              .split("\n")
              .slice(0, 15)
              .map((line) => `> ${line}`)
              .join("\n")}\n>\n> [🔗 See all releases →](${releasesUrl})\n>\n> </details>`
          : `\n> [🔗 See all releases →](${releasesUrl})`;

      return `${header}${body}`;
    })
    .join("\n\n");

  return `\n${markdown}\n${showGlobalFooter ? `\n\n[${footerText}](${actorUrl})` : ""}`;
}

