// Global heading animation utility
export const initHeadingAnimations = () => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || '0';
                    const delayMs = parseFloat(delay) * 100;
                    
                    setTimeout(() => {
                        entry.target.classList.add('heading-animated');
                    }, delayMs);
                    
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2, rootMargin: '0px 0px -80px 0px' }
    );

    const headings = document.querySelectorAll('[data-heading-animate]');
    headings.forEach((heading) => observer.observe(heading));

    return () => {
        headings.forEach((heading) => observer.unobserve(heading));
    };
};

