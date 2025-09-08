// ==========================================================================
// == ARQUIVO CENTRAL DE PROTEÇÃO E ALERTA - NÍVEL KAGE                      ==
// == Este script bloqueia ações, detecta DevTools e envia alertas ao      ==
// == servidor para notificação por e-mail.                                ==
// ==========================================================================

// [CORREÇÃO] O código agora está envolto em uma IIFE (Immediately Invoked Function Expression)
// A sintaxe (function() { ... })(); garante que o código seja executado imediatamente
// e que suas variáveis não entrem em conflito com outros scripts.
(function() {
    'use strict';

    // Verificação para garantir que o script não seja carregado múltiplas vezes
    if (window.protectionScriptLoaded) {
        return;
    }
    window.protectionScriptLoaded = true;

    // Constantes e variáveis de controle
    const IS_PRODUCTION = window.location.hostname !== 'localhost';
    const THROTTLE_DELAY = 10000; // 10 segundos de espera entre alertas do mesmo tipo
    let lastAlerts = {};

    /**
     * Envia um evento de segurança para o back-end para log e notificação por e-mail.
     * @param {string} eventType - O tipo de evento (ex: 'devtools-opened', 'right-click').
     */
    async function sendSecurityAlert(eventType) {
        // Controle para não sobrecarregar o servidor com alertas repetidos
        const now = Date.now();
        if (lastAlerts[eventType] && (now - lastAlerts[eventType] < THROTTLE_DELAY)) {
            return; // Aborta se um alerta recente do mesmo tipo já foi enviado
        }
        lastAlerts[eventType] = now;
    
        console.warn(`[PROTEÇÃO] Ação suspeita detectada: ${eventType}. Evento registrado.`);

        try {
            // A chamada fetch é feita para a rota da API de segurança
            await fetch('/api/security/log-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventType: eventType,
                    pageUrl: window.location.href,
                    userAgent: navigator.userAgent
                }),
            });
        } catch (error) {
            // Falha silenciosamente para não alertar o usuário sobre o erro no log do console.
            console.error('Falha ao enviar log de segurança para o servidor.');
        }
    }

    // 1. Desabilitar o menu de contexto (clique direito do mouse)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        sendSecurityAlert("Menu de Contexto (Clique Direito)");
    }, false);

    // 2. Desabilitar a seleção de texto e cópia
    const style = document.createElement('style');
    style.innerHTML = 'body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }';
    document.head.appendChild(style);

    document.addEventListener('copy', function(e) {
        e.preventDefault();
        sendSecurityAlert("Tentativa de Cópia (Ctrl+C)");
        return false;
    });

    // 3. Desabilitar atalhos de teclado comuns para ferramentas de desenvolvedor
    document.addEventListener('keydown', function(e) {
        const key = e.key.toUpperCase();
        if (e.key === "F12" || e.keyCode === 123) {
            e.preventDefault();
            sendSecurityAlert("Tecla F12 Pressionada");
        }
        if (e.ctrlKey && e.shiftKey && key === "I") {
            e.preventDefault();
            sendSecurityAlert("Atalho Inspecionar (Ctrl+Shift+I)");
        }
        if (e.ctrlKey && e.shiftKey && key === "J") {
            e.preventDefault();
            sendSecurityAlert("Atalho Console (Ctrl+Shift+J)");
        }
        if (e.ctrlKey && e.shiftKey && key === "C") {
            e.preventDefault();
            sendSecurityAlert("Atalho Inspecionar Elemento (Ctrl+Shift+C)");
        }
        if (e.ctrlKey && key === "U") {
            e.preventDefault();
            sendSecurityAlert("Atalho Ver Código-Fonte (Ctrl+U)");
        }
        if (e.ctrlKey && key === "S") {
            e.preventDefault();
            sendSecurityAlert("Atalho Salvar Página (Ctrl+S)");
        }
    }, false);

    // 4. Detecção robusta de abertura das Ferramentas de Desenvolvedor (DevTools)
    const devtools = {
        open: false,
        threshold: 170, // Sensibilidade da detecção
        check() {
            const widthThreshold = window.outerWidth - window.innerWidth > this.threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > this.threshold;

            if (widthThreshold || heightThreshold) {
                if (!this.open) {
                    sendSecurityAlert("Ferramentas de Desenvolvedor Abertas");
                    this.onDevToolsOpen();
                }
                this.open = true;
            } else {
                this.open = false;
            }
        },
        // Ação a ser tomada quando as DevTools são abertas
        onDevToolsOpen() {
            // Em ambiente de produção, executa ações mais drásticas.
            if (IS_PRODUCTION) {
                // Armadilha 1: Congela o debugger, tornando as ferramentas inúteis
                setInterval(() => {
                    debugger;
                }, 50);

                // Armadilha 2: Limpa o console repetidamente
                setInterval(() => {
                    console.clear();
                    console.warn('[VIOLAÇÃO] Atividade de depuração detectada. A página será recarregada.');
                }, 1500);

                // Armadilha 3: Redireciona o usuário após um tempo
                setTimeout(() => {
                    document.body.innerHTML = "<div style='position:fixed;inset:0;background:black;color:red;display:flex;align-items:center;justify-content:center;font-size:2rem;text-align:center;'><h1>ACESSO NEGADO<br>Atividade Suspeita Detectada</h1></div>";
                    // Alternativamente, redirecionar:
                    // window.location.href = "/acesso-negado";
                }, 2000);
            }
        }
    };

    // Roda a verificação de DevTools em um intervalo regular
    setInterval(() => devtools.check(), 1000);

    console.log("Módulo de Proteção Akatsuki Nível Kage: Ativado.");

})();