<p align="center">
  <img src="/src/assets/update-svgrepo-com.svg" width="80" />
  <h2 align="center">🪄 Get Latest Releases</h2>
  <p align="center">
    Keep your README automatically updated with the latest releases from your favorite GitHub repositories.
  </p>
</p>

<p align="center">
  <a href="https://github.com/marketplace/actions/get-latest-releases"><img src="https://img.shields.io/badge/GitHub%20Marketplace-Get%20Latest%20Releases-blue?logo=github" alt="Marketplace" /></a>
  <a href="https://github.com/jayantur13/get-latest-releases/actions"><img src="https://github.com/jayantur13/get-latest-releases/actions/workflows/latest-releases.yml/badge.svg" alt="Build Status" /></a>
  <a href="https://github.com/jayantur13/get-latest-releases/blob/main/LICENSE"><img src="https://img.shields.io/github/license/jayantur13/get-latest-releases" alt="License" /></a>
</p>

---

## 🌟 Overview

**Get Latest Releases** is a GitHub Action that fetches the most recent releases from any public repositories and inserts them into your `README.md`.You can customize layout, theme, number of repos, date style, and even auto-commit updates.It’s perfect for showcasing your project ecosystem or tracking tools you maintain — all **automatically**.

---

## 🚀 Features

- 🆕 Fetches **latest releases** from multiple repositories
- 🎨 Supports **4 themes:** `table`, `list`, `card`, `compact`
- 🕓 Customizable **date format** — ISO, relative, short, or hidden
- 📝 Optionally **includes release body/notes**
- 🚫 Exclude prereleases or include them (e.g., canaries)
- 💬 Global footer link for “See all releases”
- 🔁 Optional **auto-commit** to README
- ⚡ Lightweight — built for Node 22+ runners

---

## ⚙️ Usage

Add this workflow to your repository under `.github/workflows/latest-releases.yml`:

```yaml
name: "Update README with Latest Releases"

on:
  schedule:
    - cron: "0 0 * * *" # every day
  workflow_dispatch:

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Get Latest Releases
        uses: jayantur13/get-releases-action@v1
        with:
          repos: |
            vercel/next.js
            facebook/react
          readme_path: "README.md"
          theme: "table"
          include_body: "true"
          exclude_prereleases: "true"
          header_title: "🚀 Latest Releases"
          footer_link_text: "Explore More →"
          show_global_footer: "true"
          max_repos: "5"
          date_format: "short"
          skip_if_no_change: "true"
          auto_commit: "true"
          token: ${{ secrets.GITHUB_TOKEN }}
```

> ⚠️ Important security note

- Use ${{ github.token }} when possible.
- Only use personal access tokens (PATs) when you need:
  - Access to private repositories outside the workflow repo.
  - Increased API rate limits (for many repos).
  - Organization-level visibility.

> Your readme must include these

```bash
<!--LATEST_RELEASES_START-->
<!--LATEST_RELEASES_END-->

```

### 🔩 Parameters

| Name                  | Description                                               | Default               | Required |
| --------------------- | --------------------------------------------------------- | --------------------- | -------- |
| `repos`               | List of repositories (`owner/repo`) separated by newlines | –                     | ✅       |
| `readme_path`         | Path to your README file                                  | `README.md`           | ❌       |
| `max_repos`           | Maximum number of repositories to display                 | `5`                   | ❌       |
| `include_body`        | Include release notes text                                | `true`                | ❌       |
| `exclude_prereleases` | Skip prereleases                                          | `true`                | ❌       |
| `theme`               | Markdown layout: `table`, `list`, `card`, `compact`       | `table`               | ❌       |
| `header_title`        | Custom section title (value,"", don't pass key)           | `🔖 Latest Releases`  | ❌       |
| `footer_link_text`    | Text for global footer link                               | `See All Releases →`  | ❌       |
| `show_global_footer`  | Show or hide the footer link                              | `true`                | ❌       |
| `date_format`         | Date format (`ISO`, `relative`, `none`)                   | `ISO`                 | ❌       |
| `skip_if_no_change`   | Skip update if no new release is found                    | `true`                | ❌       |
| `auto_commit`         | Automatically commit README changes                       | `false`               | ❌       |
| `token`               | GitHub token for API access                               | `${{ github.token }}` | ❌       |

---

## New Release

<!--LATEST_RELEASES_START-->
<!--LATEST_RELEASES_END-->

---

## 🧩 Local Testing Example

You can simulate the action locally by setting environment variables:

```java
INPUT_REPOS="vercel/next.js\nfacebook/react"
INPUT_README_PATH="README.md"
INPUT_MAX_REPOS="2"
INPUT_INCLUDE_BODY="true"
INPUT_THEME="list"
INPUT_HEADER_TITLE="🚀 Latest Releases"
INPUT_EXCLUDE_PRERELEASES="false"
INPUT_SKIP_IF_NO_CHANGE="true"
INPUT_AUTO_COMMIT="false"
INPUT_DATE_FORMAT="short"
INPUT_SHOW_GLOBAL_FOOTER="true"
GITHUB_ACTOR="username"
GITHUB_TOKEN="ghp_yourtokenhere"
DEBUG=true
GITHUB_ACTIONS=false

Run npm run test:local
```

---

## 📸 Theme results

> Card View
> ![card view](/src/theme_image/ss_card.jpeg)

> Table View
> ![table view](/src/theme_image/ss_table.jpeg)

> List View
> ![list view](/src/theme_image/ss_list.jpeg)

> Compact View

## ![compact view](/src/theme_image/ss_compact.jpeg)

## 📢 Changelog

Read changes made in [Changelog](https://github.com/jayantur13/get-latest-releases/blob/main/Changelog.md)

## 📜 License

MIT © [Jayant Navrange](https://github.com/jayantur13/get-latest-releases/blob/main/LICENSE)

## ❤️ Support

If you find this useful, please ⭐ the repo or [sponsor me on GitHub](https://github.com/sponsors/jayantur13).
