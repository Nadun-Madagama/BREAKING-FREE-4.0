// Main JavaScript for Project Breaking Free 4.0

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-opacity-90', 'shadow-lg');
            navbar.classList.remove('bg-opacity-50');
        } else {
            navbar.classList.remove('bg-opacity-90', 'shadow-lg');
            navbar.classList.add('bg-opacity-50');
        }
    });

    // 3. Countdown Timer
    // Set the date we're counting down to (e.g., 2 weeks from now)
    const countDownDate = new Date().getTime() + (14 * 24 * 60 * 60 * 1000);

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById('countdown').innerHTML = "EXPIRED";
        }
    }, 1000);

    // 4. Scroll Animations (Fade Up)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible if desired, or keep for re-entry
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 5. Impact Counter Animation
    const statsSection = document.getElementById('impact');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                animateValue("stat-students", 0, 250, 2000);
                animateValue("stat-workshops", 0, 10, 2000);
                animateValue("stat-volunteers", 0, 50, 2000);
                animateValue("stat-stories", 0, 5, 2000);
                statsAnimated = true;
            }
        });
    }, observerOptions);

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + "+";
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
