// ===== MENU RESPONSIVO ====   
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("show");
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: "smooth"
            });
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();


            const nome = document.getElementById("nome").value.trim();


            alert(`Obrigado por se cadastrar, ${nome || "voluntário"}! 🌿\nEm breve entraremos em contato.`);

            form.reset();
        });
    }
});


document.addEventListener("scroll", () => {
    const cards = document.querySelectorAll(".card-item");
    const trigger = window.innerHeight * 0.85;

    cards.forEach(card => {
        const top = card.getBoundingClientRect().top;
        if (top < trigger) {
            card.classList.add("show");
        }
    });
});
