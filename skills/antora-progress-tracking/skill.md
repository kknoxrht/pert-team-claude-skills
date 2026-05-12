---
name: add-progress-tracking
description: Add client-side visual progress tracking to an Antora course
version: 1.0
---

# Visual Progress Tracking Installer

This skill adds localStorage-based progress tracking with checkmarks in the navigation sidebar for Antora courses.

## What This Skill Does

1. **Validates** the current directory is an Antora course
2. **Detects** existing installation and version
3. **Warns** if custom supplemental-ui overrides exist
4. **Creates** necessary directory structure
5. **Installs** 6 files (templates, JS, CSS, documentation)
6. **Updates** navigation to include progress tracking page
7. **Rebuilds** the site and verifies installation

## Instructions for Claude

When this skill is invoked, follow these steps carefully:

### PHASE 1: Validation

Check the following prerequisites and report any failures clearly:

1. **Is this an Antora project?**
   - Check: `antora.yml` exists in current directory
   - Error: "Not an Antora project - antora.yml not found"

2. **Has supplemental-ui directory?**
   - Check: `supplemental-ui/` directory exists
   - Error: "No supplemental-ui directory found. Run: mkdir -p supplemental-ui"

3. **Has build script?**
   - Check: `package.json` has `scripts.build`
   - Error: "No npm build script found in package.json"

4. **Has navigation file?**
   - Check: `modules/appendix/nav.adoc` OR `modules/ROOT/nav.adoc` exists
   - Error: "No navigation file found (appendix/nav.adoc or ROOT/nav.adoc)"

5. **Has UI bundle configured?**
   - Check: `antora-playbook.yml` has `ui.bundle` configuration
   - Error: "No UI bundle configured in antora-playbook.yml"

If ANY validation fails, stop and report the error. Do not proceed to installation.

### PHASE 2: Detection & Version Check

Check if progress tracking is already installed:

1. **Check for version marker** in `supplemental-ui/partials/nav-tree.hbs`:
   - Look for: `{{!-- progress-tracking-installed: v1.0 --}}`
   - Extract version number (1.0, 1.2, etc.)

2. **Check for custom overrides** in `supplemental-ui/partials/`:
   - List files: `footer-scripts.hbs`, `head-styles.hbs`, `nav-tree.hbs`
   - For each file that exists WITHOUT version marker:
     - **WARN**: "Custom override detected: {filename}"
     - **WARN**: "This will be backed up to {filename}.backup before modification"

3. **Determine action**:
   - **Not installed**: Proceed to fresh installation
   - **v1.0 installed**: Ask user: "Update to v1.0 (reinstall)?"
   - **Future version** (v1.2+): Ask user: "Migrate from v{old} to v1.0?"
   - **Custom overrides found**: Ask user: "Custom overrides detected. Backup and continue?"

### PHASE 3: Backup Custom Files (if needed)

If custom overrides exist without version markers:

```bash
# For each custom file, create backup
cp supplemental-ui/partials/nav-tree.hbs supplemental-ui/partials/nav-tree.hbs.backup
cp supplemental-ui/partials/footer-scripts.hbs supplemental-ui/partials/footer-scripts.hbs.backup
cp supplemental-ui/partials/head-styles.hbs supplemental-ui/partials/head-styles.hbs.backup
```

Report: "✓ Backed up custom files to *.backup"

### PHASE 4: Create Directory Structure

```bash
mkdir -p supplemental-ui/js
mkdir -p supplemental-ui/css
mkdir -p supplemental-ui/partials
```

Report: "✓ Created directory structure"

### PHASE 5: Install Template Files

The skill repository contains templates in `templates/` directory. Read each template and write to the target location:

**File mapping:**

| Template File | Target Location |
|---------------|-----------------|
| `templates/nav-tree.hbs` | `supplemental-ui/partials/nav-tree.hbs` |
| `templates/footer-scripts.hbs` | `supplemental-ui/partials/footer-scripts.hbs` |
| `templates/head-styles.hbs` | `supplemental-ui/partials/head-styles.hbs` |
| `templates/progress-tracker.js` | `supplemental-ui/js/progress-tracker.js` |
| `templates/progress-tracker.css` | `supplemental-ui/css/progress-tracker.css` |
| `templates/progress-tracking.adoc` | See PHASE 6 for location |

For each file:
1. Read template from skill repository
2. Write to target location (overwrite if exists)
3. Report: "✓ Installed {filename}"

### PHASE 6: Determine Documentation Location

Find the appropriate module for documentation:

1. **Check for appendix module**:
   - If `modules/appendix/nav.adoc` exists: Use `modules/appendix/`
   - Navigation file: `modules/appendix/nav.adoc`
   - Documentation: `modules/appendix/pages/progress-tracking.adoc`

2. **Fallback to ROOT module**:
   - If appendix doesn't exist: Use `modules/ROOT/`
   - Navigation file: `modules/ROOT/nav.adoc`
   - Documentation: `modules/ROOT/pages/progress-tracking.adoc`

Create pages directory if needed:
```bash
mkdir -p modules/{module}/pages
```

Write documentation file:
- Read: `templates/progress-tracking.adoc`
- Write: `modules/{module}/pages/progress-tracking.adoc`
- Report: "✓ Installed documentation to {module}/pages/"

### PHASE 7: Update Navigation

Update the navigation file to include progress tracking link:

1. **Read navigation file** (`modules/appendix/nav.adoc` or `modules/ROOT/nav.adoc`)

2. **Check if already exists**:
   - Search for: `progress-tracking.adoc`
   - If found: Skip with message "✓ Navigation link already exists"

3. **Find insertion point**:
   - Strategy A: After line containing "conclusion" or "Conclusion"
   - Strategy B: At end of file (if no conclusion found)

4. **Insert navigation link**:
   ```asciidoc
   ** xref:progress-tracking.adoc[Progress Tracking]
   ```

5. **Write updated file**

Report: "✓ Added progress tracking to navigation"

### PHASE 8: Rebuild Site

Clear cache and rebuild:

```bash
rm -rf build .cache
npm run build
```

Monitor build output:
- Watch for errors (level: "error")
- Ignore existing warnings about missing images or section sequences
- Report: "✓ Build completed successfully" or "❌ Build failed: {error}"

### PHASE 9: Verify Installation

Run verification checks on the build output:

1. **Templates merged**: Check `build/site/_/js/progress-tracker.js` exists
2. **CSS included**: Check `build/site/_/css/progress-tracker.css` exists
3. **HTML has attributes**: Search any `build/site/*/index.html` for `data-progress-path`
4. **HTML has checkmarks**: Search HTML for `nav-progress-mark`
5. **Scripts loaded**: Search HTML for `progress-tracker.js`

For each check:
- Pass: "✓ {check name}"
- Fail: "❌ {check name}"

If all checks pass, proceed. If any fail, report which checks failed.

### PHASE 10: Success Report

Display final report:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Visual Progress Tracking Installed!

Version: 1.0
Installation time: {timestamp}

Files created/updated:
  • supplemental-ui/partials/nav-tree.hbs
  • supplemental-ui/partials/footer-scripts.hbs
  • supplemental-ui/partials/head-styles.hbs
  • supplemental-ui/js/progress-tracker.js
  • supplemental-ui/css/progress-tracker.css
  • modules/{module}/pages/progress-tracking.adoc
  • modules/{module}/nav.adoc (updated)

{If backups created:}
Backups created:
  • supplemental-ui/partials/*.backup

Next steps:
  1. Test locally: npm run serve
  2. Commit changes: git add -A && git commit -m "Add progress tracking v1.0"
  3. Deploy to GitHub Pages

To customize the checkmark icon:
  Edit: supplemental-ui/partials/nav-tree.hbs (line 12)
  Change: <span class="nav-progress-mark">✓</span>

To clear progress during testing:
  Browser console: clearCourseProgress()

To uninstall:
  Run: /remove-progress-tracking
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Version Migration Logic

### Migrating from v1.0 → v1.0 (Reinstall)

- Simply overwrite all files
- No migration logic needed

### Migrating from future v1.2 → v1.0 (Downgrade Warning)

If detected version > 1.0:
- Warn: "Detected v{version} which is newer than this skill (v1.0)"
- Ask: "Do you want to downgrade? You may lose new features."
- If yes: Proceed with installation (overwrites)
- If no: Exit gracefully

## Error Handling

### Build Failures

If `npm run build` fails:
- Display full error output
- Do NOT proceed to verification
- Suggest: "Check build errors above. Progress tracking files may conflict with custom UI."

### File Write Failures

If any file write fails:
- Report which file failed
- Suggest: "Check file permissions and disk space"
- Do NOT continue (partial installation is worse than no installation)

### Navigation Update Failures

If navigation file cannot be parsed:
- Warn: "Could not automatically update navigation"
- Show manual instruction:
  ```
  Add this line to modules/{module}/nav.adoc:
  ** xref:progress-tracking.adoc[Progress Tracking]
  ```

## Skill Repository Context

This skill is part of a shared repository. The skill has access to:

- `templates/nav-tree.hbs`
- `templates/footer-scripts.hbs`
- `templates/head-styles.hbs`
- `templates/progress-tracker.js`
- `templates/progress-tracker.css`
- `templates/progress-tracking.adoc`

Read these files from the skill repository location and write them to the target Antora project.

## Notes for Claude

- Be verbose in reporting progress (users want to see what's happening)
- Always confirm destructive actions (overwriting files)
- Preserve user customizations when possible (backup strategy)
- If uncertain about a step, ask the user rather than guessing
- The skill should be idempotent (safe to run multiple times)
