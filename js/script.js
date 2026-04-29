document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize AOS
    AOS.init({ duration: 1000, once: true });

    // 2. Counter Logic (Fast & Smooth)
    const counters = document.querySelectorAll(".counter");
    const statsSection = document.querySelector(".stats-section");
    let started = false;

    function startCounting(el) {
        let target = parseInt(el.dataset.target);
        let count = 0;
        let increment = target / 50; 

        let updateCount = () => {
            count += increment;
            if (count < target) {
                el.innerText = Math.ceil(count) + "+";
                setTimeout(updateCount, 20);
            } else {
                el.innerText = target + "+";
            }
        };
        updateCount();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                counters.forEach(counter => startCounting(counter));
                started = true;
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) observer.observe(statsSection);

    // 3. WhatsApp Redirect Function
    function sendToWhatsApp(name, phone, course, message = "Interested in admission") {
        const mobileNumber = "916261375866"; 
        const encodedMessage = encodeURIComponent(
            `*New Admission Inquiry*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Course:* ${course}\n*Message:* ${message}`
        );
        window.open(`https://wa.me/${mobileNumber}?text=${encodedMessage}`, '_blank');
    }

    // 4. Modal Form Submission
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = this.querySelectorAll('input');
            const name = inputs[0].value;
            const phone = inputs[1].value;
            const course = this.querySelector('select').value;

            sendToWhatsApp(name, phone, course);
            bootstrap.Modal.getInstance(document.getElementById('enrollModal')).hide();
            this.reset();
        });
    }

    // 5. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.classList.add('py-2', 'shadow');
        } else {
            nav.classList.remove('py-2', 'shadow');
        }
    });
});