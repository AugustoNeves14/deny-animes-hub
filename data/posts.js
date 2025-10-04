const posts = [
    // === POST EM DESTAQUE ===
    {
        titulo: "É Oficial! Remake Completo de Naruto Clássico Anunciado para 2026",
        imagemDestaque: "/images/noticia_naruto_remake.jpg",
        dataCriacao: new Date("2024-07-15T12:00:00Z"),
        tags: ["Naruto", "Remake", "Anúncio", "Studio Pierrot"],
        categoria: "Anime",
        conteudo: `<p>Após meses de especulação intensa alimentada por insiders e fãs esperançosos, a Shueisha e o Studio Pierrot finalmente confirmaram o que muitos desejavam: Naruto, a série clássica que definiu uma geração, receberá um remake completo.</p><p>Previsto para estrear em <strong>2026</strong>, o projeto promete reanimar toda a saga original com tecnologia de animação moderna, mantendo-se fiel ao mangá de Masashi Kishimoto e incluindo cenas de batalha estendidas e momentos inéditos de desenvolvimento de personagens. A notícia agitou a comunidade otaku globalmente, gerando debates sobre o elenco de voz e as expectativas para a nova adaptação.</p><h4>O que esperar?</h4><ul><li>Animação totalmente refeita com tecnologias atuais.</li><li>Possível reajuste de ritmo e inclusão de conteúdo do mangá não adaptado.</li><li>Exploração mais profunda de arcos específicos.</li></ul><p>Fique ligado no DenyAnimeHub para mais atualizações sobre este projeto monumental!</p>`,
        emDestaque: true
    },

    // === OUTROS POSTS ===
    {
        titulo: "Bleach TYBW Cour 3 Ganha Data e Trailer Intenso Focado nos Sternritters",
        imagemDestaque: "/images/noticia_bleach_final.jpg",
        dataCriacao: new Date("2024-07-14T10:00:00Z"),
        tags: ["Bleach", "TYBW", "Anime", "Trailer"],
        categoria: "Anime",
        conteudo: "<p>A espera está quase no fim! O site oficial de <strong>Bleach: Thousand-Year Blood War</strong> revelou que o Cour 3, intitulado 'The Conflict', estreará em <strong>Outubro de 2024</strong>.</p><p>Junto com a data, um novo trailer eletrizante foi divulgado, mostrando trechos das batalhas cruciais entre os Shinigamis restantes e a elite Quincy Sternritter, incluindo confrontos muito aguardados como Urahara vs Askin Nakk Le Vaar e o retorno de personagens chave. A animação do Studio Pierrot continua impecável, prometendo um clímax de tirar o fôlego para este arco final.</p>",
        emDestaque: false
    },
    {
        titulo: "Análise: A Primeira Temporada de 'Frieren' é uma Obra-Prima da Melancolia",
        imagemDestaque: "/images/anime2024_frieren.jpg",
        dataCriacao: new Date("2024-07-12T15:00:00Z"),
        tags: ["Frieren", "Análise", "Review", "Drama", "Fantasia"],
        categoria: "Análise",
        conteudo: `<p>Poucos animes conseguem capturar a essência da passagem do tempo e da mortalidade como <strong>Frieren: Beyond Journey's End</strong>. A primeira temporada, finalizada com aclamação da crítica e do público, não é uma história sobre salvar o mundo, mas sobre o que vem depois.</p><p>A jornada de Frieren para entender a humanidade através das memórias de seus companheiros falecidos é contada com uma delicadeza visual e narrativa raramente vistas. Cada episódio é uma reflexão poética sobre a vida, a perda e as conexões que formamos. Uma obra essencial que transcende o gênero de fantasia.</p>`,
        emDestaque: false
    },
    {
        titulo: "Solo Leveling: ARISE Já Está Disponível Globalmente para Mobile",
        imagemDestaque: "/images/solo_leveling_arise.jpg",
        dataCriacao: new Date("2024-07-10T09:00:00Z"),
        tags: ["Solo Leveling", "Game", "Mobile", "RPG", "ARISE"],
        categoria: "Game",
        conteudo: "<p>Boas notícias para os fãs de <strong>Solo Leveling</strong>! O aguardado RPG de ação para mobile, <strong>Solo Leveling: ARISE</strong>, foi lançado oficialmente em diversos países, incluindo o Brasil.</p><p>Com gráficos de tirar o fôlego e jogabilidade dinâmica baseada nas habilidades de Sung Jin-Woo, o jogo permite que os jogadores revivam os momentos mais épicos do webtoon e anime. Além disso, há missões exclusivas, modo PvP e sistema de evolução de caçadores. Baixe agora e comece a sua jornada como o Monarca das Sombras!</p>",
        emDestaque: false
    },
    {
        titulo: "Dandadan: Por que este é o Anime Mais Aguardado de Outubro 2024?",
        imagemDestaque: "/images/anime2025_dandadan.jpg",
        dataCriacao: new Date("2024-07-08T18:00:00Z"),
        tags: ["Dandadan", "Hype", "Preview", "Science SARU"],
        categoria: "Preview",
        conteudo: "<p>Com estreia marcada para <strong>Outubro de 2024</strong>, <strong>Dandadan</strong>, adaptado pelo renomado estúdio Science SARU, está gerando um hype massivo e justificado.</p><p>A mistura única de ocultismo, ficção científica, comédia absurda e romance peculiar conquistou leitores do mangá. Exploramos os motivos por trás da expectativa, desde a direção de arte psicodélica até a química explosiva dos protagonistas Momo e Okarun. Prepare-se para uma das estreias mais insanas e visualmente criativas do ano!</p>",
        emDestaque: false
    },
    {
        titulo: "Chainsaw Man - O Filme: 'Reze Arc' Ganha Primeiro Teaser Impactante",
        imagemDestaque: "/images/chainsaw_reze.jpg",
        dataCriacao: new Date("2024-07-07T11:00:00Z"),
        tags: ["Chainsaw Man", "Filme", "Anime", "Trailer", "MAPPA"],
        categoria: "Filme",
        conteudo: "<p>Fãs de <strong>Chainsaw Man</strong>, preparem-se! O aguardado filme que adapta o arco 'Reze' (Bomb Girl) recebeu seu primeiro teaser oficial divulgado pela MAPPA.</p><p>Embora curto, o vídeo mostra vislumbres de Denji e Reze em cenas explosivas e emocionantes, prometendo manter a alta qualidade de animação e a intensidade característica da série. O filme continuará a história diretamente após a primeira temporada. Data de estreia ainda não revelada, mas a produção parece estar avançando bem.</p>",
        emDestaque: false
    },
    {
        titulo: "O Legado de Kentaro Miura: Como 'Berserk' Continua a Influenciar a Fantasia Sombria",
        imagemDestaque: "/images/berserk_legacy.jpg",
        dataCriacao: new Date("2024-07-05T14:00:00Z"),
        tags: ["Berserk", "Kentaro Miura", "Mangá", "Legado", "Fantasia"],
        categoria: "Especial",
        conteudo: "<p>Mesmo após o falecimento de seu criador, Kentaro Miura, a saga de <strong>Berserk</strong> continua sob a supervisão de Kouji Mori. Este post especial explora o impacto duradouro da obra.</p><p>De 'Dark Souls' a 'Final Fantasy', a influência de Berserk no design de monstros, na narrativa e na estética da fantasia sombria é inegável. Discutimos como a jornada de Guts, sua luta contra o destino e a arte detalhada de Miura criaram um marco cultural que inspira criadores até hoje.</p>",
        emDestaque: false
    },
    {
        titulo: "One Piece Live Action: Ator de Crocodile Escolhido? Rumores Apontam!",
        imagemDestaque: "/images/onepiece_liveaction_s2.jpg",
        dataCriacao: new Date("2024-07-02T16:00:00Z"),
        tags: ["One Piece", "Live Action", "Netflix", "Elenco"],
        categoria: "Live Action",
        conteudo: "<p>A produção da segunda temporada do live-action de <strong>One Piece</strong> pela Netflix segue a todo vapor, e novos rumores sobre o elenco surgem constantemente.</p><p>O mais recente, vindo de fontes não oficiais ligadas à produção, sugere que um ator de renome de Hollywood estaria em negociações finais para interpretar <strong>Sir Crocodile</strong>, um dos vilões mais icônicos do arco de Alabasta. Embora a Netflix não tenha confirmado, a possibilidade agitou os fãs nas redes sociais. A segunda temporada ainda não tem data de estreia.</p>",
        emDestaque: false
    },
    {
        titulo: "Sakamoto Days Anime: Visual Chave e Teaser Trailer Revelados!",
        imagemDestaque: "/images/sakamoto_days.jpg",
        dataCriacao: new Date("2024-06-30T13:00:00Z"),
        tags: ["Sakamoto Days", "Anime", "Trailer", "Visual"],
        categoria: "Anime",
        conteudo: "<p>O primeiro visual chave e um teaser trailer da aguardada adaptação para anime de <strong>Sakamoto Days</strong> foram revelados! Produzido pela TMS Entertainment, o anime estreia em <strong>Janeiro de 2025</strong>.</p><p>O visual mostra Taro Sakamoto em sua forma 'aposentada', ao lado de Shin e Lu Xiaotang. O teaser, embora curto, captura perfeitamente o tom de ação e comédia do mangá, com cenas rápidas mostrando a incrível habilidade de Sakamoto mesmo fora de forma. A animação parece promissora, aumentando ainda mais o hype para a estreia.</p>",
        emDestaque: false
    }
];

module.exports = posts;