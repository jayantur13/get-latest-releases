const execSync = require("child_process");

function autoCommit(readmePath) {
  try {
    execSync(`git config user.name "github-actions[bot]"`);
    execSync(
      `git config user.email "github-actions[bot]@users.noreply.github.com"`
    );
    execSync(`git add ${readmePath}`);
    execSync(
      `git commit -m "Update latest releases [skip ci]" || echo "No changes"`
    );
    execSync(`git push`);
    console.log("✅ Auto-committed changes.");
  } catch (err) {
    console.error("❌ Auto-commit failed:", err.message);
  }
}

module.exports = { autoCommit };
