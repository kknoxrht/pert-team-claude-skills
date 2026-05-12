# Changelog

All notable changes to the Antora Progress Tracking Skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-05-12

### Added

- Initial release of progress tracking skill
- Install skill (`/add-progress-tracking`)
- Uninstall skill (`/remove-progress-tracking`)
- Client-side localStorage-based tracking
- Visual checkmarks in navigation sidebar
- URL normalization (handles hash, query params, trailing slashes)
- Custom override detection and backup
- Version detection and migration support
- Dark mode support
- Print-friendly styles (hides checkmarks)
- Accessibility features (aria-hidden on decorative elements)
- Mobile-responsive design
- Browser console utility (`clearCourseProgress()`)
- Complete documentation (README, skill instructions, user guide)

### Features

- **Templates**:
  - `nav-tree.hbs` - Navigation with progress tracking
  - `footer-scripts.hbs` - Script loader
  - `head-styles.hbs` - CSS loader
  
- **Assets**:
  - `progress-tracker.js` - Core tracking logic (~150 lines)
  - `progress-tracker.css` - Styling (~40 lines)
  
- **Documentation**:
  - `progress-tracking.adoc` - End-user documentation
  - Automatic navigation updates

### Technical Details

- **Storage**: localStorage key `antora-course-progress`
- **Data Format**: JSON array of absolute pathname strings
- **Version Marker**: `{{!-- progress-tracking-installed: v1.0 --}}`
- **Browser Support**: IE11+ with graceful degradation

### Validation Checks

- Antora project detection (antora.yml)
- supplemental-ui directory check
- npm build script verification
- Navigation file detection
- UI bundle configuration check

### Installation Process

1. Environment validation
2. Existing installation detection
3. Custom override warnings and backups
4. Directory structure creation
5. Template file installation
6. Navigation updates
7. Site rebuild
8. Installation verification

### Uninstallation Process

1. Installation detection
2. User confirmation
3. Backup file restoration
4. Progress tracking file removal
5. Empty directory cleanup
6. Navigation link removal
7. Site rebuild
8. Removal verification

## [Unreleased]

### Planned for v1.2

- **Progress percentage badge** - Show completion % in navigation header
- **Module completion tracking** - Detect when entire modules are finished
- **Export/import progress** - Downloadable JSON backup
- **Multi-user support** - Username-based progress namespacing
- **Analytics integration** - Optional Google Analytics events
- **Custom icons per module** - Different icons for different sections
- **Progress reset button** - UI button instead of console command
- **Storage optimization** - Compressed storage for large courses

### Possible Future Features

- Server-side sync option (optional)
- Progress sharing via URL
- Certificate of completion generation
- Time tracking (how long spent on each page)
- Quiz score integration
- Bookmarking favorite pages
- Notes/annotations per page

## Migration Notes

### Upgrading from v1.0 to v1.2 (future)

When v1.2 is released, the install skill will:
1. Detect v1.0 installation
2. Preserve localStorage data
3. Update templates with new features
4. Migrate any configuration changes
5. Rebuild and verify

## Version Support

| Version | Status | Support Until |
|---------|--------|---------------|
| 1.0.x   | Active | TBD           |

## Breaking Changes

None yet - v1.0 is the initial release.

## Known Issues

### v1.0.0

None reported yet.

## Contributing

See [README.md](README.md#contributing) for contribution guidelines.

---

**Legend:**
- `Added` - New features
- `Changed` - Changes to existing functionality
- `Deprecated` - Soon-to-be removed features
- `Removed` - Removed features
- `Fixed` - Bug fixes
- `Security` - Vulnerability fixes
