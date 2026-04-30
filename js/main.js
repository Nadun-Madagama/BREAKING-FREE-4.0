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

    // 5. Generic Impact Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                let startTimestamp = null;
                
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const easeOut = progress * (2 - progress);
                    
                    // Add comma formatting if needed, though most numbers here are small
                    const currentVal = Math.floor(easeOut * target);
                    counter.innerText = currentVal.toLocaleString();
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                window.requestAnimationFrame(step);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // 6. Generate video preview posters from the first frame of each local video.
    const captureVideoThumbnail = async (videoSrc) => {
        return new Promise((resolve, reject) => {
            const tempVideo = document.createElement('video');
            tempVideo.muted = true;
            tempVideo.preload = 'metadata';
            tempVideo.src = videoSrc;
            tempVideo.crossOrigin = 'anonymous';

            const cleanup = () => {
                tempVideo.src = '';
            };

            const onError = () => {
                cleanup();
                reject(new Error('Video thumbnail capture failed'));
            };

            const onSeeked = () => {
                const canvas = document.createElement('canvas');
                canvas.width = tempVideo.videoWidth;
                canvas.height = tempVideo.videoHeight;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    cleanup();
                    reject(new Error('Unable to get canvas context'));
                    return;
                }
                ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
                cleanup();
                resolve(dataUrl);
            };

            const onLoadedMetadata = () => {
                const seekTime = Math.min(0.1, tempVideo.duration / 10, 1);
                tempVideo.currentTime = seekTime;
            };

            tempVideo.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
            tempVideo.addEventListener('seeked', onSeeked, { once: true });
            tempVideo.addEventListener('error', onError, { once: true });
        });
    };

    document.querySelectorAll('video[poster]').forEach(async (videoEl) => {
        const source = videoEl.querySelector('source');
        if (!source || !source.src) return;

        try {
            const posterDataUrl = await captureVideoThumbnail(source.src);
            if (posterDataUrl) {
                videoEl.poster = posterDataUrl;
            }
        } catch (error) {
            console.warn('Could not generate video preview poster:', error);
        }
    });
});
