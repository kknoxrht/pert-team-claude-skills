# Antora Progress Tracking Skill

A Claude Code skill for adding client-side visual progress tracking to Antora-based courses.

## Features

- ✅ **Client-side tracking** - Uses localStorage (no server required)
- ✅ **Visual checkmarks** - Shows ✓ next to visited pages in navigation
- ✅ **Persistent** - Progress survives browser sessions
- ✅ **Privacy-first** - All data stays on user's device
- ✅ **GitHub Pages compatible** - Works on static sites
- ✅ **Customizable** - Easy to change checkmark icon
- ✅ **Accessible** - ARIA attributes for screen readers
- ✅ **Mobile-friendly** - Responsive design
- ✅ **Print-friendly** - Hides checkmarks when printing

## What It Looks Like

```
Course Navigation
├─ ✓ Module 1: Introduction
│  ├─ ✓ 1.1 Overview
│  ├─ ✓ 1.2 Getting Started
│  └─   1.3 Prerequisites        ← Not visited yet
├─   Module 2: Advanced Topics
│  ├─ ✓ 2.1 Architecture
│  └─   2.2 Best Practices
└─   Conclusion
```

## Installation

### 1. Clone This Skill Repository

```bash
cd ~/.claude/skills/
git clone https://github.com/YOUR-USERNAME/antora-progress-tracking-skill.git
```

Or place it anywhere and reference the full path when using Claude Code.

### 2. Install in Your Antora Course

```bash
cd /path/to/your-antora-course
```

Then in Claude Code CLI or IDE:

```bash
/add-progress-tracking
```

The skill will:
1. Validate your Antora project
2. Detect if already installed
3. Warn about custom overrides
4. Install 6 files (templates, JS, CSS, docs)
5. Update navigation
6. Rebuild and verify

### 3. Test Locally

```bash
npm run serve
```

Open in browser, navigate to a few pages, then refresh. You should see green checkmarks next to visited pages.

## Uninstallation

To remove progress tracking:

```bash
/remove-progress-tracking
```

The skill will:
1. Detect installed version
2. Restore backup files (if they exist)
3. Remove progress tracking files
4. Update navigation
5. Rebuild and verify

## How It Works

### Architecture

```
┌─────────────────────────────────────────┐
│  Browser (Client-Side Only)            │
├─────────────────────────────────────────┤
│                                         │
│  1. User visits page                    │
│     ↓                                   │
│  2. JavaScript reads window.location    │
│     ↓                                   │
│  3. Updates localStorage array          │
│     ["page1.html", "page2.html"]        │
│     ↓                                   │
│  4. Scans navigation for [data-path]    │
│     ↓                                   │
│  5. Shows checkmarks for visited pages  │
│                                         │
└─────────────────────────────────────────┘
```

### Files Installed

| File | Purpose |
|------|---------|
| `supplemental-ui/partials/nav-tree.hbs` | Adds `data-progress-path` attributes and checkmark spans to nav links |
| `supplemental-ui/partials/footer-scripts.hbs` | Loads progress-tracker.js |
| `supplemental-ui/partials/head-styles.hbs` | Loads progress-tracker.css |
| `supplemental-ui/js/progress-tracker.js` | Core tracking logic (localStorage + UI updates) |
| `supplemental-ui/css/progress-tracker.css` | Checkmark styling, dark mode, print styles |
| `modules/appendix/pages/progress-tracking.adoc` | User documentation page |

### localStorage Format

```json
{
  "antora-course-progress": [
    "/course-name/3.3/module1/page1.html",
    "/course-name/3.3/module2/page2.html"
  ]
}
```

## Customization

### Change Checkmark Icon

Edit `supplemental-ui/partials/nav-tree.hbs`:

```handlebars
<!-- Find this line: -->
<span class="nav-progress-mark" aria-hidden="true">✓</span>

<!-- Change to your icon: -->
<span class="nav-progress-mark" aria-hidden="true">★</span>
```

Then rebuild: `npm run build`

**Icon Options:**
- ✓ (default checkmark)
- ✔ (heavy checkmark)
- ★ (star)
- 🎯 (target emoji)
- 🟢 (green circle)

### Change Checkmark Color

Edit `supplemental-ui/css/progress-tracker.css`:

```css
.nav-progress-mark {
  color: #00a86b; /* Change to your color */
}
```

### Clear Progress (Testing)

In browser console:

```javascript
clearCourseProgress()
```

## Requirements

- **Antora 3.x** - Uses supplemental-ui mechanism
- **npm build script** - For rebuilding site
- **UI bundle** - Configured in antora-playbook.yml
- **Navigation file** - In appendix or ROOT module

## Browser Support

- Chrome/Edge/Safari/Firefox (latest 2 versions)
- IE11+ (with graceful degradation)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Privacy & Data

- **No server-side tracking** - Everything stays on user's device
- **No analytics** - No data sent anywhere
- **No cookies** - Uses localStorage only
- **No personal info** - Only stores page URLs visited

## Troubleshooting

### Checkmarks Not Showing

1. **Check browser console for errors** (F12 → Console)
2. **Verify localStorage is enabled** (F12 → Application → Local Storage)
3. **Check script loaded** (F12 → Network → filter "progress-tracker.js")
4. **Inspect nav links** (F12 → Elements → look for `data-progress-path`)

### Build Errors

If build fails after installation:

```bash
# Clear cache and rebuild
rm -rf build .cache
npm run build
```

### Custom Overrides Conflict

If you have custom `nav-tree.hbs` or other partials:

1. The skill will warn you before overwriting
2. Backups are created as `*.backup`
3. Merge your customizations manually if needed

## Version History

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Contributing

Found a bug or have a feature request? Please:

1. Check existing issues
2. Open a new issue with details
3. Submit a PR with fixes/improvements

## License

MIT License - Feel free to use in your courses!

## Credits

Created for Red Hat OpenShift AI training courses.

## Related Skills

- `showroom:create-lab` - Create Showroom lab modules
- `showroom:create-demo` - Create presenter demos
- `showroom:verify-content` - Verify workshop content

## Support

For issues or questions:
- GitHub Issues: [Your repo URL]
- Red Hat RHDP Slack: #showroom-support
