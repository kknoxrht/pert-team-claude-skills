# Antora Progress Tracking - Skills & Demo Course

Professional visual progress tracking for Antora-based training courses. This repository showcases the progress tracking feature in action while providing a complete skill package for easy installation in your own courses.

## Features

- ✅ **Visual Checkmarks** - Shows ✓ next to visited pages in navigation
- ✅ **Persistent Progress** - Survives browser sessions using localStorage
- ✅ **Privacy First** - All data stays on user's device, no server required
- ✅ **GitHub Pages Ready** - Works perfectly on static sites
- ✅ **Client-Side Only** - No backend, database, or authentication needed
- ✅ **Customizable** - Easy to change checkmark icon and colors
- ✅ **Accessible** - ARIA attributes for screen readers
- ✅ **Mobile Friendly** - Responsive design for all devices

## What It Looks Like

```
Course Navigation
├─ ✓ Module 1: Claude Basics
│  ├─ ✓ Getting Started with Claude Code
│  ├─ ✓ Skills vs. Conversational Prompts
│  ├─ ✓ Working in Git Repositories
│  └─   Effective Prompting Techniques    ← Not visited yet
├─   Module 2: Skill Building
│  ├─ ✓ Workflow Design
│  ├─   Token Management
│  └─   Quality Gates
└─   Module 3: Course Creation
```

Green checkmarks (✓) appear next to pages as students navigate through your course!

## Quick Start

### See It in Action

- 📘 **[View Live Course](https://YOUR-ORG.github.io/pert-team-claude-skills/)** - Browse the example course and watch checkmarks appear
- 📖 **[Installation Guide](guide/index.html)** - Step-by-step HTML guide (opens in new window)
- 🛠️ **[Browse Skill Files](skills/antora-progress-tracking/)** - Inspect the skill package

### Install in Your Course

```bash
cd your-antora-course

# Then in Claude Code:
/add-progress-tracking
```

The skill will:
1. ✅ Validate your Antora project structure
2. ✅ Detect if already installed (safe to run multiple times)
3. ✅ Warn about custom override conflicts
4. ✅ Install 6 files (templates, JS, CSS, docs)
5. ✅ Update navigation to include progress tracking documentation
6. ✅ Rebuild and verify installation

## Documentation

This repository provides multiple levels of documentation:

- **[Full Installation Guide](guide/index.html)** - Comprehensive step-by-step HTML guide with copy-paste examples
- **[Skill README](skills/antora-progress-tracking/README.md)** - Technical details and architecture
- **[Quick Start](skills/antora-progress-tracking/QUICKSTART.md)** - Fast reference for experienced users
- **[Changelog](skills/antora-progress-tracking/CHANGELOG.md)** - Version history and updates

## Example Course Content

This repository includes a complete course about **Claude Code Skills** that demonstrates the progress tracking feature in action. Navigate through the course modules and watch checkmarks appear!

### Course Modules

1. **Claude Basics** - Introduction to Claude Code fundamentals
   - Getting Started with Claude Code
   - Skills vs. Conversational Prompts
   - Working in Git Repositories
   - Effective Prompting Techniques

2. **Skill Building** - Creating and customizing Claude Code skills
   - Workflow Design
   - Token Management
   - Quality Gates
   - References and Templates
   - Real-World Examples

3. **Course Creation** - Developing training content with Claude
   - QuickCourse Workflow
   - Content Request Templates
   - Writing Style Standards
   - Terminology Consistency
   - Fresh Session Workflow

## Repository Structure

```
pert-team-claude-skills/
├── README.md                      # This file
├── guide/                         # HTML installation guide
│   ├── index.html                 # Interactive guide with code examples
│   ├── css/style.css              # Red Hat themed styling
│   └── js/script.js               # Copy buttons, accordions, animations
├── skills/                        # Reusable skill package
│   └── antora-progress-tracking/  # Complete skill for Claude Code
│       ├── skill.md               # Install skill (use with /add-progress-tracking)
│       ├── remove.md              # Uninstall skill (use with /remove-progress-tracking)
│       ├── README.md              # Skill documentation
│       └── templates/             # Template files (nav-tree.hbs, JS, CSS, etc.)
├── modules/                       # Example course content
│   ├── ROOT/                      # Course homepage
│   ├── claude-basics/             # Module 1
│   ├── skill-building/            # Module 2
│   ├── course-creation/           # Module 3
│   └── appendix/                  # Additional resources
├── .agents/                       # Example Claude Code skills
│   └── skills/                    # 14+ production-ready skills
├── prompts/                       # Course design prompts
└── templates/                     # Content templates (lab, quiz, presentation)
```

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
| `supplemental-ui/partials/nav-tree.hbs` | Navigation template with progress tracking |
| `supplemental-ui/js/progress-tracker.js` | Core tracking logic (~150 lines) |
| `supplemental-ui/css/progress-tracker.css` | Checkmark styling, dark mode, print support |
| `supplemental-ui/partials/footer-scripts.hbs` | Script loader |
| `supplemental-ui/partials/head-styles.hbs` | CSS loader |
| `modules/appendix/pages/progress-tracking.adoc` | User documentation |

## Requirements

- **Antora 3.x** - Static site generator
- **npm build script** - For rebuilding site
- **supplemental-ui support** - Configured in antora-playbook.yml

## Browser Support

- Chrome/Edge/Safari/Firefox (latest 2 versions)
- IE11+ (with graceful degradation)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Privacy & Data

- ✅ **No server-side tracking** - Everything stays on user's device
- ✅ **No analytics** - No data sent anywhere
- ✅ **No cookies** - Uses localStorage only
- ✅ **No personal info** - Only stores page URLs visited

## Uninstalling

To remove progress tracking from your course:

```bash
cd your-antora-course

# Then in Claude Code:
/remove-progress-tracking
```

The skill will:
- Restore backup files (if they exist)
- Remove progress tracking files
- Update navigation
- Rebuild and verify removal

## Customization

### Change Checkmark Icon

Edit `supplemental-ui/partials/nav-tree.hbs`:

```handlebars
<!-- Change from: -->
<span class="nav-progress-mark" aria-hidden="true">✓</span>

<!-- To your icon: -->
<span class="nav-progress-mark" aria-hidden="true">★</span>
```

**Icon Options:** ✓ (checkmark), ✔ (heavy checkmark), ★ (star), 🎯 (target), 🟢 (green circle)

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

## Contributing

Found a bug or have a feature request?

1. Check existing issues
2. Open a new issue with details
3. Submit a PR with fixes/improvements

## License

MIT License - Feel free to use in your courses!

## Credits

Created for Red Hat OpenShift AI training courses.

## Support

- **GitHub Issues**: Report bugs or request features
- **Installation Guide**: See [guide/index.html](guide/index.html) for detailed help
- **Skill Documentation**: See [skills/antora-progress-tracking/README.md](skills/antora-progress-tracking/README.md)

---

**Ready to add progress tracking to your course?** Browse the [skills folder](skills/antora-progress-tracking/) to get started, or view the [live demo](https://YOUR-ORG.github.io/pert-team-claude-skills/)!
