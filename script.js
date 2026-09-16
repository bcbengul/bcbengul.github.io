document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const backToTop = document.getElementById('backToTop');
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const typedText = document.getElementById('typedText');
    const roles = ['Gömülü Sistemler', 'Otomotiv Elektroniği', 'Ar-Ge Elektronik'];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeRole = () => {
        const currentRole = roles[roleIndex];
        typedText.textContent = deleting
            ? currentRole.slice(0, charIndex--)
            : currentRole.slice(0, charIndex++);

        let delay = deleting ? 45 : 85;
        if (!deleting && charIndex > currentRole.length) {
            deleting = true;
            delay = 1500;
        } else if (deleting && charIndex < 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            charIndex = 0;
            delay = 350;
        }
        window.setTimeout(typeRole, delay);
    };

    typeRole();

    navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => navMenu.classList.remove('open'));
    });

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
        backToTop.classList.toggle('show', window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.skill-fill').forEach((bar) => {
                bar.style.width = `${bar.dataset.width}%`;
            });
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.25 });
    document.querySelectorAll('.skills-category').forEach((category) => skillObserver.observe(category));

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        formStatus.textContent = `Teşekkürler ${name}! Mesajınız hazırlandı. Bu formu çalışır hale getirmek için bir form servisi bağlayabilirsiniz.`;
        form.reset();
    });

    document.getElementById('year').textContent = new Date().getFullYear();
});
