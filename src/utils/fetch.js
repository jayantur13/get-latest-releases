import fetch from "node-fetch";

export async function getLatestRelease(repo, { headers, excludePrereleases = true }) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases`, { headers });
    if (!res.ok) throw new Error(`Failed to fetch ${repo}: ${res.statusText}`);

    const releases = await res.json();
    if (!Array.isArray(releases) || !releases.length) return null;

    const release = excludePrereleases
      ? releases.find((r) => !r.prerelease)
      : releases[0];

    if (!release) return null;

    return {
      repo,
      tag_name: release.tag_name,
      html_url: release.html_url,
      published_at: release.published_at,
      body: release.body || "",
      name: release.name || release.tag_name,
      prerelease: release.prerelease || false,
    };
  } catch (err) {
    console.error(`❌ Error fetching ${repo}: ${err.message}`);
    return null;
  }
}
