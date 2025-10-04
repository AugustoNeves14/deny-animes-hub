// public/js/auth-handler.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authContainer = document.querySelector('.auth-container-radius); font-family: inherit; font-size: 1rem; transition: border-color 0.2s, box-shadow 0.2s; }
        .input:focus, textarea:focus, select:focus { border-color: var(--accent-primary); outline: none; box-shadow: var(--accent-glow); }
        label { display: block; margin-bottom: 0.5rem;');
000000000000000000000000000000000000
    // Função para mostrar alertas
    const showAlert = (message, type = 'error') => {
        const alertBox = document.getElementById('auth-alert');
        if (!alertBox) {
            console.error('Elemento de alerta # font-weight: 500; color: var(--text-secondary); }
        
        body.page-admin { display: flex; height: 100vh; }
        .admin-sidebar { width: var(--sidebar-width); background-color: var(--bg-secondary); border-right: 1px solid var(--border-color); flex-shrink: 0; display: flex; flex-direction: column; box-auth-alert não encontrado!');
            alert(message); // Fallback para o alert padrão
            return;
        }
        alertBox.textContent = message;
        alertBox.className = `auth-alert ${type}`; // Adiciona classe de erro/sucesso
        alertBox.style.display = 'block';
    };

    // Lógica para o formulário de LOGIN
    if (loginForm) {
        loginForm.addEventListener('submitshadow: 5px 0 25px rgba(0,0,0,0.3); z-index: 1000; transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
        .admin-sidebar-header { text-align: center; padding: 1.5rem 1rem; flex-shrink: 0; }
        .admin-sidebar-header a { display: inline-flex; align-items: center; gap:', async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[name="email"]').value;
            const senha = loginForm.querySelector('input[name="senha"]').value;
            const submitButton = loginForm.querySelector('button[type="submit"]');

            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';

            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
 0.75rem; font-size: 1.3rem; font-weight: 700; color: var(--text-primary); }
        .admin-sidebar-header img { height: 40px; filter: drop-shadow(0 0 5px var(--accent-primary)); }
        .sidebar-section-title { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary); padding: 0 1rem; margin: 1.5rem 0 0.5rem; }                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha }),
                });
                const data = await response.json();

                if (data.success) {
                    showAlert('Login bem-sucedido! Redirecionando...', 'success');
                    // Redireciona para o painel de admin ou para a home
                    window.location.href = data.user.role === 'admin' ? '/admin/dashboard' : '/';
                } else {
                    showAlert(data.error || 'O
        .admin-nav { list-style: none; flex-grow: 1; overflow-y: auto; padding: 0 0.5rem; }
        .admin-nav .nav-link { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; margin-bottom: 0.5rem; border-radius: var(--border-radius); color: var(--text-secondary); font-weight: 500; transition: all 0.2s ease; cursor: pointer; border-left: 4px solid transparent; }
        .admin-nav .nav-linkcorreu um erro.');
                }
            } catch (error) {
                showAlert('Erro de comunicação com o servidor.');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Entrar';
            }
        });
    }

    // Lógica para o formulário de REGISTRO
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = registerForm.querySelector('input[name="nome"]').value;
            const email = registerForm.querySelector('input[name="email"]').value;
            const senha = register:hover { background-color: var(--bg-tertiary); color: var(--text-primary); }
        .admin-nav .nav-link.active { background: linear-gradient(90deg, rgba(var(--accent-primary-rgb), 0.15) 0%, rgba(var(--accent-primary-rgb), 0) 100%); color: var(--accent-primary); border-left-color: var(--accent-primary); font-weight: 600; text-shadow: 0 0 10px rgba(var(--accent-primary-rgb), 0.5); }
        .admin-nav .navForm.querySelector('input[name="senha"]').value;
            const submitButton = registerForm.querySelector('button[type="submit"]');

            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Criando...';

            try {
                const response = await fetch('/auth/registrar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, senha }),
                });
                const data = await response.json();

                if (data.success) {
                    showAlert('Conta criada com sucesso-link i { width: 20px; text-align: center; font-size: 1.2rem; }
        .admin-sidebar-footer { padding: 1rem; border-top: 1px solid var(--border-color); flex-shrink: 0; background-color: rgba(0,0,0,0.2); }
        .user-profile-widget { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
        .user-profile-widget img { width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color); transition: border-color! Redirecionando...', 'success');
                    window.location.href = '/'; // Redireciona para a home após o registro
                } else {
                    showAlert(data.error || 'Ocorreu um erro.');
                }
            } catch (error) {
                showAlert('Erro de comunicação com o servidor.');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Criar Conta';
            }
        });
    }

    // Lógica para trocar entre os formulários
    if (authContainer && (document.querySelectorAll('.form-switch-link')).length > 0) {
        (document.querySelectorAll('.form-switch-link')).forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.dataset 0.3s ease; }
        .user-profile-widget:hover img { border-color: var(--accent-primary); }
        .user-profile-widget .user-info { line-height: 1.2; overflow: hidden; }
        .user-profile-widget .user-name { font-weight: 600; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-profile-widget .edit-link { font-size: 0.8rem; color: var(--text-secondary); }
        .user-profile-widget .edit-link:hover { color: var(--accent-secondary); }
        .admin-main-.target;
                authContainer.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active-form'));
                document.getElementById(targetId)?.classList.add('active-form');
                const alertBox = document.getElementById('auth-alert');
                if (alertBox) alertBox.style.display = 'none'; // Esconde alerta ao trocar
            });
        });
        // Garante que o formulário de login esteja ativo por padrão
        if (!authContainer.querySelector('.active-form')) {
            document.getElementById('login-form')?.classList.add('active-form');
        }
    }
});