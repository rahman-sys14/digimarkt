// Page Transition and Loading Screen System
(function() {
    'use strict';

    let loader, progressBar;

    // Create loading screen HTML
    const loadingScreenHTML = `
        <div id="page-loader" class="page-loader">
            <div class="loader-content">
                <div class="loader-logo">
                    <img src="assets/logo-removebg-preview.png" alt="Loading" class="loader-img">
                </div>
                <div class="loader-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <p class="loader-text">Loading...</p>
                <div class="loader-progress">
                    <div class="loader-progress-bar"></div>
                </div>
            </div>
        </div>
    `;

    // Initialize loader
    function initLoader() {
        if (!document.getElementById('page-loader')) {
            document.body.insertAdjacentHTML('afterbegin', loadingScreenHTML);
        }
        loader = document.getElementById('page-loader');
        progressBar = document.querySelector('.loader-progress-bar');
    }

    // Show loader on page load
    function showLoader() {
        if (!loader || !progressBar) initLoader();
        loader.classList.add('active');
        if (progressBar) {
            progressBar.style.width = '0%';
            
            // Animate progress bar
            let progress = 0;
            const interval = setInterval(() => {
                progress += 6.67; // 100% over 1.5 seconds
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                if (progressBar) {
                    progressBar.style.width = progress + '%';
                }
            }, 100);
        }
    }

    // Hide loader after 1.5 seconds
    function hideLoader() {
        setTimeout(() => {
            loader.classList.remove('active');
            // Trigger page-specific animation
            triggerPageAnimation();
        }, 1500);
    }

    // Get current page name for animation
    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        return page.replace('.html', '');
    }

    // Trigger page-specific animation
    function triggerPageAnimation() {
        const page = getCurrentPage();
        const body = document.body;
        
        // Remove any existing animation classes
        body.className = body.className.replace(/page-animation-\w+/g, '');
        
        // Add page-specific animation class
        body.classList.add(`page-animation-${page}`);
        
        // Trigger animation
        setTimeout(() => {
            body.classList.add('animate-in');
        }, 50);
    }

    // Intercept all internal link clicks
    function interceptLinks() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            
            if (!link) return;
            
            const href = link.getAttribute('href');
            
            // Only intercept internal HTML links
            if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('//')) {
                e.preventDefault();
                
                // Show loader
                showLoader();
                
                // Navigate after showing loader
                setTimeout(() => {
                    window.location.href = href;
                }, 100);
            }
        });
    }

    // Initialize on page load
    function init() {
        initLoader();
        showLoader();
        hideLoader();
        interceptLinks();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle browser back/forward buttons
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            initLoader();
            showLoader();
            hideLoader();
        }
    });

})();

