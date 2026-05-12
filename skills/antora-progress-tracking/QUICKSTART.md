# Quick Start Guide

Get progress tracking running in your Antora course in 5 minutes.

## TL;DR

```bash
# 1. Clone skill
cd ~/.claude/skills/
git clone https://github.com/YOUR-USERNAME/antora-progress-tracking-skill.git

# 2. Navigate to your course
cd /path/to/your-antora-course

# 3. Run skill
claude
/add-progress-tracking

# 4. Test
npm run serve
```

Done! Open browser, visit pages, refresh, see checkmarks.

## Commands Reference

| Command | Purpose |
|---------|---------|
| `/add-progress-tracking` | Install progress tracking |
| `/remove-progress-tracking` | Uninstall progress tracking |
| `clearCourseProgress()` | Clear progress (browser console) |

## Files Modified

After installation, your course will have:

```
your-antora-course/
├── supplemental-ui/
│   ├── partials/
│   │   ├── nav-tree.hbs          ← Modified (adds checkmarks)
│   │   ├── footer-scripts.hbs    ← Modified (loads JS)
│   │   └── head-styles.hbs       ← Modified (loads CSS)
│   ├── js/
│   │   └── progress-tracker.js   ← New (tracking logic)
│   └── css/
│       └── progress-tracker.css  ← New (styling)
└── modules/
    └── appendix/  (or ROOT)
        ├── pages/
        │   └── progress-tracking.adoc  ← New (documentation)
        └── nav.adoc              ← Modified (adds doc link)
```

## Verification Checklist

After installation:

- [ ] Build succeeds: `npm run build`
- [ ] Files exist: `ls build/site/_/js/progress-tracker.js`
- [ ] Site serves: `npm run serve`
- [ ] Browser loads page without errors (F12 → Console)
- [ ] Navigate to 3 pages
- [ ] Refresh browser
- [ ] See checkmarks in navigation sidebar
- [ ] localStorage has data: F12 → Application → Local Storage → `antora-course-progress`

## Common Issues

### No checkmarks appear

```bash
# Check files exist
ls build/site/_/js/progress-tracker.js
ls build/site/_/css/progress-tracker.css

# Check browser console for errors
# Open DevTools (F12) → Console tab

# Verify localStorage enabled
# Not in private browsing mode?
```

### Build fails

```bash
# Clear cache
rm -rf build .cache

# Rebuild
npm run build
```

### Already installed

If skill says "already installed":
- Say "yes" to reinstall (overwrites files)
- Or run `/remove-progress-tracking` first

## Customization

### Change icon

Edit `supplemental-ui/partials/nav-tree.hbs`:

```handlebars
<span class="nav-progress-mark" aria-hidden="true">★</span>
```

### Change color

Edit `supplemental-ui/css/progress-tracker.css`:

```css
.nav-progress-mark {
  color: #ff6b6b; /* Change to red */
}
```

Then: `npm run build`

## Bulk Installation

Install in multiple courses:

```bash
for course in course1 course2 course3; do
  cd ~/courses/$course
  echo "Installing in $course..."
  claude << EOF
/add-progress-tracking
yes
EOF
done
```

## Support

- Full documentation: [README.md](README.md)
- Installation guide: [INSTALL.md](INSTALL.md)
- Issues: [GitHub Issues](https://github.com/YOUR-USERNAME/antora-progress-tracking-skill/issues)
