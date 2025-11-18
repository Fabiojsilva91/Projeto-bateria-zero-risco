document.addEventListener('DOMContentLoaded', () => {

    /* ========================= MENU ========================= */
    const menuToggle = () => {
        const menu = document.getElementById('navMenu');
        const button = document.querySelector('.menu-toggle'); 

        if (menu && button) {
            const isExpanded = menu.classList.toggle('open');
            button.setAttribute('aria-expanded', isExpanded);

            if (!isExpanded) button.focus();
        }
    };
    window.toggleMenu = menuToggle;


    /* ========================= SCROLL ========================= */
    const scrollToSection = (sectionId) => {
        const cleanSectionId = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
        const section = document.getElementById(cleanSectionId);
        if (!section) return;

        const headerHeight = 70;
        const sectionPos = section.offsetTop - headerHeight;

        window.scrollTo({ top: sectionPos, behavior: 'smooth' });

        const menu = document.getElementById('navMenu');
        if (menu) menu.classList.remove('open');

        section.setAttribute('tabindex', '-1');
        section.focus();
        section.removeAttribute('tabindex');
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if (!this.classList.contains('sr-only')) {
                scrollToSection(this.getAttribute('href'));
            }
        });
    });


    /* ========================= TEMA ========================= */
    const toggleTheme = () => {
        const body = document.body;
        const isDark = body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateIcon(isDark);
    };
    window.toggleTheme = toggleTheme;

    const updateIcon = (isDark) => {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.innerHTML = isDark
                ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>'
                : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
        }
    };


    /* ========================= LOGIN ========================= */

    let lastFocusedElement = null;

    /** ABRIR MODAL */
    const openLoginModal = (e) => {
        if (e && e.target) lastFocusedElement = e.target;

        document.getElementById('loginModal').classList.add('open');
        const username = document.getElementById('username');
        if (username) username.focus();
    };
    window.openLoginModal = openLoginModal;

    const loginButton = document.getElementById('open-login-btn');
    if (loginButton) loginButton.addEventListener('click', openLoginModal);

    /** FECHAR MODAL */
    const closeLoginModal = () => {
        const modal = document.getElementById('loginModal');
        const feedback = document.getElementById('loginFeedback');
        const user = document.getElementById('username');
        const pass = document.getElementById('password');

        if (modal) modal.classList.remove('open');
        if (feedback) {
            feedback.textContent = "";
            feedback.classList.remove('text-red-500', 'text-primary');
        }
        if (user) user.value = '';
        if (pass) pass.value = '';

        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    };
    window.closeLoginModal = closeLoginModal;


    /** MOSTRAR LOGIN / LOGOUT */
    const updateLoginStatus = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const loginBtn = document.getElementById('login-btn-container');
        const logoutBtn = document.getElementById('logout-btn-container');

        if (!loginBtn || !logoutBtn) return;

        if (isLoggedIn) {
            loginBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
        } else {
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
        }
    };
    window.updateLoginStatus = updateLoginStatus;


    /** LOGOUT */
    const logOut = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        updateLoginStatus();
        alert("Logout efetuado com sucesso.");
    };
    window.logOut = logOut;


    /** LOGIN */
    const handleLogin = (event) => {
        event.preventDefault();

        const user = document.getElementById('username').value.toLowerCase();
        const pass = document.getElementById('password').value;
        const feedback = document.getElementById('loginFeedback');

        const validUsers = {
            "admin": "admin123",
            "voluntario": "volun123",
            "doador": "doador123",
            "visitante": "visita123"
        };

        feedback.textContent = "";

        if (validUsers[user] === pass) {
            feedback.classList.remove('text-red-500');
            feedback.classList.add('text-primary');
            feedback.textContent = `Sucesso! Bem-vindo(a), ${user}!`;

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', user);

            setTimeout(() => {
                closeLoginModal();
                updateLoginStatus();
                alert(`Login efetuado com sucesso como: ${user.toUpperCase()}`);
            }, 700);

        } else {
            feedback.classList.remove('text-primary');
            feedback.classList.add('text-red-500');
            feedback.textContent = "Usuário ou Senha incorretos. Tente novamente.";
        }
    };
    window.handleLogin = handleLogin;


    /* ========================= VOLUNTÁRIOS ========================= */

    const saveNewVolunteer = (data) => {
        let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
        voluntarios.push({
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            idade: data.idade,
            disponibilidade: data.disponibilidade,
            dataCadastro: new Date().toLocaleDateString('pt-BR')
        });
        localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
        if (typeof window.exibirVoluntarios === 'function') window.exibirVoluntarios();
    };

    const showSuccess = (form) => {
        const success = document.getElementById('success-message');
        if (!success) return;

        form.style.display = 'none';
        success.style.display = 'block';
        success.classList.add('show');

        const heading = success.querySelector('h2');
        if (heading) {
            heading.setAttribute('tabindex', '-1');
            heading.focus();
            heading.removeAttribute('tabindex');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = document.getElementById('volunteerform');
        if (!form) return;

        if (!form.checkValidity()) return;

        const formData = new FormData(form);
        saveNewVolunteer(Object.fromEntries(formData.entries()));
        showSuccess(form);
    };

    const form = document.getElementById('volunteerform');
    if (form) form.addEventListener('submit', handleSubmit);

    const exibirVoluntarios = () => {
        const lista = JSON.parse(localStorage.getItem('voluntarios')) || [];
        const container = document.getElementById('voluntariosContainer');
        if (!container) return;

        if (lista.length === 0) {
            container.innerHTML = '<p>Nenhum voluntário cadastrado.</p>';
            return;
        }
    };
    window.exibirVoluntarios = exibirVoluntarios;


    exibirVoluntarios();
    updateLoginStatus();


    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    let dark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    if (dark) document.body.classList.add('dark');
    updateIcon(dark);

    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target.id === 'loginModal') closeLoginModal();
        });
    }
});

window.handleSubmit = async function(event) {
    event.preventDefault();

    const form = event.target;
    
    // 1. ADICIONA: Verifica a validade nativa do formulário primeiro
    if (!form.checkValidity()) {
        
        // Exibe o modal de erro se a validação nativa falhar
        showMessage("Erro de Preenchimento", "Por favor, preencha todos os campos obrigatórios e corrija os erros marcados.", false);
        
        // Aciona a exibição das tooltips de erro nativas do navegador (recomenda-se para acessibilidade)
        form.reportValidity(); 
        
        return; // Pára a execução
    }

    // O restante do seu código (que já valida o CNPJ, Idade e Termos) continua aqui.

    if (!db) {
        showMessage("Atenção", "O cadastro **não foi salvo**. A conexão com o banco de dados não está configurada. Verifique o console para mais detalhes.", false);
        return;
    }
    
    const formData = new FormData(form);
    const isBusiness = document.getElementById('individual-fields').classList.contains('hidden');
    const type = isBusiness ? 'business' : 'individual';

    if (!document.getElementById('terms').checked) {
        showMessage("Erro de Validação", "Você deve concordar com os Termos de Serviço para continuar.", false);
        return;
    }

    const data = {
        type: type,
        name: formData.get('name'),
        email: formData.get('email'),
        phone: phoneMask.unmaskedValue, 
        city: formData.get('city'),
        timestamp: new Date().toISOString(),
        user_id_ref: userId 
    };
    
    if (data.phone.length < 10) {
        showMessage("Erro de Validação", "Por favor, insira um Telefone completo (DDD + Número).", false);
        return;
    }

    
    if (type === 'individual') {
        data.age = formData.get('age');
        data.interest = formData.get('interest');

        const age = parseInt(data.age, 10);
        if (isNaN(age) || age < 18) {
            showMessage("Erro de Validação", "Você deve ter 18 anos ou mais para participar como Pessoa Física.", false);
            return;
        }
    } else { 
    
        data.cnpj = cnpjMask.unmaskedValue;
        data.sector = formData.get('sector');
        data.volume = formData.get('volume');
        if (data.cnpj.length !== 14) {
            showMessage("Erro de Validação", "Por favor, insira um CNPJ válido (14 dígitos).", false);
            return;
        }
    }
    
 
    try {
        const registrationsCollectionRef = collection(db, `artifacts/${appId}/public/data/registrations`);
        const docRef = doc(registrationsCollectionRef, `${userId}_${Date.now()}`);
        await setDoc(docRef, data);
        
        showMessage("Cadastro Realizado!", `Obrigado por se juntar ao Bateria Zero Risco. Seus dados foram salvos com sucesso. Entraremos em contato em breve!`);
        
        form.reset();
        switchFormType('individual'); 

    } catch (e) {
        console.error("Erro ao salvar no Firestore:", e);
        showMessage("Erro no Servidor", "Ocorreu um erro ao salvar seu cadastro. Por favor, tente novamente.", false);
    }
}