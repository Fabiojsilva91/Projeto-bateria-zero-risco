// ===== MENU RESPONSIVO =====
function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("show");
}

// ===== ROLAGEM SUAVE ENTRE SEÇÕES =====
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

// ===== MENSAGEM DE CONFIRMAÇÃO DO FORMULÁRIO =====
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();

            // Captura o nome digitado
            const nome = document.getElementById("nome").value.trim();

            // Exibe uma mensagem de agradecimento
            alert(`Obrigado por se cadastrar, ${nome || "voluntário"}! 🌿\nEm breve entraremos em contato.`);

            // Limpa o formulário
            form.reset();
        });
    }
});

// ===== ANIMAÇÃO DOS CARDS AO ROLAR A PÁGINA =====
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
