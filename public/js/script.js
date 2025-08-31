// ==========================================================================
// DenyAnimeHub - Script Unificado v1.1 (Futuristic Akatsuki)
// ==========================================================================
// Este script é responsável por toda a lógica de interação do usuário, animações, temas e modais.
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // LÓGICA DO MENU HAMBÚRGUER (MOBILE)
    // =========================================================================
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');
    const overlay = document.getElementById('page-overlay');
    const body = document.body;

    // Verifica se os elementos essenciais existem na página
    if (hamburgerBtn && mainNav && overlay) {
        
        const toggleMenu = () => {
            const isActive = mainNav.classList.toggle('is-active');
            body.classList.toggle('nav-open', isActive);
            
            // Define o atributo ARIA para acessibilidade
            hamburgerBtn.setAttribute('aria-expanded', isActive);

            // Muda o ícone do botão para um 'X' quando o menu está aberto
            const icon = hamburgerBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isActive);
                icon.classList.toggle('fa-times', isActive);
            }
        };

        // Adiciona o ouvinte de evento ao botão do hambúrguer
        hamburgerBtn.addEventListener('click', toggleMenu);

        // Adiciona o ouvinte de evento ao overlay para fechar o menu ao clicar fora
        overlay.addEventListener('click', toggleMenu);
    }


    // =========================================================================
    // LÓGICA DO TEMA (ESCURO/CLARO) - Certifique-se de que não está duplicada
    // =========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggleBtn && htmlElement) {
        // Função para aplicar o tema salvo no carregamento da página
        const applySavedTheme = () => {
            const savedTheme = localStorage.getItem('theme') || 'dark'; // Padrão 'dark' se não houver nada salvo
            htmlElement.setAttribute('data-theme', savedTheme);
        };

        // Função para alternar o tema e salvar a preferência
        const toggleTheme = () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        };

        // Adiciona o ouvinte de evento ao botão de tema
        themeToggleBtn.addEventListener('click', toggleTheme);

        // Aplica o tema salvo assim que o DOM estiver pronto
        applySavedTheme();
    }
    
    // =========================================================================
    // ANIMAÇÕES COM INTERSECTION OBSERVER (Opcional, mas recomendado)
    // =========================================================================
    const animatedSections = document.querySelectorAll('.animated-section');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedSections.forEach(section => {
            observer.observe(section);
        });
    } else {
        // Fallback para navegadores antigos que não suportam IntersectionObserver
        animatedSections.forEach(section => {
            section.classList.add('is-visible');
        });
    }

});


document.addEventListener('DOMContentLoaded', () => {
    console.log("%cDenyAnimeHub Script v1.1 Inicializado", "color: #ff3b3b; font-weight: bold;");

    // --- Seletores Globais e Estado ---
    const bodyElement = document.body;
    if (!bodyElement) {
        console.error("FATAL: Elemento <body> não encontrado.");
        return;
    }
    let currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark

    // --- 1. Lógica de Tema (Executa em TODAS as páginas) ---
    const themeToggleButtons = document.querySelectorAll('.theme-switch');

    const applyTheme = (theme) => {
        if(theme !== 'light' && theme !== 'dark') theme = 'dark'; // Fallback
        bodyElement.dataset.theme = theme;
        currentTheme = theme;
        localStorage.setItem('theme', theme);
        console.log(`[Theme] Tema aplicado: ${theme}`);
        // Adicional: Atualiza ícones em todos os botões de tema
        themeToggleButtons.forEach(button => {
            const moonIcon = button.querySelector('.icon-moon');
            const sunIcon = button.querySelector('.icon-sun');
            if(moonIcon) moonIcon.style.display = theme === 'dark' ? 'none' : 'inline-block';
            if(sunIcon) sunIcon.style.display = theme === 'dark' ? 'inline-block' : 'none';
        });
    };
    
    applyTheme(currentTheme); // Aplica na carga

    if (themeToggleButtons.length > 0) {
        themeToggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                applyTheme(newTheme);
            });
        });
    } else {
        console.warn("[Theme] Nenhum botão '.theme-switch' encontrado.");
    }
    // --- Fim da Lógica de Tema ---

    // --- 2. Lógica de Animação de Scroll (Comum a várias páginas) ---
    const animatedSections = document.querySelectorAll('.animated-section');
    if (animatedSections.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = { threshold: 0.15 }; // Animar um pouco mais cedo
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target); // Anima apenas uma vez
                    console.log(`[Animation] Seção ${entry.target.id || ''} tornou-se visível.`);
                }
            });
        }, observerOptions);
        animatedSections.forEach(section => observer.observe(section));
    } else if (animatedSections.length > 0) {
        console.warn("[Animation] IntersectionObserver não suportado ou sem seções animadas.");
        // Fallback: Mostrar tudo imediatamente se não suportado
        animatedSections.forEach(section => section.classList.add('is-visible'));
    }
    // --- Fim Animação Scroll ---


    // --- 3. Lógica Específica da Página INDEX ---
    if (bodyElement.classList.contains('page-index')) {
        console.log("[Index] Executando código da página Index...");

        // --- Modal de Detalhes (Index) ---
        const modalIndex = document.getElementById('anime-modal');
        const modalIndexCloseBtns = modalIndex?.querySelectorAll('.modal__close, #modal-close-btn-footer');
        const animesSectionIndex = document.getElementById('animes'); // Seção principal dos carrosséis
        const heroCarouselSection = document.getElementById('hero-carousel'); // Seção do Hero
        const modalIndexTitle = modalIndex?.querySelector('#modal-title');
        const modalIndexInfo = modalIndex?.querySelector('#modal-info');
        const modalIndexDescription = modalIndex?.querySelector('#modal-description');
        const modalIndexTrailer = modalIndex?.querySelector('#modal-trailer');
        const trailerPlaceholderIndex = modalIndex?.querySelector('p.trailer-placeholder');
        const modalIndexRatingText = modalIndex?.querySelector('#modal-rating-text');
        const modalIndexYearText = modalIndex?.querySelector('#modal-year-text');
        const modalIndexLanguageText = modalIndex?.querySelector('#modal-language-text');
        const modalIndexDownloadLink = modalIndex?.querySelector('#modal-download-link');
        const modalWatchFirstEpBtnIndex = modalIndex?.querySelector('#modal-watch-first-ep');

        const openModalIndex = (card) => {
            if (!card || !modalIndex) return;
            console.log("[Modal Index] Abrindo modal para:", card.dataset.title);
            modalIndexTitle.textContent = card.dataset.title || 'N/A';
            modalIndexDescription.textContent = card.dataset.description || 'Sem descrição disponível.';
            modalIndexRatingText.textContent = card.dataset.rating || 'N/A';
            modalIndexYearText.textContent = card.dataset.year || 'N/A';
            modalIndexLanguageText.textContent = card.dataset.language || 'N/A';
            modalIndexInfo.innerHTML = `<span><i class="fas fa-star"></i> ${card.dataset.rating || 'N/A'}</span> <span><i class="fas fa-calendar-alt"></i> ${card.dataset.year || 'N/A'}</span> <span><i class="fas fa-globe"></i> ${card.dataset.language || 'N/A'}</span>`;

            const trailerUrl = card.dataset.trailer;
            if (trailerPlaceholderIndex) trailerPlaceholderIndex.style.display = 'none'; // Reset placeholder
            modalIndexTrailer.src = ""; // Reset trailer src
            modalIndexTrailer.style.display = 'none';

            if (trailerUrl && trailerUrl !== 'undefined' && trailerUrl !== 'null' && !trailerUrl.includes('placeholder') && trailerUrl.includes('embed')) {
                 modalIndexTrailer.src = trailerUrl;
                 modalIndexTrailer.style.display = 'block';
            } else {
                if (trailerPlaceholderIndex) trailerPlaceholderIndex.style.display = 'block';
                console.warn("[Modal Index] Trailer indisponível ou URL inválida para:", card.dataset.title);
            }

            modalIndexDownloadLink.href = card.dataset.downloadPage || '#';
            // Lógica para botão "Assistir Episódio 1" (se aplicável no index)
            if (modalWatchFirstEpBtnIndex) {
                 // Aqui você precisaria de uma forma de linkar ao primeiro episódio
                 // Se a página de download já for a página de assistir, pode usar isso
                 if(card.dataset.downloadPage && card.dataset.downloadPage.includes('assistir.html')) {
                    modalWatchFirstEpBtnIndex.href = card.dataset.downloadPage + "?ep=1"; // Exemplo
                    modalWatchFirstEpBtnIndex.style.display = 'inline-flex';
                 } else {
                    modalWatchFirstEpBtnIndex.style.display = 'none';
                 }
            }

            modalIndex.classList.add('active');
            bodyElement.style.overflow = 'hidden';
        };

        const closeModalIndex = () => {
            if (!modalIndex) return;
            modalIndex.classList.remove('active');
            if (modalIndexTrailer) modalIndexTrailer.src = ""; // Importante para parar vídeo
            if (trailerPlaceholderIndex) trailerPlaceholderIndex.style.display = 'none';
            bodyElement.style.overflow = '';
            console.log("[Modal Index] Modal fechado.");
        };

        // Adiciona listener aos botões de detalhes nos carrosséis principais e no hero
        const detailButtonClickHandler = (e) => {
            const detailsButton = e.target.closest('.btn--details');
            if (detailsButton) {
                e.preventDefault();
                const card = detailsButton.closest('.anime-card, .hero-anime-card'); // Funciona para ambos os tipos
                if (card) {
                    openModalIndex(card);
                } else {
                     console.warn("[Modal Index] Card não encontrado para botão de detalhes.");
                }
            }
        };

        if (animesSectionIndex) animesSectionIndex.addEventListener('click', detailButtonClickHandler);
        if (heroCarouselSection) heroCarouselSection.addEventListener('click', detailButtonClickHandler);

        // Fechar Modal
        modalIndexCloseBtns?.forEach(button => button.addEventListener('click', closeModalIndex));
        modalIndex?.addEventListener('click', (event) => { if (event.target === modalIndex) closeModalIndex(); });
        document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modalIndex?.classList.contains('active')) closeModalIndex(); });
        // --- Fim Modal (Index) ---


        // --- Filtering & Sorting (Index) ---
        const filterForm = document.getElementById('anime-filter-form');
        const genreFilter = document.getElementById('genre-filter');
        const yearFilter = document.getElementById('year-filter');
        const sortFilter = document.getElementById('sort-filter');
        const searchFilter = document.getElementById('search-filter');
        const azLinks = document.querySelectorAll('.az-link');
        const selectedLetterInput = document.getElementById('selected-letter');
        const allAnimeCardsIndex = animesSectionIndex ? Array.from(animesSectionIndex.querySelectorAll('.anime-card')) : []; // Pega todos os cards do catálogo
        const resetButton = document.getElementById('reset-filters');
        const noResultsMessage = document.getElementById('no-results-message');
        const allCarouselSections = animesSectionIndex ? Array.from(animesSectionIndex.querySelectorAll('.anime-carousel-section')) : [];
        const resultsContainer = document.createElement('div'); // Container dinâmico para resultados
        resultsContainer.className = 'anime-grid results-grid'; // Usa um grid para resultados filtrados

        let isFiltered = false; // Flag para saber se estamos mostrando resultados filtrados
        const originalParent = animesSectionIndex; // Onde os carrosséis estão originalmente

        const applyFiltersAndSort = () => {
            if (allAnimeCardsIndex.length === 0) { console.warn("[Index Filter] Nenhum card de anime para filtrar."); return; }
            if (!originalParent) { console.warn("[Index Filter] Container pai original não encontrado."); return; }
            if (!searchFilter || !yearFilter || !selectedLetterInput || !genreFilter || !sortFilter) { console.warn("[Index Filter] Elementos de filtro faltando."); return; }

            console.log("[Index Filter] Aplicando filtros...");
            const searchTerm = searchFilter.value.toLowerCase().trim();
            const selectedYear = yearFilter.value;
            const selectedLetter = selectedLetterInput.value;
            const selectedGenre = genreFilter.value;
            const sortBy = sortFilter.value;

            // Filtragem
            const visibleCards = allAnimeCardsIndex.filter(card => {
                const title = card.dataset.title?.toLowerCase() || '';
                const year = card.dataset.year?.split('/')[0].trim() || ''; // Pega só o primeiro ano se houver ex: 2023/2024
                const genres = card.dataset.genres?.toLowerCase().split(',').map(g => g.trim()) || [];
                const firstLetter = title.charAt(0);

                const matchesSearch = !searchTerm || title.includes(searchTerm);
                const matchesGenre = !selectedGenre || genres.includes(selectedGenre.toLowerCase());
                const matchesLetter = (selectedLetter === 'all') || (title && firstLetter === selectedLetter.toLowerCase());

                let matchesYear = true;
                if (selectedYear) {
                    if (selectedYear === 'older') { matchesYear = parseInt(year) < 2000; }
                    else if (selectedYear === '2000s') { matchesYear = parseInt(year) >= 2000 && parseInt(year) <= 2009; }
                    else if (selectedYear === '2010s') { matchesYear = parseInt(year) >= 2010 && parseInt(year) <= 2019; }
                    else { matchesYear = year === selectedYear; }
                }

                return matchesSearch && matchesYear && matchesLetter && matchesGenre;
            });

            console.log(`[Index Filter] ${visibleCards.length} cards após filtragem.`);

            // Ordenação
            visibleCards.sort((a, b) => {
                 let valA, valB;
                 switch (sortBy) {
                     case 'rating': valA = parseFloat(a.dataset.rating) || -1; valB = parseFloat(b.dataset.rating) || -1; return valB - valA; // Maior primeiro
                     case 'newest': valA = parseInt(a.dataset.year?.split('/')[0].trim()) || 0; valB = parseInt(b.dataset.year?.split('/')[0].trim()) || 0; return valB - valA;
                     case 'oldest': valA = parseInt(a.dataset.year?.split('/')[0].trim()) || 9999; valB = parseInt(b.dataset.year?.split('/')[0].trim()) || 9999; return valA - valB;
                     case 'alphabetical': valA = a.dataset.title?.toLowerCase() || ''; valB = b.dataset.title?.toLowerCase() || ''; return valA.localeCompare(valB);
                     case 'popularity': default: // Usa a ordem original como fallback de popularidade
                         return allAnimeCardsIndex.indexOf(a) - allAnimeCardsIndex.indexOf(b);
                 }
            });

             // Atualiza o DOM
             if (!isFiltered) { // Se era a visualização normal, esconde os carrosséis
                 allCarouselSections.forEach(section => section.style.display = 'none');
                 originalParent.appendChild(resultsContainer); // Adiciona o grid de resultados
                 isFiltered = true;
             }

             resultsContainer.innerHTML = ''; // Limpa resultados anteriores
             const fragment = document.createDocumentFragment();
             visibleCards.forEach(card => {
                 card.style.display = ''; // Garante que está visível
                 fragment.appendChild(card.cloneNode(true)); // Clona para não remover do array original
             });
             resultsContainer.appendChild(fragment);

             // Mostra/Esconde mensagem de "sem resultados"
             if (noResultsMessage) { noResultsMessage.style.display = visibleCards.length === 0 ? 'block' : 'none'; }

             console.log("[Index Filter] DOM atualizado com resultados filtrados e ordenados.");
        };

        const restoreOriginalView = () => {
             if (!isFiltered || !originalParent) return; // Só restaura se estava filtrado
             console.log("[Index Filter] Restaurando visualização original...");
             if (resultsContainer.parentNode === originalParent) {
                 originalParent.removeChild(resultsContainer);
             }
             allCarouselSections.forEach(section => section.style.display = ''); // Mostra os carrosséis de volta
             if (noResultsMessage) noResultsMessage.style.display = 'none';
             isFiltered = false;
             console.log("[Index Filter] Visualização original restaurada.");
        };

        // Event Listeners dos Filtros
        if(filterForm && allAnimeCardsIndex.length > 0) {
            // Aplica filtros instantaneamente em vez de esperar submit
            searchFilter?.addEventListener('input', applyFiltersAndSort);
            genreFilter?.addEventListener('change', applyFiltersAndSort);
            yearFilter?.addEventListener('change', applyFiltersAndSort);
            sortFilter?.addEventListener('change', applyFiltersAndSort);
            azLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (link.classList.contains('active')) return;
                    const selectedLetter = link.dataset.letter;
                    azLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    if (selectedLetterInput) selectedLetterInput.value = selectedLetter;
                    applyFiltersAndSort(); // Aplica imediatamente
                });
            });

            // Botão Reset
            if(resetButton) {
                resetButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    filterForm.reset();
                    if(azLinks.length > 0) {
                        azLinks.forEach(l => l.classList.remove('active'));
                        document.querySelector('.az-link[data-letter="all"]')?.classList.add('active');
                    }
                    if (selectedLetterInput) selectedLetterInput.value = 'all';
                    restoreOriginalView(); // Restaura a visualização original
                });
            }

            // Previne submit tradicional do form
            filterForm.addEventListener('submit', (e) => e.preventDefault());

        } else {
            console.warn("[Index Filter] Formulário de filtros ou cards de anime não encontrados.");
        }
         // --- Fim Filtering & Sorting (Index) ---
    }
    // --- FIM DA LÓGICA DA PÁGINA INDEX ---


    // --- 4. Lógica Específica da Página ASSISTIR ---
    else if (bodyElement.classList.contains('page-assistir')) {
        console.log("[Assistir] Executando código da página Assistir...");

        // Seletores específicos da página Assistir
        const videoPlayerIframe = document.getElementById('anime-video-player-iframe');
        const videoPlayerLocal = document.getElementById('anime-video-player-local');
        const playerPlaceholder = document.getElementById('player-placeholder');
        const videoLoader = document.getElementById('video-loader');
        const playerContainer = document.querySelector('.video-player-container'); // Container geral do player
        const playerTitle = document.getElementById('player-title');
        const playerAnimeTitle = document.getElementById('player-anime-title');
        const playerEpisodeNumber = document.getElementById('player-episode-number');
        const playerExtraInfo = document.getElementById('player-extra-info');
        const playerGenres = document.getElementById('player-genres');
        const playerRating = document.getElementById('player-rating');
        const downloadEpLink = document.getElementById('download-ep-link');
        const prevEpBtn = document.getElementById('prev-ep-btn');
        const nextEpBtn = document.getElementById('next-ep-btn');
        const reportBtn = document.getElementById('report-btn');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const serverButtonsContainer = document.querySelector('.server-options .options-buttons');
        const qualityButtonsContainer = document.querySelector('.quality-options .options-buttons');
        const toggleLightsBtn = document.getElementById('toggle-lights-btn');
        const lightsOffOverlay = document.getElementById('lights-off-overlay');
        const suggestionCarousel = document.getElementById('suggestion-carousel');
        const suggestionCarouselPrevBtn = document.getElementById('suggestion-carousel-prev');
        const suggestionCarouselNextBtn = document.getElementById('suggestion-carousel-next');
        const episodeCarousel = document.getElementById('episode-carousel');
        const epCarouselPrevBtn = document.getElementById('ep-carousel-prev');
        const epCarouselNextBtn = document.getElementById('ep-carousel-next');
        const continueCarousel = document.getElementById('continue-carousel');
        const continueCarouselPrevBtn = document.getElementById('continue-carousel-prev');
        const continueCarouselNextBtn = document.getElementById('continue-carousel-next');
        const modalAssistir = document.getElementById('anime-modal');
        const modalAssistirCloseBtns = modalAssistir?.querySelectorAll('.modal__close, #modal-close-btn-footer');
        const modalAssistirTitle = modalAssistir?.querySelector('#modal-title');
        const modalAssistirInfo = modalAssistir?.querySelector('#modal-info');
        const modalAssistirDescription = modalAssistir?.querySelector('#modal-description');
        const modalAssistirTrailer = modalAssistir?.querySelector('#modal-trailer');
        const trailerPlaceholderAssistir = modalAssistir?.querySelector('.trailer-placeholder');
        const modalAssistirRatingText = modalAssistir?.querySelector('#modal-rating-text');
        const modalAssistirYearText = modalAssistir?.querySelector('#modal-year-text');
        const modalAssistirLanguageText = modalAssistir?.querySelector('#modal-language-text');
        const modalAssistirDownloadLink = modalAssistir?.querySelector('#modal-download-link');
        const modalWatchFirstEpBtn = modalAssistir?.querySelector('#modal-watch-first-ep');

        let currentEpisodeItem = null; // Elemento DOM do episódio atual
        let episodeItems = episodeCarousel ? Array.from(episodeCarousel.querySelectorAll('.episode-item')) : []; // Todos os itens de episódio disponíveis
        let firstEpisodeDataForModal = null; // Para o botão "Assistir Ep 1" do modal

        // --- Funções Auxiliares (Assistir) ---
        const showLoader = () => { if(videoLoader) videoLoader.style.display = 'flex'; };
        const hideLoader = () => { if(videoLoader) videoLoader.style.display = 'none'; };
        const showPlaceholder = (message = "Selecione um episódio.", subtext = "", isError = false, previewImage = null) => {
            if (!playerPlaceholder) return;
            const contentDiv = playerPlaceholder.querySelector('.placeholder-content');
            const icon = contentDiv?.querySelector('.placeholder-icon-main');
            const textP = contentDiv?.querySelector('p');
            const subtextSpan = contentDiv?.querySelector('.placeholder-subtext');
            const previewImgEl = contentDiv?.querySelector('.preview-image');
            const previewTextEl = contentDiv?.querySelector('.preview-text');

            // Limpa preview se não for um preview
            if (!previewImage && previewImgEl) previewImgEl.src = '';
            if (!previewImage && previewTextEl) previewTextEl.textContent = '';
            if (contentDiv && !previewImage) contentDiv.classList.remove('preview');

            if (icon) icon.className = `fas ${isError ? 'fa-exclamation-triangle' : 'fa-play-circle'} placeholder-icon-main`;
            if (textP) textP.textContent = message;
            if (subtextSpan) subtextSpan.textContent = subtext;

            if (previewImage) {
                // Configura modo preview
                if (contentDiv) contentDiv.classList.add('preview');
                if (previewImgEl) previewImgEl.src = previewImage;
                if (previewTextEl) previewTextEl.textContent = `Pronto para: ${message}`; // Ex: Pronto para: Episódio 1
                if (icon) icon.style.display = 'none'; // Esconde ícone padrão no preview
                if (textP) textP.style.display = 'none';
                if (subtextSpan) subtextSpan.style.display = 'none';
            } else {
                // Configura modo normal/erro
                if (icon) icon.style.display = 'block';
                if (textP) textP.style.display = 'block';
                if (subtextSpan) subtextSpan.style.display = 'block';
            }

            playerPlaceholder.classList.add('active');
        };
        const hidePlaceholder = () => playerPlaceholder?.classList.remove('active');

        const generateFilename = (title, epNum, path) => {
            const fallbackName = `episodio_${epNum}`;
            let baseTitle = title ? title.replace(/[^a-z0-9_\-\s]/gi, '_').replace(/\s+/g, '_') : 'anime';
            let episodeNumber = epNum ? `Ep_${String(epNum).padStart(2, '0')}` : fallbackName;
            let extension = '.mp4'; // Default
            if (path && typeof path === 'string' && path.includes('.')) {
                const parts = path.split('.');
                const ext = parts[parts.length - 1].toLowerCase();
                if (['mp4', 'mkv', 'webm', 'avi', 'mov', 'flv', 'wmv'].includes(ext)) {
                    extension = `.${ext}`;
                }
            }
            return `${baseTitle}_${episodeNumber}${extension}`;
        };

        const getGoogleDriveEmbedUrl = (originalUrl) => {
            const driveRegex = /drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/;
            const match = originalUrl.match(driveRegex);
            if (match && match[1]) {
                return `https://drive.google.com/file/d/${match[1]}/preview`;
            }
            // Tenta regex para links de pasta/compartilhamento (menos confiável para embed direto)
            const folderRegex = /drive\.google\.com\/drive\/(?:folders|u\/\d+\/folders)\/([a-zA-Z0-9_-]+)/;
            const folderMatch = originalUrl.match(folderRegex);
            if (folderMatch && folderMatch[1]) {
                console.warn("[Assistir] Link de pasta detectado. O embed pode não funcionar diretamente:", originalUrl);
                // Poderia retornar um link para a pasta, mas não para o player
                return null; // Ou a URL original para tentar como iframe genérico
            }
            return null; // URL inválida ou não reconhecida
        };

        // Função Principal de Carregamento do Episódio
        const loadEpisode = (episodeItem) => {
            if (!episodeItem || !videoPlayerIframe || !videoPlayerLocal || !playerContainer || !playerTitle) {
                console.error("[Assistir] Elementos essenciais do player faltando."); return;
            }

            const videoSrc = episodeItem.dataset.videoSrc;
            const videoType = episodeItem.dataset.videoType?.toLowerCase() || 'iframe'; // iframe como fallback
            const episodeFullTitle = episodeItem.dataset.episodeTitle || "Episódio Desconhecido";
            const animeTitle = episodeItem.dataset.animeTitle || "Anime";
            const episodeNum = episodeItem.dataset.episodeNumber || "X";
            const downloadPage = episodeItem.dataset.downloadPage || '#'; // Link para página ou download direto
            const thumbnailSrc = episodeItem.querySelector('.episode-thumbnail')?.src;

            console.log(`%c[Assistir] Tentando carregar: ${animeTitle} Ep ${episodeNum} | Tipo: ${videoType} | Src: ${videoSrc}`, 'color: #ff3b3b');

            showLoader();
            hidePlaceholder();
            videoPlayerIframe.style.display = 'none'; videoPlayerIframe.src = '';
            videoPlayerLocal.style.display = 'none'; videoPlayerLocal.src = ''; videoPlayerLocal.pause();
            if(downloadEpLink) downloadEpLink.style.display = 'none'; // Esconde link de download inicialmente

            if (currentEpisodeItem) { currentEpisodeItem.classList.remove('active'); } // Desmarca anterior

            // Atualiza Título e Metadados Imediatamente
            playerTitle.textContent = episodeFullTitle;
            if(playerAnimeTitle) playerAnimeTitle.textContent = animeTitle;
            if(playerEpisodeNumber) playerEpisodeNumber.textContent = `Episódio ${episodeNum}`;
            // Placeholder para info extra (pode vir do card de sugestão ou API)
            if(playerExtraInfo && playerGenres && playerRating) {
                 // Tenta pegar do card se disponível (não ideal, melhor seria ter dados consistentes)
                 const suggestionCard = document.querySelector(`.suggestion-card[data-title="${animeTitle}"]`);
                 playerGenres.textContent = suggestionCard?.dataset.genres || 'N/A';
                 playerRating.textContent = suggestionCard?.dataset.rating || 'N/A';
                 playerExtraInfo.style.display = 'flex';
            } else if (playerExtraInfo) {
                 playerExtraInfo.style.display = 'none';
            }


            setTimeout(() => { // Pequeno delay para UI atualizar
                let finalVideoUrl = '';
                let targetPlayer = null; // 'iframe' ou 'local'
                let downloadUrl = null; // URL para o botão de download
                let loadSuccess = false;
                let errorMessage = 'Fonte de vídeo inválida ou não configurada.';

                try {
                    if (!videoSrc || videoSrc.trim() === '' || videoSrc.toUpperCase().includes('URL_VIDEO') || videoSrc.toUpperCase().includes('SUBSTITUA') || videoSrc === '#') {
                        throw new Error(errorMessage);
                    }

                    switch (videoType) {
                        case 'googledrive':
                            finalVideoUrl = getGoogleDriveEmbedUrl(videoSrc);
                            if (finalVideoUrl) {
                                const fileIdMatch = videoSrc.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
                                if (fileIdMatch && fileIdMatch[1]) {
                                    downloadUrl = `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
                                }
                                targetPlayer = 'iframe';
                                loadSuccess = true;
                            } else {
                                errorMessage = "Link Google Drive inválido.";
                                throw new Error(errorMessage);
                            }
                            break;
                        case 'local':
                            finalVideoUrl = videoSrc;
                            downloadUrl = videoSrc; // Download direto para local
                            targetPlayer = 'local';
                            loadSuccess = true;
                            break;
                        case 'youtube': // Exemplo básico, precisa de ID
                             const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
                             const ytMatch = videoSrc.match(youtubeRegex);
                             if(ytMatch && ytMatch[1]) {
                                finalVideoUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
                                targetPlayer = 'iframe';
                                downloadUrl = downloadPage !== '#' ? downloadPage : null; // Link para página se houver
                                loadSuccess = true;
                             } else {
                                 errorMessage = "Link YouTube inválido.";
                                 throw new Error(errorMessage);
                             }
                             break;
                        case 'iframe': // Genérico
                        default:
                            if (videoSrc.startsWith('http://') || videoSrc.startsWith('https://')) {
                                finalVideoUrl = videoSrc;
                                targetPlayer = 'iframe';
                                downloadUrl = downloadPage !== '#' ? downloadPage : null; // Link para página se houver
                                loadSuccess = true;
                            } else {
                                errorMessage = `URL iframe inválida: ${videoSrc}`;
                                throw new Error(errorMessage);
                            }
                            break;
                    }

                    if (loadSuccess && targetPlayer) {
                        console.log(`[Assistir] Player Target: ${targetPlayer}, URL: ${finalVideoUrl}`);
                        if (targetPlayer === 'iframe') {
                            videoPlayerIframe.src = finalVideoUrl;
                            videoPlayerIframe.style.display = 'block';
                            videoPlayerLocal.style.display = 'none';
                        } else if (targetPlayer === 'local') {
                            videoPlayerLocal.src = finalVideoUrl;
                            videoPlayerLocal.style.display = 'block';
                            videoPlayerIframe.style.display = 'none';
                        }

                        // Configura botão de download
                        if (downloadEpLink) {
                            if (downloadUrl) {
                                downloadEpLink.href = downloadUrl;
                                if (videoType === 'local') {
                                    // Tenta gerar nome de arquivo significativo
                                    downloadEpLink.download = generateFilename(animeTitle, episodeNum, videoSrc);
                                    downloadEpLink.target = '_self'; // Para forçar download
                                } else {
                                    downloadEpLink.removeAttribute('download');
                                    downloadEpLink.target = '_blank'; // Abre em nova aba
                                }
                                downloadEpLink.style.display = 'inline-flex';
                            } else {
                                downloadEpLink.style.display = 'none';
                            }
                        }

                        hideLoader();
                        hidePlaceholder();
                        episodeItem.classList.add('active');
                        currentEpisodeItem = episodeItem; // Atualiza o item atual

                        // Atualiza botões Prev/Next
                        const currentIndex = episodeItems.indexOf(currentEpisodeItem);
                        if(prevEpBtn) prevEpBtn.disabled = currentIndex <= 0;
                        if(nextEpBtn) nextEpBtn.disabled = currentIndex < 0 || currentIndex >= episodeItems.length - 1;

                        // Scroll para o episódio no carrossel
                        if (episodeCarousel && currentEpisodeItem) {
                             currentEpisodeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        }

                        // Atualiza histórico
                        updateContinueWatching(currentEpisodeItem);
                        console.log(`%c[Assistir] Episódio ${animeTitle} Ep ${episodeNum} carregado com sucesso.`, 'color: limegreen');

                    } else {
                        // Se chegou aqui sem sucesso, lança erro genérico
                        throw new Error(errorMessage || "Falha ao processar fonte de vídeo.");
                    }

                } catch (error) {
                    console.error("[Assistir] Erro detalhado ao carregar episódio:", error);
                    hideLoader();
                    showPlaceholder(error.message || 'Erro desconhecido ao carregar.', `Anime: ${animeTitle} - Ep: ${episodeNum}`, true);
                    if(downloadEpLink) downloadEpLink.style.display = 'none'; // Esconde download em erro
                    // Reseta botões Prev/Next se erro
                    if(prevEpBtn) prevEpBtn.disabled = true;
                    if(nextEpBtn) nextEpBtn.disabled = true;
                    // Remove classe ativa se falhou
                    episodeItem.classList.remove('active');
                    if (currentEpisodeItem === episodeItem) { currentEpisodeItem = null; }
                }
            }, 300); // Delay de 300ms
        };


        // Função para Abrir Modal de Detalhes (página Assistir)
        const openAnimeModalAssistir = (card) => {
            if (!card || !modalAssistir) return;
            console.log("[Modal Assistir] Abrindo modal para:", card.dataset.title);

            const animeTitleForSearch = card.dataset.title || 'N/A';
            modalAssistirTitle.textContent = animeTitleForSearch;
            modalAssistirDescription.textContent = card.dataset.description || 'Sem descrição disponível.';
            modalAssistirRatingText.textContent = card.dataset.rating || 'N/A';
            modalAssistirYearText.textContent = card.dataset.year || 'N/A';
            modalAssistirLanguageText.textContent = card.dataset.language || 'N/A';
            modalAssistirInfo.innerHTML = `<span><i class="fas fa-star"></i> ${card.dataset.rating || 'N/A'}</span> <span><i class="fas fa-calendar-alt"></i> ${card.dataset.year || 'N/A'}</span> <span><i class="fas fa-globe"></i> ${card.dataset.language || 'N/A'}</span>`;

            const trailerUrl = card.dataset.trailer;
            if (trailerPlaceholderAssistir) trailerPlaceholderAssistir.style.display = 'none'; // Reset placeholder
            modalAssistirTrailer.src = ""; modalAssistirTrailer.style.display = 'none';

            if (trailerUrl && trailerUrl !== 'undefined' && trailerUrl !== 'null' && trailerUrl.includes('embed')) {
                 modalAssistirTrailer.src = trailerUrl;
                 modalAssistirTrailer.style.display = 'block';
            } else {
                 if (trailerPlaceholderAssistir) trailerPlaceholderAssistir.style.display = 'block';
            }

            modalAssistirDownloadLink.href = card.dataset.downloadPage || '#';

            // Lógica para botão "Assistir Episódio 1"
            const firstEpItem = episodeItems.find(item =>
                item.dataset.animeTitle?.toLowerCase() === animeTitleForSearch.toLowerCase() &&
                (item.dataset.episodeNumber === '1' || item.dataset.episodeNumber === '01')
            );

            if (firstEpItem && modalWatchFirstEpBtn) {
                firstEpisodeDataForModal = { element: firstEpItem }; // Guarda o elemento DOM
                modalWatchFirstEpBtn.style.display = 'inline-flex';
                modalWatchFirstEpBtn.disabled = false;
            } else if (modalWatchFirstEpBtn) {
                firstEpisodeDataForModal = null;
                modalWatchFirstEpBtn.style.display = 'none';
                modalWatchFirstEpBtn.disabled = true;
            }

            modalAssistir.classList.add('active');
            bodyElement.style.overflow = 'hidden';
        };

        const closeAnimeModalAssistir = () => {
            if (!modalAssistir) return;
            modalAssistir.classList.remove('active');
            if (modalAssistirTrailer) modalAssistirTrailer.src = "";
            if (trailerPlaceholderAssistir) trailerPlaceholderAssistir.style.display = 'none';
            bodyElement.style.overflow = '';
            firstEpisodeDataForModal = null; // Limpa a referência
            console.log("[Modal Assistir] Modal fechado.");
        };

        // Função para Navegação de Carrossel Genérica
        const setupCarouselNav = (container, prevBtn, nextBtn) => {
            if (!container || !prevBtn || !nextBtn) {
                // console.warn("[Carousel Nav] Elementos do carrossel não encontrados:", {container, prevBtn, nextBtn});
                return;
            }
            const scrollAmount = container.clientWidth * 0.8; // Scroll 80% da largura visível

            const updateNavButtons = () => {
                 const maxScrollLeft = container.scrollWidth - container.clientWidth;
                 prevBtn.disabled = container.scrollLeft < 10; // Pequena tolerância
                 nextBtn.disabled = container.scrollLeft >= maxScrollLeft - 10; // Pequena tolerância
            };

            prevBtn.addEventListener('click', () => { container.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
            nextBtn.addEventListener('click', () => { container.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
            container.addEventListener('scroll', updateNavButtons, { passive: true }); // Atualiza botões no scroll
            // Chama uma vez para estado inicial (após renderização inicial do conteúdo)
             setTimeout(updateNavButtons, 100); // Pequeno delay para garantir layout
        };

        // --- Lógica do Histórico (Continuar Assistindo) ---
        const historyKey = 'denyAnimeHubContinueWatching';
        const historyLimit = 15; // Máximo de itens no histórico

        const updateContinueWatching = (episodeItem) => {
            if (!episodeItem) return;
            let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
            // Cria objeto de dados do episódio
            const episodeData = {
                id: `${episodeItem.dataset.animeTitle}-${episodeItem.dataset.episodeNumber}`, // ID único
                animeTitle: episodeItem.dataset.animeTitle,
                episodeTitle: episodeItem.dataset.episodeTitle,
                episodeNumber: episodeItem.dataset.episodeNumber,
                videoType: episodeItem.dataset.videoType,
                videoSrc: episodeItem.dataset.videoSrc,
                thumbnail: episodeItem.querySelector('.episode-thumbnail')?.src || 'images/placeholder_thumb.png',
                downloadPage: episodeItem.dataset.downloadPage,
                timestamp: Date.now() // Registra quando foi assistido
                // Adicionar progresso aqui se implementar
            };
            // Remove duplicatas e adiciona no início
            history = history.filter(item => item.id !== episodeData.id);
            history.unshift(episodeData);
            // Limita o histórico
            if (history.length > historyLimit) { history = history.slice(0, historyLimit); }
            // Salva no localStorage
            localStorage.setItem(historyKey, JSON.stringify(history));
            renderContinueWatching(); // Atualiza a UI
            console.log("[History] Histórico atualizado para:", episodeData.animeTitle, episodeData.episodeNumber);
        };

        const renderContinueWatching = () => {
            if (!continueCarousel) return;
            const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
            let placeholder = continueCarousel.querySelector('.placeholder-card');

            // Limpa itens antigos (exceto o placeholder)
            Array.from(continueCarousel.children).forEach(child => {
                if (!child.classList.contains('placeholder-card')) {
                    child.remove();
                }
            });

            if (history.length === 0) {
                if (!placeholder) { // Cria placeholder se não existir
                    placeholder = document.createElement('div');
                    placeholder.className = 'episode-item continue-watching-item placeholder-card'; // Reusa classes
                    placeholder.innerHTML = `
                        <img src="images/placeholder_akatsuki.png" alt="Histórico Vazio Placeholder">
                        <span>Seu histórico está limpo... Comece uma nova missão!</span>`;
                    continueCarousel.appendChild(placeholder);
                }
                placeholder.style.display = 'flex'; // Mostra placeholder
            } else {
                if (placeholder) placeholder.style.display = 'none'; // Esconde placeholder

                history.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'episode-item continue-watching-item'; // Reusa classes
                    // Adiciona data attributes para poder recarregar o episódio
                    div.dataset.animeTitle = item.animeTitle;
                    div.dataset.episodeTitle = item.episodeTitle;
                    div.dataset.episodeNumber = item.episodeNumber;
                    div.dataset.videoType = item.videoType;
                    div.dataset.videoSrc = item.videoSrc;
                    div.dataset.thumbnail = item.thumbnail;
                    div.dataset.downloadPage = item.downloadPage;
                    // Estrutura interna do card
                    div.innerHTML = `
                        <a href="#" class="episode-link">
                            <img src="${item.thumbnail || 'images/placeholder_thumb.png'}" alt="${item.animeTitle} Ep ${item.episodeNumber}" class="episode-thumbnail" loading="lazy">
                            <div class="episode-info">
                                <span class="episode-anime-name">${item.animeTitle}</span>
                                <span class="episode-number">Ep. ${item.episodeNumber}</span>
                            </div>
                            <!-- Opcional: Barra de progresso -->
                            <!-- <div class="progress-bar"><div style="width: ${item.progress || 0}%;"></div></div> -->
                            <i class="fas fa-play episode-play-icon"></i>
                        </a>`;
                    continueCarousel.appendChild(div); // Adiciona item
                });
                 // Atualiza botões de navegação do carrossel de histórico APÓS renderizar
                const continuePrevBtn = document.getElementById('continue-carousel-prev');
                const continueNextBtn = document.getElementById('continue-carousel-next');
                setTimeout(() => { // Delay para garantir que o layout foi calculado
                     if (continueCarousel && continuePrevBtn && continueNextBtn) {
                        const maxScrollLeft = continueCarousel.scrollWidth - continueCarousel.clientWidth;
                        continuePrevBtn.disabled = continueCarousel.scrollLeft < 10;
                        continueNextBtn.disabled = continueCarousel.scrollLeft >= maxScrollLeft - 10 || history.length === 0;
                     }
                }, 150);
            }
        };
        // --- Fim Lógica do Histórico ---


        // --- Event Listeners (Assistir) ---
        // Click nos itens de episódio (Carrossel principal e Histórico)
        [episodeCarousel, continueCarousel].forEach(carousel => {
            if(carousel) {
                carousel.addEventListener('click', (e) => {
                    const link = e.target.closest('a.episode-link'); if (link) e.preventDefault(); // Previne comportamento do link
                    const clickedItem = e.target.closest('.episode-item:not(.placeholder-card)'); // Ignora placeholder
                    if (clickedItem) {
                        if (clickedItem !== currentEpisodeItem) {
                             loadEpisode(clickedItem);
                             // Scroll suave para o player
                             const playerSection = document.querySelector('.video-player-section');
                             if(playerSection) playerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                             // Já está selecionado, talvez tocar o vídeo se estiver pausado?
                             const player = videoPlayerLocal.style.display !== 'none' ? videoPlayerLocal : null;
                             if(player && player.paused) player.play();
                             // Ou apenas scroll para o player
                             const playerSection = document.querySelector('.video-player-section');
                             if(playerSection) playerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                });
            }
        });

        // Botões Prev/Next Episódio
        prevEpBtn?.addEventListener('click', () => {
            const currentIndex = episodeItems.indexOf(currentEpisodeItem);
            if (currentIndex > 0) { loadEpisode(episodeItems[currentIndex - 1]); }
        });
        nextEpBtn?.addEventListener('click', () => {
            const currentIndex = episodeItems.indexOf(currentEpisodeItem);
            if (currentIndex > -1 && currentIndex < episodeItems.length - 1) { loadEpisode(episodeItems[currentIndex + 1]); }
        });

        // Botão Reportar
        reportBtn?.addEventListener('click', () => {
            const epTitle = currentEpisodeItem?.dataset.episodeTitle || 'o episódio atual';
            const animeTitleReport = currentEpisodeItem?.dataset.animeTitle || 'este anime';
            if (currentEpisodeItem) {
                alert(`Reportar problema com "${epTitle}" de "${animeTitleReport}".\n(Funcionalidade de envio pendente)`);
                // Aqui você poderia abrir um modal de reporte mais detalhado
            } else {
                alert("Por favor, selecione um episódio para reportar.");
            }
        });

        // Botão Tela Cheia
        fullscreenBtn?.addEventListener('click', () => {
            if (!playerContainer) return;
            if (!document.fullscreenElement) {
                playerContainer.requestFullscreen?.().catch(err => console.error("Erro ao entrar em tela cheia:", err));
                 fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>'; fullscreenBtn.title = "Sair Tela Cheia";
            } else {
                document.exitFullscreen?.();
                 fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>'; fullscreenBtn.title = "Tela Cheia";
            }
        });
        document.addEventListener('fullscreenchange', () => { // Listener para quando sai da tela cheia (ex: Esc)
            if (!document.fullscreenElement && fullscreenBtn) {
                fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>'; fullscreenBtn.title = "Tela Cheia";
            }
        });

        // Botões Servidor/Qualidade (Apenas UI por enquanto)
        serverButtonsContainer?.addEventListener('click', (e) => {
            if(e.target.classList.contains('btn--option')) {
                serverButtonsContainer.querySelectorAll('.btn--option').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                console.log("[Assistir] Servidor selecionado:", e.target.dataset.server);
                // Aqui você adicionaria a lógica para REALMENTE trocar a fonte do vídeo
                // Ex: loadEpisode(currentEpisodeItem); // Recarregar com nova fonte
            }
        });
        qualityButtonsContainer?.addEventListener('click', (e) => {
            if(e.target.classList.contains('btn--option')) {
                qualityButtonsContainer.querySelectorAll('.btn--option').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                console.log("[Assistir] Qualidade selecionada:", e.target.dataset.quality);
                // Lógica para trocar qualidade (se suportado pelo player/fonte)
            }
        });

        // Botão Luzes
        toggleLightsBtn?.addEventListener('click', () => {
            bodyElement.classList.toggle('lights-off');
            lightsOffOverlay?.classList.toggle('active');
            const isLightsOff = bodyElement.classList.contains('lights-off');
            toggleLightsBtn.title = isLightsOff ? "Acender Luzes" : "Apagar Luzes";
            const icon = toggleLightsBtn.querySelector('i');
            if(icon) icon.className = isLightsOff ? 'fas fa-lightbulb' : 'far fa-lightbulb'; // Mudar ícone preenchido/vazio
        });
        lightsOffOverlay?.addEventListener('click', () => { // Clicar no overlay também desliga
            bodyElement.classList.remove('lights-off');
            lightsOffOverlay.classList.remove('active');
            if(toggleLightsBtn) {
                toggleLightsBtn.title = "Apagar Luzes";
                const icon = toggleLightsBtn.querySelector('i');
                if(icon) icon.className = 'far fa-lightbulb';
            }
        });

        // Click nos detalhes das sugestões para abrir Modal
        if (suggestionCarousel) {
            suggestionCarousel.addEventListener('click', (e) => {
                const detailsButton = e.target.closest('.btn--details');
                if (detailsButton) {
                    e.preventDefault();
                    const card = detailsButton.closest('.anime-card');
                    if(card) openAnimeModalAssistir(card);
                }
            });
        }

        // Fechar Modal Assistir
        modalAssistirCloseBtns?.forEach(b => b.addEventListener('click', closeAnimeModalAssistir));
        modalAssistir?.addEventListener('click', (e) => { if (e.target === modalAssistir) closeAnimeModalAssistir(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalAssistir?.classList.contains('active')) closeAnimeModalAssistir(); });
        // Click no botão "Assistir Ep 1" dentro do Modal
        modalWatchFirstEpBtn?.addEventListener('click', () => {
            if (firstEpisodeDataForModal?.element) {
                closeAnimeModalAssistir();
                setTimeout(() => { // Pequeno delay para modal fechar antes de carregar/scrollar
                    loadEpisode(firstEpisodeDataForModal.element);
                    const playerSection = document.querySelector('.video-player-section');
                    if(playerSection) playerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 150);
            } else {
                console.error("[Modal Assistir] Dados do primeiro episódio não encontrados ao clicar no botão.");
            }
        });


        // --- Inicialização (Assistir) ---
        setupCarouselNav(suggestionCarousel, suggestionCarouselPrevBtn, suggestionCarouselNextBtn);
        setupCarouselNav(episodeCarousel, epCarouselPrevBtn, epCarouselNextBtn);
        setupCarouselNav(continueCarousel, continueCarouselPrevBtn, continueCarouselNextBtn);
        if (episodeCarousel) { console.log(`[Assistir] ${episodeItems.length} episódios encontrados no carrossel principal.`); }
        renderContinueWatching(); // Renderiza o histórico ao carregar a página
        showPlaceholder("Selecione um episódio", "Escolha no carrossel abaixo para iniciar."); // Mensagem inicial

    }
    // --- FIM DA LÓGICA DA PÁGINA ASSISTIR ---


    // --- 5. Lógica Específica da Página NOTÍCIAS ---
    else if (bodyElement.classList.contains('page-noticias')) {
        console.log("[Noticias] Executando código da página Notícias...");

        // --- News Modal (Noticias) ---
        const newsModal = document.getElementById('news-modal');
        const newsModalCloseBtns = newsModal?.querySelectorAll('.modal__close, #news-modal-close-btn-footer');
        const newsContainer = document.querySelector('.main-content-area'); // Container principal onde estão as notícias
        const newsModalTitle = newsModal?.querySelector('#news-modal-title');
        const newsModalDate = newsModal?.querySelector('#news-modal-date');
        const newsModalAuthor = newsModal?.querySelector('#news-modal-author');
        const newsModalTags = newsModal?.querySelector('#news-modal-tags');
        const newsModalImage = newsModal?.querySelector('#news-modal-image');
        const newsModalContent = newsModal?.querySelector('#news-modal-full-content');
        const newsModalRelatedLinks = newsModal?.querySelector('#news-modal-related-links');

        const openNewsModal = (newsTriggerElement) => {
           // Tenta encontrar o card pai mais próximo (funciona para botão dentro ou no link do card)
           const newsCard = newsTriggerElement.closest('article.news-card, article.featured-news-card');
            if (!newsCard || !newsModal) { console.error("[Noticias Modal] Card ou Modal não encontrado."); return; }

            console.log("[Noticias Modal] Abrindo modal para:", newsCard.dataset.title);

            newsModalTitle.textContent = newsCard.dataset.title || 'Título Indisponível';
            newsModalDate.textContent = newsCard.dataset.date || 'Data Indisponível';
            newsModalAuthor.textContent = newsCard.dataset.author || 'DenyAnimeHub'; // Default author
            newsModalTags.textContent = newsCard.dataset.tags || 'Notícia';
            newsModalImage.src = newsCard.dataset.image || newsCard.querySelector('img')?.src || 'images/placeholder_news.png'; // Placeholder se necessário
            newsModalImage.alt = newsCard.dataset.title || 'Imagem da Notícia';

            // Insere o conteúdo HTML diretamente (assume que está seguro ou sanitizado)
            newsModalContent.innerHTML = newsCard.dataset.fullContent || '<p>Conteúdo completo não disponível.</p>';

            // Limpa links relacionados antigos e adiciona novos se houver
            if(newsModalRelatedLinks) newsModalRelatedLinks.innerHTML = '';
            // Exemplo: Adicionar link da fonte se existir um data-attribute
            // if(newsCard.dataset.sourceUrl && newsModalRelatedLinks) {
            //     const li = document.createElement('li');
            //     const a = document.createElement('a');
            //     a.href = newsCard.dataset.sourceUrl;
            //     a.textContent = newsCard.dataset.sourceName || "Fonte Original";
            //     a.target = "_blank";
            //     a.rel = "noopener noreferrer";
            //     li.appendChild(a);
            //     newsModalRelatedLinks.appendChild(li);
            // }

            newsModal.classList.add('active');
            bodyElement.style.overflow = 'hidden';
        };

        const closeNewsModal = () => {
            if (!newsModal) return;
            newsModal.classList.remove('active');
            bodyElement.style.overflow = '';
            console.log("[Noticias Modal] Modal fechado.");
        };

        // Adiciona listener no container principal para pegar cliques nos botões/links
        if(newsContainer) {
            newsContainer.addEventListener('click', (e) => {
                const readMoreTrigger = e.target.closest('.btn--read-more'); // Pega botão ou link
                if (readMoreTrigger) {
                    e.preventDefault();
                    openNewsModal(readMoreTrigger);
                }
            });
        } else {
             console.warn("[Noticias Modal] Container principal de notícias não encontrado.");
        }

        // Fechar Modal
        newsModalCloseBtns?.forEach(button => button.addEventListener('click', closeNewsModal));
        newsModal?.addEventListener('click', (event) => { if (event.target === newsModal) closeNewsModal(); });
        document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && newsModal?.classList.contains('active')) closeNewsModal(); });
        // --- Fim News Modal ---


        // --- Gallery Lightbox (Noticias) ---
        const galleryGrid = document.querySelector('.gallery-grid');
        let lightboxInstance = null; // Variável para guardar a instância do lightbox

        const createLightbox = () => {
            if (document.getElementById('gallery-lightbox')) return document.getElementById('gallery-lightbox'); // Já existe

            const lightbox = document.createElement('div'); lightbox.id = 'gallery-lightbox';
            const content = document.createElement('div'); content.className = 'lightbox-content';
            const img = document.createElement('img'); img.id = 'lightbox-img';
            const caption = document.createElement('div'); caption.id = 'lightbox-caption';
            const closeBtn = document.createElement('button'); closeBtn.id = 'lightbox-close'; closeBtn.innerHTML = '&times;'; closeBtn.ariaLabel = 'Fechar';
            const prevBtn = document.createElement('button'); prevBtn.id = 'lightbox-prev'; prevBtn.innerHTML = '&#10094;'; prevBtn.ariaLabel = 'Anterior';
            const nextBtn = document.createElement('button'); nextBtn.id = 'lightbox-next'; nextBtn.innerHTML = '&#10095;'; nextBtn.ariaLabel = 'Próximo';

            content.appendChild(img);
            content.appendChild(caption);
            lightbox.appendChild(content);
            lightbox.appendChild(closeBtn);
            lightbox.appendChild(prevBtn);
            lightbox.appendChild(nextBtn);
            document.body.appendChild(lightbox);

            // Adiciona CSS básico (pode ser movido para o style.css)
            lightbox.style.cssText = `display: none; position: fixed; inset: 0; background: rgba(10, 10, 12, 0.95); z-index: 3000; opacity: 0; transition: opacity 0.4s ease; align-items: center; justify-content: center;`;
            content.style.cssText = `position: relative; max-width: 90%; max-height: 90%; text-align: center;`;
            img.style.cssText = `max-width: 100%; max-height: 85vh; object-fit: contain; display: block; margin: auto; border-radius: 5px; transition: transform 0.3s ease; transform: scale(0.9);`;
            caption.style.cssText = `color: #ccc; margin-top: 10px; font-size: 0.9rem; transition: opacity 0.3s ease 0.1s; opacity: 0; padding: 5px 15px; background: rgba(0,0,0,0.5); border-radius: 3px; display: inline-block; position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%);`;
            closeBtn.style.cssText = `position: absolute; top: 15px; right: 25px; font-size: 35px; color: #fff; background: none; border: none; cursor: pointer; transition: color 0.2s ease; line-height: 1;`;
            prevBtn.style.cssText = `position: absolute; top: 50%; left: 15px; transform: translateY(-50%); font-size: 30px; color: rgba(255,255,255,0.7); background: rgba(0,0,0,0.4); border: none; cursor: pointer; padding: 10px 15px; border-radius: 5px; transition: all 0.2s ease;`;
            nextBtn.style.cssText = `position: absolute; top: 50%; right: 15px; transform: translateY(-50%); font-size: 30px; color: rgba(255,255,255,0.7); background: rgba(0,0,0,0.4); border: none; cursor: pointer; padding: 10px 15px; border-radius: 5px; transition: all 0.2s ease;`;
            closeBtn.onmouseover = prevBtn.onmouseover = nextBtn.onmouseover = function() { this.style.color = '#fff'; this.style.background = 'rgba(0,0,0,0.6)'; }
            closeBtn.onmouseout = prevBtn.onmouseout = nextBtn.onmouseout = function() { this.style.color = 'rgba(255,255,255,0.7)'; this.style.background = 'rgba(0,0,0,0.4)';}

            return lightbox;
        };

        let currentGalleryIndex = 0;
        let galleryImages = []; // Array de {src, title}

        const openLightbox = (index) => {
            if (!lightboxInstance || index < 0 || index >= galleryImages.length) return;
            currentGalleryIndex = index;
            const { src, title } = galleryImages[index];
            const lightboxImg = lightboxInstance.querySelector('#lightbox-img');
            const lightboxCaption = lightboxInstance.querySelector('#lightbox-caption');

            lightboxImg.src = src;
            lightboxCaption.textContent = title;
            lightboxInstance.style.display = 'flex';
            setTimeout(() => {
                lightboxInstance.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
                lightboxCaption.style.opacity = '1';
            }, 10); // Pequeno delay para transição
            bodyElement.style.overflow = 'hidden';
            updateLightboxNav();
        };

        const closeLightbox = () => {
            if (!lightboxInstance) return;
            const lightboxImg = lightboxInstance.querySelector('#lightbox-img');
            const lightboxCaption = lightboxInstance.querySelector('#lightbox-caption');
            lightboxInstance.style.opacity = '0';
            lightboxImg.style.transform = 'scale(0.9)';
            lightboxCaption.style.opacity = '0';
            setTimeout(() => {
                lightboxInstance.style.display = 'none';
                lightboxImg.src = ''; // Limpa src
                 bodyElement.style.overflow = '';
            }, 400); // Tempo da transição
        };

        const changeLightboxImage = (direction) => {
            const newIndex = currentGalleryIndex + direction;
            if (newIndex >= 0 && newIndex < galleryImages.length) {
                openLightbox(newIndex);
            }
        };

        const updateLightboxNav = () => {
            if (!lightboxInstance) return;
            lightboxInstance.querySelector('#lightbox-prev').disabled = currentGalleryIndex === 0;
            lightboxInstance.querySelector('#lightbox-next').disabled = currentGalleryIndex === galleryImages.length - 1;
        };

        if (galleryGrid) {
            lightboxInstance = createLightbox(); // Cria o lightbox se não existir
            galleryImages = Array.from(galleryGrid.querySelectorAll('.gallery-item')).map(item => ({
                src: item.href || item.querySelector('img')?.src, // Pega do href do link ou src da img
                title: item.dataset.title || item.querySelector('img')?.alt || ''
            }));

            if (galleryImages.length > 0 && lightboxInstance) {
                galleryGrid.addEventListener('click', (e) => {
                    const galleryLink = e.target.closest('.gallery-item');
                    if (galleryLink) {
                        e.preventDefault();
                        const clickedIndex = galleryImages.findIndex(img => img.src === (galleryLink.href || galleryLink.querySelector('img')?.src));
                        if (clickedIndex !== -1) {
                            openLightbox(clickedIndex);
                        }
                    }
                });

                // Event listeners dos controles do lightbox
                lightboxInstance.querySelector('#lightbox-close').addEventListener('click', closeLightbox);
                lightboxInstance.querySelector('#lightbox-prev').addEventListener('click', () => changeLightboxImage(-1));
                lightboxInstance.querySelector('#lightbox-next').addEventListener('click', () => changeLightboxImage(1));
                lightboxInstance.addEventListener('click', (e) => { // Fecha clicando fora da imagem
                    if (e.target === lightboxInstance || e.target === lightboxInstance.querySelector('.lightbox-content')) {
                        closeLightbox();
                    }
                });
                document.addEventListener('keydown', (e) => { // Navegação pelo teclado
                    if (lightboxInstance.style.display === 'flex') {
                        if (e.key === 'Escape') closeLightbox();
                        else if (e.key === 'ArrowLeft') changeLightboxImage(-1);
                        else if (e.key === 'ArrowRight') changeLightboxImage(1);
                    }
                });
            } else {
                console.warn("[Noticias Gallery] Galeria encontrada, mas sem imagens ou lightbox não criado.");
            }
        } else {
            console.warn("[Noticias Gallery] Grid de galeria '.gallery-grid' não encontrado.");
        }
        // --- Fim Gallery Lightbox ---

    }
     // --- FIM DA LÓGICA DA PÁGINA NOTÍCIAS ---

    // --- 6. Lógica Específica da Página LOGIN/AUTH ---
    else if (bodyElement.classList.contains('login-page')) {
        console.log("[Auth] Executando código da página Login/Auth...");

        const authContainer = document.querySelector('.auth-container');
        const formSwitchLinks = document.querySelectorAll('.form-switch-link');

        const switchForm = (targetId) => {
            if (!authContainer) return;
            console.log(`[Auth] Trocando para form: ${targetId}`);
            const forms = authContainer.querySelectorAll('.auth-form');
            let foundTarget = false;

            forms.forEach(form => {
                if (form.id === targetId) {
                    form.classList.add('active-form');
                    foundTarget = true;
                } else {
                    form.classList.remove('active-form');
                }
            });
            // Fallback para login se o target não for encontrado
            if (!foundTarget) {
                const loginForm = document.getElementById('login-form');
                if (loginForm) {
                     loginForm.classList.add('active-form');
                     console.warn(`[Auth] Target form "${targetId}" não encontrado, voltando para login.`);
                }
            }
        };

        if(formSwitchLinks.length > 0) {
            formSwitchLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.dataset.target; // Usa data-target
                    if (targetId) {
                        switchForm(targetId);
                    } else {
                         console.warn("[Auth] Link de troca sem data-target:", link);
                    }
                });
            });
        } else {
             console.warn("[Auth] Nenhum link '.form-switch-link' encontrado.");
        }

        // Garante que um formulário esteja ativo ao carregar (login por padrão)
        if (authContainer && !authContainer.querySelector('.auth-form.active-form')) {
            const loginForm = document.getElementById('login-form');
            if (loginForm) {
                 loginForm.classList.add('active-form');
                 console.log("[Auth] Formulário de login ativado por padrão.");
            }
        }
    }
    // --- FIM DA LÓGICA DA PÁGINA LOGIN/AUTH ---

    console.log("%cDenyAnimeHub Script Finalizado com Sucesso.", "color: limegreen");


}); // Fim do DOMContentLoaded

