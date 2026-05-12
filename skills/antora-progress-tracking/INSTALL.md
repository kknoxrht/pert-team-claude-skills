# Installation Guide

This guide explains how to install and use the Antora Progress Tracking Skill.

## Prerequisites

Before installing this skill, ensure you have:

1. **Claude Code** installed (CLI, Desktop, or IDE extension)
2. **An Antora course** with:
   - `antora.yml` in project root
   - `supplemental-ui/` directory
   - `package.json` with build script
   - Navigation file (`modules/appendix/nav.adoc` or `modules/ROOT/nav.adoc`)
   - UI bundle configured in `antora-playbook.yml`

## Step 1: Clone the Skill Repository

### Option A: Clone to Claude Skills Directory (Recommended)

```bash
cd ~/.claude/skills/
git clone https://github.com/YOUR-USERNAME/antora-progress-tracking-skill.git
```

This makes the skill available globally in Claude Code.

### Option B: Clone Anywhere

```bash
cd ~/Documents/GitHub/
git clone https://github.com/YOUR-USERNAME/antora-progress-tracking-skill.git
```

You'll need to reference the full path when invoking the skill.

## Step 2: Navigate to Your Antora Course

```bash
cd /path/to/your-antora-course
```

Verify you're in the right directory:

```bash
ls antora.yml  # Should exist
```

## Step 3: Install Progress Tracking

### Using Claude Code CLI

```bash
claude
# In Claude CLI
/add-progress-tracking
```

### Using Claude Code Desktop/IDE

1. Open your Antora course directory
2. Start Claude Code
3. Type: `/add-progress-tracking`
4. Press Enter

### If Skill Not Found

If Claude can't find the skill:

**Option 1: Add to skills path**
```bash
# Create symlink in Claude skills directory
ln -s /path/to/antora-progress-tracking-skill ~/.claude/skills/antora-progress-tracking
```

**Option 2: Specify full path**
```bash
# In Claude Code
/Users/yourusername/path/to/antora-progress-tracking-skill/skill.md
```

## Step 4: Follow the Prompts

The skill will:

1. ✓ Validate your Antora project
2. ⚠️ Warn if custom overrides exist (and offer to back them up)
3. ✓ Create directory structure
4. ✓ Install 6 files
5. ✓ Update navigation
6. ✓ Rebuild site
7. ✓ Verify installation

### Example Output

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Validating environment...
✓ Antora project detected (antora.yml found)
✓ supplemental-ui directory exists
✓ npm build script configured
✓ Navigation file found: modules/appendix/nav.adoc

Checking installation status...
⚠️ Custom override detected: nav-tree.hbs
⚠️ Will be backed up to nav-tree.hbs.backup

? Continue with installation? (yes/no)
> yes

Installing files...
✓ Backed up nav-tree.hbs
✓ Installed supplemental-ui/partials/nav-tree.hbs
✓ Installed supplemental-ui/partials/footer-scripts.hbs
✓ Installed supplemental-ui/partials/head-styles.hbs
✓ Installed supplemental-ui/js/progress-tracker.js
✓ Installed supplemental-ui/css/progress-tracker.css
✓ Installed modules/appendix/pages/progress-tracking.adoc

Updating navigation...
✓ Added progress tracking to navigation

Building site...
✓ Build completed successfully

Verifying installation...
✓ Templates merged into build
✓ CSS included in build
✓ HTML has data-progress-path attributes
✓ HTML has checkmark spans
✓ Scripts loaded in HTML

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Visual Progress Tracking Installed!

Next steps:
  1. Test locally: npm run serve
  2. Commit changes: git add -A && git commit -m "Add progress tracking"
  3. Deploy to GitHub Pages
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 5: Test Locally

```bash
npm run serve
```

Open the site in your browser:
1. Navigate to 2-3 different pages
2. Refresh the browser
3. Check navigation sidebar - you should see green checkmarks (✓) next to visited pages

## Step 6: Verify localStorage

Open browser DevTools (F12):
1. Go to **Application** tab
2. Expand **Local Storage**
3. Click on your site's origin
4. Look for key: `antora-course-progress`
5. Value should be a JSON array like: `["/maas/3.3/page1.html", "/maas/3.3/page2.html"]`

## Step 7: Commit and Deploy

```bash
git status  # Review changes
git add -A
git commit -m "Add visual progress tracking v1.0"
git push origin main
```

If using GitHub Pages, your changes will deploy automatically.

## Troubleshooting

### "Not an Antora project"

**Problem:** Skill reports "antora.yml not found"

**Solution:**
```bash
# Verify you're in the right directory
pwd
ls antora.yml

# If not found, navigate to the correct directory
cd /path/to/antora-course
```

### "No supplemental-ui directory"

**Problem:** Skill reports "supplemental-ui/ not found"

**Solution:**
```bash
mkdir supplemental-ui
```

### "Build failed"

**Problem:** `npm run build` fails after installation

**Solution:**
```bash
# Clear cache
rm -rf build .cache

# Rebuild
npm run build

# Check for pre-existing errors
# (Progress tracking may have revealed existing issues)
```

### Checkmarks Not Showing

**Problem:** Site builds but no checkmarks appear

**Solution:**
1. Check browser console for JavaScript errors
2. Verify `build/site/_/js/progress-tracker.js` exists
3. View page source - look for `<script src="../../_/js/progress-tracker.js">`
4. Check localStorage is enabled (not in private browsing)

### Custom Overrides Conflict

**Problem:** You have custom `nav-tree.hbs` and want to keep your changes

**Solution:**
1. Let skill create backup: `nav-tree.hbs.backup`
2. After installation, merge your customizations:
   ```bash
   # Compare files
   diff supplemental-ui/partials/nav-tree.hbs.backup supplemental-ui/partials/nav-tree.hbs
   
   # Manually merge your custom code
   # Keep the progress tracking additions:
   #   - data-progress-path attribute
   #   - <span class="nav-progress-mark">✓</span>
   ```

## Updating Across Multiple Courses

If you have many courses:

```bash
# Create a script
cat > install-progress-tracking.sh << 'EOF'
#!/bin/bash
COURSES=(
  "/path/to/course1"
  "/path/to/course2"
  "/path/to/course3"
)

for course in "${COURSES[@]}"; do
  echo "Installing in $course..."
  cd "$course"
  
  # Use Claude Code CLI
  echo "/add-progress-tracking" | claude
  
  # Or call skill directly (if you have a wrapper)
  # ...
  
  echo "Done with $course"
done
EOF

chmod +x install-progress-tracking.sh
./install-progress-tracking.sh
```

## Uninstalling

To remove progress tracking:

```bash
cd /path/to/antora-course
# In Claude Code
/remove-progress-tracking
```

The skill will:
1. Detect installed version
2. Restore backups (if they exist)
3. Remove progress tracking files
4. Update navigation
5. Rebuild and verify

## Getting Help

- **Skill Issues**: [GitHub Issues](https://github.com/YOUR-USERNAME/antora-progress-tracking-skill/issues)
- **Antora Questions**: [Antora Docs](https://docs.antora.org)
- **Claude Code Help**: [Claude Documentation](https://docs.anthropic.com/claude-code)

## Next Steps

- Customize checkmark icon ([README.md](README.md#customization))
- Change checkmark color ([README.md](README.md#change-checkmark-color))
- Clear progress for testing: `clearCourseProgress()` in browser console
- Read user documentation: See the "Progress Tracking" page in your course appendix
