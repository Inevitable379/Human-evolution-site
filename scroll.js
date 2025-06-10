window.addEventListener('scroll', function() {
    revealSectionsOnScroll();
});

function revealSectionsOnScroll() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        // Reveal section if its top is within viewport (e.g., 100px from bottom)
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
        // Optional: If you want sections to hide again when scrolled out of view
        // else {
        //     section.classList.remove('visible');
        // }
    });
}

// Call once on page load to reveal sections already in view
document.addEventListener('DOMContentLoaded', revealSectionsOnScroll);
