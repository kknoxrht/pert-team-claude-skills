---
name: remove-progress-tracking
description: Remove visual progress tracking from an Antora course
version: 1.0
---

# Visual Progress Tracking Uninstaller

This skill cleanly removes the progress tracking feature from an Antora course.

## What This Skill Does

1. **Detects** if progress tracking is installed
2. **Identifies** all installed files
3. **Restores** backup files if they exist
4. **Removes** progress tracking files
5. **Updates** navigation to remove progress tracking link
6. **Rebuilds** the site and verifies removal

## Instructions for Claude

When this skill is invoked, follow these steps carefully:

### PHASE 1: Detection

Check if progress tracking is installed:

1. **Check for version marker** in `supplemental-ui/partials/nav-tree.hbs`:
   - Look for: `{{!-- progress-tracking-installed: v1.0 --}}`
   - If NOT found: Report "Progress tracking is not installed" and exit gracefully

2. **Identify installed version**:
   - Extract version from marker (e.g., "v1.0")
   - Report: "Detected progress tracking v{version}"

3. **List all installed files**:
   ```
   supplemental-ui/partials/nav-tree.hbs
   supplemental-ui/partials/footer-scripts.hbs
   supplemental-ui/partials/head-styles.hbs
   supplemental-ui/js/progress-tracker.js
   supplemental-ui/css/progress-tracker.css
   modules/appendix/pages/progress-tracking.adoc OR modules/ROOT/pages/progress-tracking.adoc
   ```

4. **Check for backup files**:
   - Look for: `supplemental-ui/partials/*.backup`
   - List any found: "Found backups: {filenames}"

### PHASE 2: Confirmation

Ask user for confirmation:

```
The following files will be removed:
  • supplemental-ui/partials/nav-tree.hbs
  • supplemental-ui/partials/footer-scripts.hbs
  • supplemental-ui/partials/head-styles.hbs
  • supplemental-ui/js/progress-tracker.js
  • supplemental-ui/css/progress-tracker.css
  • modules/{module}/pages/progress-tracking.adoc

{If backups exist:}
The following backup files will be restored:
  • nav-tree.hbs.backup → nav-tree.hbs
  • footer-scripts.hbs.backup → footer-scripts.hbs
  • head-styles.hbs.backup → head-styles.hbs

Continue with uninstall? (yes/no)
```

If user says no, exit gracefully with: "Uninstall cancelled"

### PHASE 3: Restore Backup Files

If backup files exist (*.backup):

1. **For each backup file**:
   ```bash
   mv supplemental-ui/partials/nav-tree.hbs.backup supplemental-ui/partials/nav-tree.hbs
   mv supplemental-ui/partials/footer-scripts.hbs.backup supplemental-ui/partials/footer-scripts.hbs
   mv supplemental-ui/partials/head-styles.hbs.backup supplemental-ui/partials/head-styles.hbs
   ```
   Report: "✓ Restored {filename} from backup"

2. **If NO backups exist**:
   - These files must be deleted (they are progress tracking files)
   - Report: "No backups found - will delete progress tracking files"

### PHASE 4: Remove Progress Tracking Files

Delete files that were installed by progress tracking:

#### If backups were restored (Step 3 succeeded):

Only delete files that DON'T have backups:
```bash
rm supplemental-ui/js/progress-tracker.js
rm supplemental-ui/css/progress-tracker.css
rm modules/appendix/pages/progress-tracking.adoc  # OR modules/ROOT/pages/progress-tracking.adoc
```

Report for each: "✓ Removed {filename}"

#### If NO backups existed:

Delete all progress tracking files:
```bash
rm supplemental-ui/partials/nav-tree.hbs
rm supplemental-ui/partials/footer-scripts.hbs
rm supplemental-ui/partials/head-styles.hbs
rm supplemental-ui/js/progress-tracker.js
rm supplemental-ui/css/progress-tracker.css
rm modules/appendix/pages/progress-tracking.adoc  # OR modules/ROOT/pages/progress-tracking.adoc
```

**WARNING**: Deleting these partials without backups means the UI bundle defaults will be used.

Report for each: "✓ Removed {filename}"

### PHASE 5: Clean Up Empty Directories

Remove empty directories (if they are now empty):

```bash
# Check if empty before removing
rmdir supplemental-ui/js 2>/dev/null || true
rmdir supplemental-ui/css 2>/dev/null || true
```

Only report if directories were removed: "✓ Removed empty directories"

### PHASE 6: Update Navigation

Remove the progress tracking link from navigation:

1. **Find navigation file**:
   - Check: `modules/appendix/nav.adoc`
   - Fallback: `modules/ROOT/nav.adoc`

2. **Read navigation file**

3. **Find and remove line**:
   - Search for line containing: `progress-tracking.adoc`
   - Expected format: `** xref:progress-tracking.adoc[Progress Tracking]`
   - Remove the entire line

4. **If line not found**:
   - Warn: "Progress tracking link not found in navigation (may have been manually removed)"
   - Continue (not a fatal error)

5. **Write updated navigation file**

Report: "✓ Removed progress tracking from navigation"

### PHASE 7: Rebuild Site

Clear cache and rebuild:

```bash
rm -rf build .cache
npm run build
```

Monitor build output:
- Watch for errors (level: "error")
- Ignore existing warnings
- Report: "✓ Build completed successfully" or "❌ Build failed: {error}"

### PHASE 8: Verify Removal

Run verification checks on the build output:

1. **JS removed**: Check `build/site/_/js/progress-tracker.js` does NOT exist
2. **CSS removed**: Check `build/site/_/css/progress-tracker.css` does NOT exist
3. **No attributes**: Search any `build/site/*/index.html` - should NOT contain `data-progress-path`
4. **No checkmarks**: Search HTML - should NOT contain `nav-progress-mark`
5. **No script tags**: Search HTML - should NOT contain `progress-tracker.js`

For each check:
- Pass: "✓ {check name}"
- Fail: "❌ {check name} - file still present"

If any checks fail:
- Warn: "Some progress tracking artifacts remain in build"
- Suggest: "Try: rm -rf build .cache && npm run build"

### PHASE 9: Success Report

Display final report:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Visual Progress Tracking Removed

Uninstalled version: v{version}
Uninstall time: {timestamp}

Files removed:
  • supplemental-ui/js/progress-tracker.js
  • supplemental-ui/css/progress-tracker.css
  • modules/{module}/pages/progress-tracking.adoc

{If backups were restored:}
Files restored from backup:
  • supplemental-ui/partials/nav-tree.hbs
  • supplemental-ui/partials/footer-scripts.hbs
  • supplemental-ui/partials/head-styles.hbs

{If partials were deleted:}
Files deleted (no backups):
  • supplemental-ui/partials/nav-tree.hbs
  • supplemental-ui/partials/footer-scripts.hbs
  • supplemental-ui/partials/head-styles.hbs

Navigation updated:
  • modules/{module}/nav.adoc (progress tracking link removed)

Next steps:
  1. Test locally: npm run serve
  2. Commit changes: git add -A && git commit -m "Remove progress tracking"
  3. Deploy to GitHub Pages

To reinstall:
  Run: /add-progress-tracking
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Special Cases

### Partial Installation

If some files exist but not all:
- List which files are present vs. missing
- Ask: "Partial installation detected. Remove existing files?"
- If yes: Remove only files that exist
- If no: Exit

### Modified Files

If installed files have been modified (no version marker, but similar content):
- Warn: "Installed files appear to have been modified"
- Ask: "Remove anyway? This may affect customizations."
- If yes: Proceed
- If no: Exit

### Navigation Entry Not Found

If the navigation link cannot be found:
- This is NOT a fatal error
- Warn: "Could not find progress tracking in navigation (may have been manually removed)"
- Continue with rest of uninstall

## Error Handling

### Build Failures

If `npm run build` fails after removal:
- Display full error output
- Suggest: "The site may have had pre-existing build issues"
- Ask: "Continue anyway? (Build errors are unrelated to uninstall)"

### File Deletion Failures

If any file cannot be deleted:
- Report which file failed
- Suggest: "Check file permissions"
- Ask: "Continue removing other files?"

### Backup Restoration Failures

If backup file cannot be restored:
- Error: "Failed to restore {filename}.backup"
- Suggest: "You may need to manually restore this file"
- Ask: "Continue with uninstall?"

## Safety Checks

Before deleting partials without backups:

```
⚠️  WARNING: No backup files found

The following files will be DELETED:
  • supplemental-ui/partials/nav-tree.hbs
  • supplemental-ui/partials/footer-scripts.hbs
  • supplemental-ui/partials/head-styles.hbs

These files appear to be progress tracking templates, but they
have no backups. Deleting them will revert to the UI bundle defaults.

If you have customizations in these files, back them up manually first.

Continue? (yes/no)
```

## Notes for Claude

- Be extra careful when deleting files (confirm destructive actions)
- Always prefer restoring backups over deleting
- Provide clear warnings when backups don't exist
- The skill should be safe (better to leave files than accidentally delete user customizations)
- If uncertain, ask the user rather than deleting
- Verify removal thoroughly (build verification is critical)
