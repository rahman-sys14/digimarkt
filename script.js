document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const scrollButtons = document.querySelectorAll('[data-scroll]');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const metricValues = document.querySelectorAll('.metric-value');
    const form = document.querySelector('.cta-form');
    const dashboardTabs = document.querySelectorAll('.dashboard-tab');
    const rangeLabel = document.getElementById('rangeLabel');
    const rangeBadge = document.querySelector('[data-dashboard-range]');
    const chartCanvas = document.getElementById('volumeChart');
    const laneList = document.getElementById('laneList');
    const statShipments = document.getElementById('statShipments');
    const statShipmentsDelta = document.getElementById('statShipmentsDelta');
    const statOnTime = document.getElementById('statOnTime');
    const statDistance = document.getElementById('statDistance');
    const statEmissions = document.getElementById('statEmissions');

    const toggleNav = () => {
        hamburger?.classList.toggle('is-open');
        hamburger?.classList.toggle('active'); // legacy support
        navMenu?.classList.toggle('is-open');
        navMenu?.classList.toggle('active'); // legacy support
        document.body.classList.toggle('nav-open');
    };

    const closeNav = () => {
        hamburger?.classList.remove('is-open', 'active');
        navMenu?.classList.remove('is-open', 'active');
        document.body.classList.remove('nav-open');
    };

    hamburger?.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleNav();
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => closeNav());
    });

    document.addEventListener('click', (event) => {
        if (!navMenu || !hamburger) return;
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedHamburger = hamburger.contains(event.target);
        if (!clickedInsideMenu && !clickedHamburger && navMenu.classList.contains('is-open')) {
            closeNav();
        }
    });

    const smoothScroll = (target) => {
        if (!target) return;
        const el = document.querySelector(target);
        if (!el) return;
        const navHeight = document.querySelector('.navbar')?.offsetHeight ?? 0;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    };

});
// End of script.js

//hero section animation
document.querySelector('.hero-content').style.opacity = "0";

window.onload = () => {
    setTimeout(() => {
        document.querySelector('.hero-content').style.transition = "1.2s";
        document.querySelector('.hero-content').style.opacity = "1";
    }, 300);
};
//dashboard chart setup
// Fade-in animation on scroll
const dashboardSection = document.querySelector('.dashboard-preview');

window.addEventListener('scroll', () => {
  const position = dashboardSection.getBoundingClientRect().top;
  
  if(position < window.innerHeight - 100){
    dashboardSection.style.opacity = 1;
    dashboardSection.style.transform = "translateY(0)";
  }
});
//home 2


