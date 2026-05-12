/**
 * Visual Progress Tracker for Antora Course Navigation
 * Version: 1.0
 * Persists visited pages in localStorage and displays checkmarks in nav sidebar
 */
;(function() {
  'use strict'

  var STORAGE_KEY = 'antora-course-progress'
  var MARK_CLASS = 'nav-progress-mark'
  var VISITED_CLASS = 'is-visited'

  /**
   * Normalize URL path for consistent storage
   * Removes hash, query params, and trailing slashes
   */
  function normalizePath(path) {
    if (!path) return ''

    // Remove hash and query params
    path = path.split('#')[0].split('?')[0]

    // Remove trailing slash (except for root)
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1)
    }

    return path
  }

  /**
   * Get visited pages from localStorage
   */
  function getVisitedPages() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (e) {
      console.warn('Progress tracker: localStorage unavailable', e)
      return []
    }
  }

  /**
   * Save visited pages to localStorage
   */
  function setVisitedPages(pages) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pages))
    } catch (e) {
      console.warn('Progress tracker: Cannot save to localStorage', e)
    }
  }

  /**
   * Add current page to visited list
   */
  function markCurrentPageVisited() {
    var currentPath = normalizePath(window.location.pathname)
    if (!currentPath) return

    var visited = getVisitedPages()

    // Add if not already present
    if (visited.indexOf(currentPath) === -1) {
      visited.push(currentPath)
      setVisitedPages(visited)
    }
  }

  /**
   * Show checkmarks for all visited pages in navigation
   */
  function hydrateNavigationProgress() {
    var visited = getVisitedPages()
    if (!visited.length) return

    // Find all nav links with progress tracking
    var navLinks = document.querySelectorAll('.nav-link[data-progress-path]')

    navLinks.forEach(function(link) {
      var linkPath = normalizePath(link.getAttribute('data-progress-path'))

      if (visited.indexOf(linkPath) !== -1) {
        // Mark link as visited
        link.classList.add(VISITED_CLASS)

        // Show checkmark
        var mark = link.querySelector('.' + MARK_CLASS)
        if (mark) {
          mark.style.display = 'inline'
        }
      }
    })
  }

  /**
   * Clear all progress (utility function for debugging/reset)
   * Expose globally for console access: window.clearCourseProgress()
   */
  function clearProgress() {
    try {
      localStorage.removeItem(STORAGE_KEY)
      console.log('Course progress cleared')
      // Reload to update UI
      window.location.reload()
    } catch (e) {
      console.error('Failed to clear progress', e)
    }
  }

  /**
   * Debug function to log tracking state
   */
  function debugProgress() {
    var currentPath = normalizePath(window.location.pathname)
    var visited = getVisitedPages()
    var navLinks = document.querySelectorAll('.nav-link[data-progress-path]')

    console.log('=== Progress Tracker Debug ===')
    console.log('Current path:', currentPath)
    console.log('Visited pages:', visited)
    console.log('Nav links found:', navLinks.length)

    navLinks.forEach(function(link, i) {
      var linkPath = normalizePath(link.getAttribute('data-progress-path'))
      var isVisited = visited.indexOf(linkPath) !== -1
      console.log('Link ' + i + ':', {
        href: link.getAttribute('href'),
        dataPath: link.getAttribute('data-progress-path'),
        normalized: linkPath,
        isVisited: isVisited,
        hasClass: link.classList.contains(VISITED_CLASS)
      })
    })
  }

  /**
   * Initialize progress tracker
   */
  function init() {
    // Check for localStorage support
    if (typeof localStorage === 'undefined') {
      console.warn('Progress tracker: localStorage not available')
      return
    }

    // Mark current page as visited
    markCurrentPageVisited()

    // Show checkmarks for all visited pages
    hydrateNavigationProgress()

    // Expose clear function globally (for maintenance/debugging)
    window.clearCourseProgress = clearProgress
    window.debugCourseProgress = debugProgress

    // Auto-debug on load (can comment out after troubleshooting)
    console.log('Progress tracker initialized. Run debugCourseProgress() for details.')
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    // DOM already loaded
    init()
  }
})()
