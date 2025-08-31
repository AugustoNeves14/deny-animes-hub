// ==========================================================================
// == SCRIPT CENTRAL DE PROTEÇÃO E ALERTA - NÍVEL KAGE (VERSÃO MELHORADA)  ==
// == Autor: Gemini AI - Focado em Inteligência e Baixo Falso-Positivo   ==
// ==========================================================================

(function() {
    'use strict';

    // Garante que o script seja executado apenas uma vez, mesmo que seja importado acidentalmente de novo.
    if (window.protectionScriptLoaded) {
        return;
    }
    window.protectionScriptLoaded = true;

    // --- CONFIGURAÇÕES GERAIS ---
    const IS_PRODUCTION = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    const THROTTLE_DELAY = 10000; // Intervalo (ms) para evitar spam de alertas do mesmo tipo.
    const DETECTOR_INTERVAL = 1000; // Intervalo (ms) para verificar a abertura do DevTools.

    let lastAlerts = {}; // Armazena o timestamp do último alerta enviado para cada tipo.

    /**
     * Envia um alerta de segurança para o back-end.
     * Esta função é o coração do sistema de notificação.
     * @param {string} eventType - O tipo de evento detectado (ex: 'devtools-opened', 'right-click').
     * @param {string} severity - A gravidade do evento ('low', 'medium', 'high').
     */
    async function sendSecurityAlert(eventType, severity = 'medium') {
        const now = Date.now();
        if (lastAlerts[eventType] && (now - lastAlerts[eventType] < THROTTLE_DELAY)) {
            return; // Aborta se um alerta recente do mesmo tipo já foi enviado.
        }
        lastAlerts[eventType] = now;

        console.warn(`[PROTEÇÃO KAGE] Ação suspeita detectada: ${eventType} (Gravidade: ${severity})`);

        // Em um ambiente real, esta chamada para a API notificaria o administrador.
        // Certifique-se de que a rota '/api/security/log-event' existe e está funcional no seu back-end.
        try {
            await fetch('/api/security/log-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventType: eventType,
                    severity: severity,
                    pageUrl: window.location.href,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString()
                }),
            });
        } catch (error) {
            // A falha é silenciosa no console do usuário para não dar pistas.
            // O erro é logado internamente para que o desenvolvedor possa ver.
            console.error('Falha ao enviar log de segurança para o servidor.', error);
        }
    }

    // --- MÓDULO 1: BLOQUEIO DE AÇÕES DO USUÁRIO ---

    // 1.1. Bloqueia o menu de contexto (clique direito e toque longo em mobile)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        sendSecurityAlert("Menu de Contexto (Clique Direito)", 'low');
    }, false);

    // 1.2. Bloqueia a seleção de texto e a funcionalidade de cópia (Ctrl+C / Cmd+C)
    // A propriedade CSS é mais eficiente e funciona em todos os dispositivos.
    const style = document.createElement('style');
    style.innerHTML = `
      body, html {
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE/Edge */
        user-select: none; /* Padrão */
        -webkit-touch-callout: none; /* Desabilita o menu de toque longo no iOS */
      }
    `;
    document.head.appendChild(style);

    document.addEventListener('copy', (e) => {
        e.preventDefault();
        sendSecurityAlert("Tentativa de Cópia (Ctrl+C)", 'low');
    });

    // 1.3. Bloqueia atalhos de teclado comuns para inspeção e salvamento
    document.addEventListener('keydown', function(e) {
        // Bloqueia F12
        if (e.key === "F12" || e.keyCode === 123) {
            e.preventDefault();
            sendSecurityAlert("Tecla F12 Pressionada", 'medium');
            return;
        }
        // Bloqueia Ctrl+Shift+I/J/C (Inspecionar, Console, Inspecionar Elemento)
        if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
            e.preventDefault();
            sendSecurityAlert(`Atalho de Inspeção (${e.key.toUpperCase()})`, 'high');
            return;
        }
        // Bloqueia Ctrl+U (Ver código-fonte) e Ctrl+S (Salvar página)
        if (e.ctrlKey && ['U', 'S'].includes(e.key.toUpperCase())) {
            e.preventDefault();
            sendSecurityAlert(`Atalho de Página (${e.key.toUpperCase()})`, 'medium');
            return;
        }
    }, false);


    // --- MÓDULO 2: DETECÇÃO INTELIGENTE DE DEVTOOLS ---

    const devToolsDetector = {
        isOpen: false,
        isBlocked: false,
        detectionTries: 0,
        threshold: 170, // Sensibilidade para a detecção por tamanho de janela.

        // Técnica 1: Verifica a diferença entre o tamanho da janela externa e interna.
        // Funciona bem para DevTools ancorado na janela.
        checkSize: function() {
            const widthThreshold = window.outerWidth - window.innerWidth > this.threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > this.threshold;
            return widthThreshold || heightThreshold;
        },

        // Técnica 2: Mede o tempo de execução de um 'debugger'.
        // Se as ferramentas de desenvolvedor estiverem abertas, o tempo será muito maior.
        // Esta técnica é mais robusta contra DevTools flutuantes.
        checkDebugger: function() {
            const startTime = performance.now();
            debugger; // Esta linha só pausa se o DevTools estiver aberto.
            const endTime = performance.now();
            // Se demorar mais de 100ms, é quase certeza que o DevTools interceptou.
            return (endTime - startTime) > 100;
        },

        // Ação a ser tomada quando as DevTools são detectadas.
        onDevToolsOpen: function() {
            if (this.isBlocked) return; // Se a página já está bloqueada, não faz nada.
            
            this.isOpen = true;
            sendSecurityAlert("Ferramentas de Desenvolvedor Abertas", 'high');

            // Ação drástica apenas em ambiente de produção e após detecção confirmada.
            if (IS_PRODUCTION) {
                this.detectionTries++;
                
                // A partir da segunda detecção, a ação se torna mais severa.
                if (this.detectionTries > 1) {
                    this.isBlocked = true; // Marca como bloqueado para evitar loops.
                    
                    // Armadilha 1: Congela o debugger, tornando as ferramentas inúteis.
                    setInterval(() => {
                        debugger;
                    }, 50);

                    // Armadilha 2: Mensagem de bloqueio final e redirecionamento/bloqueio.
                    console.error("[VIOLAÇÃO] Atividade de depuração confirmada. Acesso bloqueado.");
                    setTimeout(() => {
                        document.body.innerHTML = `
                            <div style='position:fixed; inset:0; background:black; color:red; display:flex; align-items:center; justify-content:center; font-size:1.5rem; text-align:center; font-family:monospace; z-index:999999;'>
                                <h1>ACESSO NEGADO<br>Atividade Suspeita Detectada (Código: KAGE-01)</h1>
                            </div>`;
                        // Opcional: redirecionar para uma página de bloqueio.
                        // window.location.href = "/acesso-negado";
                    }, 1000);
                }
            }
        },

        // Lógica principal de verificação
        runCheck: function() {
            if (this.checkSize() || this.checkDebugger()) {
                if (!this.isOpen) {
                    this.onDevToolsOpen();
                }
            } else {
                this.isOpen = false;
                this.detectionTries = 0; // Reseta as tentativas se o DevTools for fechado.
            }
        }
    };

    // Inicia o monitoramento contínuo em intervalos regulares.
    setInterval(() => devToolsDetector.runCheck(), DETECTOR_INTERVAL);

    console.log("Módulo de Proteção Akatsuki Nível Kage (v2.0): Ativado e monitorando.");

})();