# Quick Deployment Guide

Get your HTML guide live in 5 minutes.

## Step 1: Customize the Guide

### Update Repository URLs

Edit `index.html` and replace ALL instances of:

```
YOUR-USERNAME
```

With your actual GitHub username or organization name.

**Files to check:**
- `index.html` (multiple locations)
- `README.md`

### Add Your Logo (Optional)

1. Get Red Hat logo from: https://www.redhat.com/en/about/brand/standards
2. Save as: `images/red-hat-logo.svg`

Or skip - the guide works without it.

### Update Contact Info

In `index.html`, find the Support section and update:

```html
<!-- Line ~450 -->
<li>Slack: #showroom-support</li>
<li>Email: your-team@redhat.com</li>
```

## Step 2: Create GitHub Repository

### Option A: GitHub Web Interface

1. Go to: https://github.com/new
2. Repository name: `antora-progress-tracking-guide`
3. Description: `Installation guide for Antora Progress Tracking skill`
4. Public or Private (your choice)
5. Click "Create repository"

### Option B: GitHub CLI

```bash
gh repo create antora-progress-tracking-guide --public --description "Installation guide for Antora Progress Tracking skill"
```

## Step 3: Push Code to GitHub

```bash
cd /Users/kaknox/Documents/GitHub/antora-progress-tracking-guide

# Initialize git
git init
git add -A
git commit -m "Initial commit: Progress tracking installation guide"

# Push to GitHub (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/antora-progress-tracking-guide.git
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages

### Via Web Interface

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** (left sidebar)
4. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

### Via GitHub CLI

```bash
gh repo edit --enable-pages --pages-branch main --pages-path /
```

## Step 5: Get Your URL

Your guide will be available at:

```
https://YOUR-USERNAME.github.io/antora-progress-tracking-guide/
```

**Check deployment status:**

```bash
gh run list --repo YOUR-USERNAME/antora-progress-tracking-guide
```

Or visit: `https://github.com/YOUR-USERNAME/antora-progress-tracking-guide/actions`

## Step 6: Share with Team

### Slack Message Template

```
📚 New Resource: Antora Progress Tracking Guide

I've created a step-by-step guide for adding visual progress indicators to your Antora courses.

🔗 https://YOUR-USERNAME.github.io/antora-progress-tracking-guide/

Features:
✓ Copy-paste installation commands
✓ Troubleshooting tips
✓ Interactive demo
✓ Support resources

Questions? Ask in #showroom-support
```

### Email Template

**Subject:** New: Antora Progress Tracking Installation Guide

**Body:**

```
Hi team,

I've created a comprehensive guide for adding progress tracking to your Antora courses:

https://YOUR-USERNAME.github.io/antora-progress-tracking-guide/

What it does:
- Shows checkmarks next to pages students have visited
- Persists across browser sessions
- Works on GitHub Pages (no server needed)
- Privacy-first (data stays on student's device)

The guide includes:
✓ Step-by-step installation
✓ One-click copy for all commands
✓ Troubleshooting section
✓ Live demo of the feature

Installation takes about 5 minutes using Claude Code.

Let me know if you have questions!

Best,
[Your Name]
```

## Updating the Guide

When you make changes:

```bash
# Edit files
nano index.html

# Commit and push
git add -A
git commit -m "Update installation instructions"
git push

# GitHub Pages will auto-deploy in 1-2 minutes
```

## Custom Domain (Optional)

Want to use a custom domain like `progress-tracking.yourcompany.com`?

1. Add a `CNAME` file:
   ```bash
   echo "progress-tracking.yourcompany.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. Add DNS record:
   - Type: `CNAME`
   - Name: `progress-tracking`
   - Value: `YOUR-USERNAME.github.io`

3. In GitHub Settings → Pages:
   - Enter custom domain
   - Enable HTTPS

## Troubleshooting Deployment

### "404 - Page Not Found"

1. Check GitHub Pages is enabled: Settings → Pages
2. Verify branch is `main` and path is `/`
3. Wait 2-3 minutes for deployment
4. Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)

### Deployment Failed

Check Actions tab: `https://github.com/YOUR-USERNAME/antora-progress-tracking-guide/actions`

Common fixes:
- Ensure `index.html` is in root directory
- Check for HTML syntax errors
- Verify no large files (>100MB)

### Changes Not Showing

1. Wait 2-3 minutes after push
2. Clear browser cache
3. Check commit was pushed: `git log`
4. Check Actions tab for deployment status

## Testing Locally

Before deploying, test locally:

```bash
# Option 1: Python
cd /Users/kaknox/Documents/GitHub/antora-progress-tracking-guide
python3 -m http.server 8080
# Open: http://localhost:8080

# Option 2: Node.js (http-server)
npx http-server -p 8080
# Open: http://localhost:8080

# Option 3: Just open the file
open index.html
```

## Analytics (Optional)

Add Google Analytics to track page views:

1. Get tracking ID from Google Analytics
2. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Next Steps

- ✅ Customize URLs and contact info
- ✅ Deploy to GitHub Pages
- ✅ Share with team
- ✅ Add to internal documentation
- ✅ Bookmark for future reference

## Support

Need help with deployment?
- GitHub Pages docs: https://docs.github.com/pages
- GitHub Issues: https://github.com/YOUR-USERNAME/antora-progress-tracking-guide/issues
- Internal Slack: #your-support-channel
