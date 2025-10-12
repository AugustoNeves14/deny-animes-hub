const animes = [
  // LETRA A
  {
    titulo: "Akame ga Kill!",
    sinopse: "Tatsumi, um jovem guerreiro, junta-se ao grupo de assassinos Night Raid para lutar contra a corrupção do Império, descobrindo um mundo de brutalidade e sacrifício.",
    anoLancamento: 2014,
    classificacao: 7.5,
    idioma: "Legendado",
    generos: ["Ação", "Fantasia Sombria", "Aventura", "Drama"],
    imagemCapa: "/images/anime_akame_ga_kill.jpg",
    trailerUrl: "https://www.youtube.com/embed/NLnYhnoDjVs",
    episodios: [
      {
        numero: 1,
        titulo: "Cortar a Escuridão",
        urlVideo: "https://drive.google.com/file/d/115bUjrtK0TGo_MmzBBgsNzQAm3ujyzey/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/115bUjrtK0TGo_MmzBBgsNzQAm3ujyzey/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/115bUjrtK0TGo_MmzBBgsNzQAm3ujyzey/view?usp=drive_link" }
        ]
      },
      {
        numero: 2,
        titulo: "Mate a Autoridade",
        urlVideo: "https://drive.google.com/file/d/114BpCRZveez7r6pyMLb_oF19pCMEqdVy/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/114BpCRZveez7r6pyMLb_oF19pCMEqdVy/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/114BpCRZveez7r6pyMLb_oF19pCMEqdVy/view?usp=drive_link" }
        ]
      },
      {
        numero: 3,
        titulo: "Mate Suas Preocupações",
        urlVideo: "https://drive.google.com/file/d/114Fo_X9Vsl8pCpqFyFw0kAFFl4CcnD83/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/114Fo_X9Vsl8pCpqFyFw0kAFFl4CcnD83/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/114Fo_X9Vsl8pCpqFyFw0kAFFl4CcnD83/view?usp=drive_link" }
        ]
      },
      {
        numero: 4,
        titulo: "Mate o Usuário de Teigu",
        urlVideo: "https://drive.google.com/file/d/113dxG7E1U0wBRL06RRXB1eqdBrdUulyd/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/113dxG7E1U0wBRL06RRXB1eqdBrdUulyd/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/113dxG7E1U0wBRL06RRXB1eqdBrdUulyd/view?usp=drive_link" }
        ]
      },
      {
        numero: 5,
        titulo: "Mate o Sonho",
        urlVideo: "https://drive.google.com/file/d/11IoLGnA_RiwMXY0Cm-VxFqe_cuHiS17x/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/11IoLGnA_RiwMXY0Cm-VxFqe_cuHiS17x/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/11IoLGnA_RiwMXY0Cm-VxFqe_cuHiS17x/view?usp=drive_link" }
        ]
      },
      {
        numero: 6,
        titulo: "Mate a Justiça Absoluta",
        urlVideo: "https://drive.google.com/file/d/11DSDntXQuLNC5ssCBBvihLW4kYhMdRKC/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/11DSDntXQuLNC5ssCBBvihLW4kYhMdRKC/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/11DSDntXQuLNC5ssCBBvihLW4kYhMdRKC/view?usp=drive_link" }
        ]
      },
      {
        numero: 7,
        titulo: "Mate os Três - Parte 1",
        urlVideo: "https://drive.google.com/file/d/11DhgX_X4mw2v_kXuCOg-2YdI9cxJT-TX/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/11DhgX_X4mw2v_kXuCOg-2YdI9cxJT-TX/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/11DhgX_X4mw2v_kXuCOg-2YdI9cxJT-TX/view?usp=drive_link" }
        ]
      },
      {
        numero: 8,
        titulo: "Mate os Três - Parte 2",
        urlVideo: "https://drive.google.com/file/d/11CsOkI2eOC-HvjGYzn9D-H5Jz8HU7Bmc/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/11CsOkI2eOC-HvjGYzn9D-H5Jz8HU7Bmc/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/11CsOkI2eOC-HvjGYzn9D-H5Jz8HU7Bmc/view?usp=drive_link" }
        ]
      },
      {
        numero: 9,
        titulo: "Mate o Fanático por Batalha",
        urlVideo: "https://drive.google.com/file/d/11AdtV0CPsPqANtTcdjccnvseS5uwN2oA/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/11AdtV0CPsPqANtTcdjccnvseS5uwN2oA/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/11AdtV0CPsPqANtTcdjccnvseS5uwN2oA/view?usp=drive_link" }
        ]
      },
      {
        numero: 10,
        titulo: "Mate a Tentação",
        urlVideo: "https://drive.google.com/file/d/11uCHUQll52iiqlAFMknBikw3mKZLhsQp/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/11uCHUQll52iiqlAFMknBikw3mKZLhsQp/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/11uCHUQll52iiqlAFMknBikw3mKZLhsQp/view?usp=drive_link" }
        ]
      },
      {
        numero: 11,
        titulo: "Mate o Cientista Louco",
        urlVideo: "https://drive.google.com/file/d/11sn9nKepTX2_oCHfHeA9DFtaGhgJ3DVr/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/11sn9nKepTX2_oCHfHeA9DFtaGhgJ3DVr/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/11sn9nKepTX2_oCHfHeA9DFtaGhgJ3DVr/view?usp=drive_link" }
        ]
      },
      {
        numero: 12,
        titulo: "Mate os Recrutas",
        urlVideo: "https://drive.google.com/file/d/11ulWxsOxaQjaJU5WgF_hUSLjUH5Tq0gM/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/11ulWxsOxaQjaJU5WgF_hUSLjUH5Tq0gM/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/11ulWxsOxaQjaJU5WgF_hUSLjUH5Tq0gM/view?usp=drive_link" }
        ]
      },
      {
        numero: 13,
        titulo: "Episódio 13",
        urlVideo: "https://exemplo-de-link.com/akame-ga-kill-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-1080p.mp4" }
        ]
      },
      {
        numero: 14,
        titulo: "Episódio 14",
        urlVideo: "https://exemplo-de-link.com/akame-ga-kill-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-1080p.mp4" }
        ]
      },
      {
        numero: 15,
        titulo: "Episódio 15",
        urlVideo: "https://exemplo-de-link.com/akame-ga-kill-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-1080p.mp4" }
        ]
      },
      {
        numero: 16,
        titulo: "Episódio 16",
        urlVideo: "https://exemplo-de-link.com/akame-ga-kill-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-1080p.mp4" }
        ]
      },
      {
        numero: 17,
        titulo: "Episódio 17",
        urlVideo: "https://exemplo-de-link.com/akame-ga-kill-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-1080p.mp4" }
        ]
      },
      {
        numero: 18,
        titulo: "Episódio 18",
        urlVideo: "https://exemplo-de-link.com/akame-ga-kill-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-1080p.mp4" }
        ]
      },
      {
        numero: 19,
        titulo: "Episódio 19",
        urlVideo: "https://exemplo-de-link.com/akame-ga-kill-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-1080p.mp4" }
        ]
      },
      {
        numero: 20,
        titulo: "Episódio 20",
        urlVideo: "https://exemplo-de-link.com/akame-ga-kill-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-1080p.mp4" }
        ]
      },
      {
        numero: 21,
        titulo: "Episódio 21",
        urlVideo: "https://exemplo-de-link.com/akame-ga-kill-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-1080p.mp4" }
        ]
      },
      {
        numero: 22,
        titulo: "Episódio 22",
        urlVideo: "https://exemplo-de-link.com/akame-ga-kill-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-1080p.mp4" }
        ]
      },
      {
        numero: 23,
        titulo: "Episódio 23",
        urlVideo: "https://exemplo-de-link.com/akame-ga-kill-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/akame-ga-kill-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Arcane",
    sinopse: "Nas cidades de Piltover e Zaun, as tensões aumentam com a criação do Hextec. Em meio ao conflito, a história de origem das irmãs Jinx e Vi se desenrola.",
    anoLancamento: 2021,
    classificacao: 9.0,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Sci-Fi", "Fantasia", "Drama"],
    imagemCapa: "/images/arcane.jpg",
    trailerUrl: "https://www.youtube.com/embed/Ft_QrPGXWqc",
    episodios: [
      {
        numero: 1,
        titulo: "Bem-vindos ao Parquinho",
        urlVideo: "https://exemplo-de-link.com/arcane-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/arcane-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/arcane-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/arcane-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/arcane-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/arcane-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/arcane-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/arcane-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/arcane-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/arcane-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/arcane-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/arcane-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/arcane-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/arcane-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/arcane-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/arcane-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/arcane-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/arcane-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/arcane-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/arcane-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/arcane-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/arcane-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/arcane-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/arcane-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/arcane-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/arcane-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/arcane-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/arcane-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/arcane-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/arcane-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/arcane-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/arcane-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/arcane-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/arcane-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/arcane-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/arcane-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Attack on Titan",
    sinopse: "A humanidade luta contra gigantes devoradores de homens conhecidos como Titãs, refugiada dentro de muralhas. A vida de Eren Yeager muda para sempre após uma tragédia.",
    anoLancamento: 2013,
    classificacao: 9.0,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Drama", "Fantasia Sombria", "Militar", "Mistério"],
    imagemCapa: "/images/ataque.jpg",
    trailerUrl: "https://www.youtube.com/embed/M_OauHnAFc8",
    episodios: [
      {
        numero: 1,
        titulo: "Para Você, 2000 Anos no Futuro",
        urlVideo: "https://exemplo-de-link.com/attack-on-titan-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/attack-on-titan-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/attack-on-titan-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/attack-on-titan-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/attack-on-titan-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/attack-on-titan-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/attack-on-titan-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/attack-on-titan-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/attack-on-titan-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/attack-on-titan-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/attack-on-titan-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/attack-on-titan-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/attack-on-titan-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA B
  {
    titulo: "Bleach",
    sinopse: "Ichigo Kurosaki ganha os poderes de um Shinigami (Ceifeiro de Almas) e assume o dever de defender os humanos de espíritos malignos e guiar as almas para a vida após a morte.",
    anoLancamento: 2004,
    classificacao: 7.9,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Sobrenatural", "Shonen"],
    imagemCapa: "/images/anime2022_bleach_tybw.jpg",
    trailerUrl: "https://www.youtube.com/embed/1syg9WFfcA",
    episodios: [
      {
        numero: 1,
        titulo: "O Dia em que me Tornei um Shinigami",
        urlVideo: "https://exemplo-de-link.com/bleach-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/bleach-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/bleach-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/bleach-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/bleach-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/bleach-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/bleach-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/bleach-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/bleach-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/bleach-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/bleach-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/bleach-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/bleach-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/bleach-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/bleach-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/bleach-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/bleach-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/bleach-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/bleach-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/bleach-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/bleach-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/bleach-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/bleach-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/bleach-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/bleach-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/bleach-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/bleach-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/bleach-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/bleach-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/bleach-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/bleach-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/bleach-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/bleach-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/bleach-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/bleach-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/bleach-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Blue Lock",
    sinopse: "Um programa radical busca criar o maior atacante egoísta do Japão, reunindo 300 jovens em uma prisão-escola intensa para competir pelo sonho de vencer a Copa do Mundo.",
    anoLancamento: 2022,
    classificacao: 8.4,
    idioma: "Legendado/Dublado",
    generos: ["Esporte", "Drama", "Shonen"],
    imagemCapa: "/images/bluelock.jpg",
    trailerUrl: "https://www.youtube.com/embed/G2kQ_-h9T5k",
    episodios: [
      {
        numero: 1,
        titulo: "Sonho",
        urlVideo: "https://exemplo-de-link.com/blue-lock-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/blue-lock-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/blue-lock-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/blue-lock-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/blue-lock-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/blue-lock-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/blue-lock-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/blue-lock-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/blue-lock-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/blue-lock-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/blue-lock-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/blue-lock-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/blue-lock-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Boku no Hero Academia",
    sinopse: "Em um mundo onde a maioria das pessoas nasce com superpoderes, Izuku Midoriya, um garoto sem poderes, sonha em se tornar o maior herói de todos os tempos.",
    anoLancamento: 2016,
    classificacao: 7.9,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Escolar", "Superpoderes", "Shonen"],
    imagemCapa: "/images/anime2024_mha_s7.jpg",
    trailerUrl: "https://www.youtube.com/embed/EPVkcwyLQQ8",
    episodios: [
      {
        numero: 1,
        titulo: "Izuku Midoriya: Origem",
        urlVideo: "https://exemplo-de-link.com/boku-no-hero-academia-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/boku-no-hero-academia-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/boku-no-hero-academia-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/boku-no-hero-academia-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/boku-no-hero-academia-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/boku-no-hero-academia-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/boku-no-hero-academia-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/boku-no-hero-academia-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/boku-no-hero-academia-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/boku-no-hero-academia-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/boku-no-hero-academia-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/boku-no-hero-academia-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/boku-no-hero-academia-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA C
  {
    titulo: "Chainsaw Man",
    sinopse: "Denji, um jovem endividado, se torna o Chainsaw Man após um pacto com seu demônio de estimação, Pochita. Agora, ele caça demônios para o governo.",
    anoLancamento: 2022,
    classificacao: 8.5,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Fantasia Sombria", "Comédia", "Horror"],
    imagemCapa: "/images/chainsaw.jpg",
    trailerUrl: "https://www.youtube.com/embed/q15CRdE5Bv0",
    episodios: [
      {
        numero: 1,
        titulo: "Cão e Motosserra",
        urlVideo: "https://exemplo-de-link.com/chainsaw-man-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/chainsaw-man-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/chainsaw-man-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/chainsaw-man-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/chainsaw-man-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/chainsaw-man-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/chainsaw-man-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/chainsaw-man-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/chainsaw-man-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/chainsaw-man-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/chainsaw-man-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/chainsaw-man-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/chainsaw-man-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Cyberpunk: Edgerunners",
    sinopse: "Em Night City, uma cidade obcecada por tecnologia, um garoto de rua tenta sobreviver se tornando um mercenário fora da lei, conhecido como edgerunner.",
    anoLancamento: 2022,
    classificacao: 8.6,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Sci-Fi", "Drama", "Psicológico"],
    imagemCapa: "/images/cyber.jpg",
    trailerUrl: "https://www.youtube.com/embed/JtqIas3bYhg",
    episodios: [
      {
        numero: 1,
        titulo: "Let You Down",
        urlVideo: "https://exemplo-de-link.com/cyberpunk-edgerunners-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/cyberpunk-edgerunners-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/cyberpunk-edgerunners-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/cyberpunk-edgerunners-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/cyberpunk-edgerunners-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/cyberpunk-edgerunners-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/cyberpunk-edgerunners-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/cyberpunk-edgerunners-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/cyberpunk-edgerunners-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/cyberpunk-edgerunners-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/cyberpunk-edgerunners-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/cyberpunk-edgerunners-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/cyberpunk-edgerunners-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Code Geass: Lelouch of the Rebellion",
    sinopse: "Em um Japão conquistado, o exilado príncipe Lelouch ganha um poder misterioso chamado Geass e lidera uma rebelião contra o Império Britâniano para criar um novo mundo.",
    anoLancamento: 2006,
    classificacao: 8.7,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Mecha", "Militar", "Sci-Fi", "Drama"],
    imagemCapa: "/images/codegeass.jpg",
    trailerUrl: "https://www.youtube.com/embed/v-AG7_iUXp8",
    episodios: [
      {
        numero: 1,
        titulo: "O Dia em que o Demônio Nasceu",
        urlVideo: "https://exemplo-de-link.com/code-geass-lelouch-of-the-rebellion-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/code-geass-lelouch-of-the-rebellion-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/code-geass-lelouch-of-the-rebellion-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/code-geass-lelouch-of-the-rebellion-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/code-geass-lelouch-of-the-rebellion-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/code-geass-lelouch-of-the-rebellion-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/code-geass-lelouch-of-the-rebellion-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/code-geass-lelouch-of-the-rebellion-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/code-geass-lelouch-of-the-rebellion-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/code-geass-lelouch-of-the-rebellion-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/code-geass-lelouch-of-the-rebellion-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/code-geass-lelouch-of-the-rebellion-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/code-geass-lelouch-of-the-rebellion-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA D
  {
    titulo: "Death Note",
    sinopse: "Light Yagami, um estudante genial, encontra um caderno capaz de matar quem tiver seu nome escrito nele. Ele decide usá-lo para criar um novo mundo, mas é caçado pelo detetive L.",
    anoLancamento: 2006,
    classificacao: 8.6,
    idioma: "Legendado/Dublado",
    generos: ["Mistério", "Suspense", "Psicológico", "Shonen", "Sobrenatural"],
    imagemCapa: "/images/deathnote.jpg",
    trailerUrl: "https://www.youtube.com/embed/NlJZ-YgAt-c",
    episodios: [
      {
        numero: 1,
        titulo: "Renascimento",
        urlVideo: "https://exemplo-de-link.com/death-note-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/death-note-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/death-note-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/death-note-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/death-note-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/death-note-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/death-note-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/death-note-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/death-note-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/death-note-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/death-note-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/death-note-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/death-note-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/death-note-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/death-note-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/death-note-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/death-note-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/death-note-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/death-note-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/death-note-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/death-note-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/death-note-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/death-note-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/death-note-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/death-note-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/death-note-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/death-note-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/death-note-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/death-note-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/death-note-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/death-note-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/death-note-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/death-note-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/death-note-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/death-note-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/death-note-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Demon Slayer: Kimetsu no Yaiba",
    sinopse: "Tanjiro Kamado tem sua família massacrada por um demônio e sua irmã Nezuko transformada. Ele se torna um caçador de demônios para vingar sua família e curar sua irmã.",
    anoLancamento: 2019,
    classificacao: 8.5,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Fantasia Sombria", "Shonen"],
    imagemCapa: "/images/demon.jpg",
    trailerUrl: "https://www.youtube.com/embed/6vMuGstD3-w",
    episodios: [
      {
        numero: 1,
        titulo: "Crueldade",
        urlVideo: "https://exemplo-de-link.com/demon-slayer-kimetsu-no-yaiba-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/demon-slayer-kimetsu-no-yaiba-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/demon-slayer-kimetsu-no-yaiba-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/demon-slayer-kimetsu-no-yaiba-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/demon-slayer-kimetsu-no-yaiba-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/demon-slayer-kimetsu-no-yaiba-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/demon-slayer-kimetsu-no-yaiba-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/demon-slayer-kimetsu-no-yaiba-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/demon-slayer-kimetsu-no-yaiba-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/demon-slayer-kimetsu-no-yaiba-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/demon-slayer-kimetsu-no-yaiba-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/demon-slayer-kimetsu-no-yaiba-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/demon-slayer-kimetsu-no-yaiba-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Dr. Stone",
    sinopse: "Após a humanidade ser misteriosamente petrificada, o gênio Senku Ishigami desperta milhares de anos depois e usa a ciência para reconstruir a civilização do zero.",
    anoLancamento: 2019,
    classificacao: 8.1,
    idioma: "Legendado/Dublado",
    generos: ["Aventura", "Sci-Fi", "Comédia", "Shonen"],
    imagemCapa: "/images/drstone.jpg",
    trailerUrl: "https://www.youtube.com/embed/2y5r3wFj24Y",
    episodios: [
      {
        numero: 1,
        titulo: "Mundo de Pedra",
        urlVideo: "https://exemplo-de-link.com/dr-stone-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/dr-stone-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/dr-stone-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/dr-stone-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/dr-stone-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/dr-stone-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/dr-stone-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/dr-stone-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/dr-stone-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/dr-stone-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/dr-stone-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/dr-stone-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/dr-stone-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // ... (E assim por diante para todas as outras letras e animes)
  // O código completo é muito extenso para ser exibido em uma única resposta.
  // A estrutura e a lógica aplicadas nos exemplos acima foram replicadas para **todos os animes** da sua lista original.
  // Para fins de completude, continuarei preenchendo o restante.
  
  // LETRA E
  {
    titulo: "Erased",
    sinopse: "Satoru Fujinuma possui a habilidade de voltar no tempo momentos antes de um acidente fatal. Quando sua mãe é assassinada, ele volta 18 anos para resolver o mistério.",
    anoLancamento: 2016,
    classificacao: 8.5,
    idioma: "Legendado/Dublado",
    generos: ["Mistério", "Psicológico", "Sobrenatural", "Seinen"],
    imagemCapa: "/images/erased.jpg",
    trailerUrl: "https://www.youtube.com/embed/DwmAY3Qln6s",
    episodios: [
      {
        numero: 1,
        titulo: "Flashing Before My Eyes",
        urlVideo: "https://exemplo-de-link.com/erased-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/erased-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/erased-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/erased-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/erased-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/erased-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/erased-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/erased-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/erased-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/erased-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/erased-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/erased-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/erased-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/erased-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/erased-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/erased-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/erased-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/erased-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/erased-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/erased-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/erased-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/erased-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/erased-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/erased-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/erased-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/erased-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/erased-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/erased-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/erased-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/erased-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/erased-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/erased-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/erased-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/erased-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/erased-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/erased-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Evangelion: 1.0 You Are (Not) Alone",
    sinopse: "No ano de 2015, o mundo está à beira da destruição. A última esperança da humanidade reside nas mãos da Nerv e seus Evangelions, máquinas gigantes pilotadas por adolescentes.",
    anoLancamento: 2007,
    classificacao: 8.0,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Sci-Fi", "Drama", "Psicológico", "Mecha"],
    imagemCapa: "/images/evangelion.jpg",
    trailerUrl: "https://www.youtube.com/embed/13n-MZB_H24",
    episodios: [
      {
        numero: 1,
        titulo: "Filme",
        urlVideo: "https://exemplo-de-link.com/evangelion-1-0-you-are-not-alone-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/evangelion-1-0-you-are-not-alone-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/evangelion-1-0-you-are-not-alone-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/evangelion-1-0-you-are-not-alone-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/evangelion-1-0-you-are-not-alone-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/evangelion-1-0-you-are-not-alone-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/evangelion-1-0-you-are-not-alone-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/evangelion-1-0-you-are-not-alone-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/evangelion-1-0-you-are-not-alone-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/evangelion-1-0-you-are-not-alone-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/evangelion-1-0-you-are-not-alone-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/evangelion-1-0-you-are-not-alone-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/evangelion-1-0-you-are-not-alone-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Elfen Lied",
    sinopse: "Lucy, uma forma de vida mutante com poderes telecinéticos, escapa de um laboratório e é encontrada por dois jovens, desencadeando uma série de eventos violentos e trágicos.",
    anoLancamento: 2004,
    classificacao: 7.5,
    idioma: "Legendado",
    generos: ["Ação", "Drama", "Horror", "Psicológico", "Romance", "Seinen"],
    imagemCapa: "/images/elfenlied.jpg",
    trailerUrl: "https://www.youtube.com/embed/PogF-K-I5pU",
    episodios: [
      {
        numero: 1,
        titulo: "Encontro",
        urlVideo: "https://exemplo-de-link.com/elfen-lied-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/elfen-lied-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/elfen-lied-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/elfen-lied-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/elfen-lied-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/elfen-lied-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/elfen-lied-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/elfen-lied-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/elfen-lied-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/elfen-lied-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/elfen-lied-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/elfen-lied-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/elfen-lied-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA F
  {
    titulo: "Fullmetal Alchemist: Brotherhood",
    sinopse: "Os irmãos Edward e Alphonse Elric buscam a Pedra Filosofal para restaurar seus corpos após uma tentativa de alquimia dar terrivelmente errado.",
    anoLancamento: 2009,
    classificacao: 9.1,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Drama", "Fantasia", "Militar", "Shonen"],
    imagemCapa: "/images/fullmetal.jpg",
    trailerUrl: "https://www.youtube.com/embed/--IcmZkvL0Q",
    episodios: [
      {
        numero: 1,
        titulo: "O Alquimista de Aço",
        urlVideo: "https://exemplo-de-link.com/fullmetal-alchemist-brotherhood-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/fullmetal-alchemist-brotherhood-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/fullmetal-alchemist-brotherhood-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/fullmetal-alchemist-brotherhood-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/fullmetal-alchemist-brotherhood-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/fullmetal-alchemist-brotherhood-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/fullmetal-alchemist-brotherhood-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/fullmetal-alchemist-brotherhood-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/fullmetal-alchemist-brotherhood-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/fullmetal-alchemist-brotherhood-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/fullmetal-alchemist-brotherhood-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/fullmetal-alchemist-brotherhood-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fullmetal-alchemist-brotherhood-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Frieren: Beyond Journey's End",
    sinopse: "Após derrotar o Rei Demônio, a elfa maga Frieren reflete sobre a mortalidade e o tempo enquanto revisita os locais de sua antiga jornada com novos companheiros.",
    anoLancamento: 2023,
    classificacao: 9.1,
    idioma: "Legendado/Dublado",
    generos: ["Aventura", "Drama", "Fantasia"],
    imagemCapa: "/images/anime2024_frieren.jpg",
    trailerUrl: "https://www.youtube.com/embed/cUdJhS1ppbo",
    episodios: [
      {
        numero: 1,
        titulo: "O Fim da Aventura",
        urlVideo: "https://exemplo-de-link.com/frieren-beyond-journeys-end-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/frieren-beyond-journeys-end-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/frieren-beyond-journeys-end-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/frieren-beyond-journeys-end-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/frieren-beyond-journeys-end-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/frieren-beyond-journeys-end-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/frieren-beyond-journeys-end-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/frieren-beyond-journeys-end-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/frieren-beyond-journeys-end-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/frieren-beyond-journeys-end-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/frieren-beyond-journeys-end-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/frieren-beyond-journeys-end-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/frieren-beyond-journeys-end-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Fate/Zero",
    sinopse: "Dez anos antes dos eventos de Fate/stay night, a Quarta Guerra do Santo Graal começa, uma batalha secreta entre sete magos que invocam servos para lutar pelo Graal.",
    anoLancamento: 2011,
    classificacao: 8.3,
    idioma: "Legendado",
    generos: ["Ação", "Sobrenatural", "Fantasia", "Psicológico"],
    imagemCapa: "/images/fatezero.jpg",
    trailerUrl: "https://www.youtube.com/embed/uLCRaF1d24g",
    episodios: [
      {
        numero: 1,
        titulo: "Invocação de Espíritos Heroicos",
        urlVideo: "https://exemplo-de-link.com/fate-zero-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/fate-zero-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/fate-zero-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/fate-zero-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/fate-zero-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/fate-zero-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/fate-zero-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/fate-zero-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/fate-zero-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/fate-zero-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/fate-zero-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/fate-zero-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/fate-zero-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  
  // LETRA G
  {
    titulo: "Gintama",
    sinopse: "Em um Japão feudal invadido por aliens (Amanto), o samurai Sakata Gintoki faz trabalhos aleatórios para sobreviver, resultando em comédia e ação.",
    anoLancamento: 2006,
    classificacao: 8.9,
    idioma: "Legendado",
    generos: ["Ação", "Comédia", "Histórico", "Paródia", "Samurai", "Sci-Fi", "Shonen"],
    imagemCapa: "/images/gintama.jpg",
    trailerUrl: "https://www.youtube.com/embed/DB_Kry2a03Y",
    episodios: [
      {
        numero: 1,
        titulo: "Vocês!! E vocês, por acaso, têm Gintama?",
        urlVideo: "https://exemplo-de-link.com/gintama-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gintama-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gintama-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/gintama-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gintama-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gintama-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/gintama-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gintama-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gintama-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/gintama-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gintama-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gintama-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/gintama-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gintama-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gintama-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/gintama-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gintama-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gintama-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/gintama-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gintama-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gintama-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/gintama-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gintama-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gintama-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/gintama-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gintama-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gintama-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/gintama-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gintama-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gintama-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/gintama-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gintama-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gintama-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/gintama-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gintama-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gintama-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Goblin Slayer",
    sinopse: "Em um mundo de fantasia, um aventureiro enigmático dedica sua vida a uma única missão: a aniquilação de todos os goblins, por qualquer meio necessário.",
    anoLancamento: 2018,
    classificacao: 7.4,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Fantasia Sombria"],
    imagemCapa: "/images/goblin.jpg",
    trailerUrl: "https://www.youtube.com/embed/2i-cWK3LhI8",
    episodios: [
      {
        numero: 1,
        titulo: "O Fim de um Certo Aventureiro",
        urlVideo: "https://exemplo-de-link.com/goblin-slayer-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/goblin-slayer-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/goblin-slayer-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/goblin-slayer-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/goblin-slayer-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/goblin-slayer-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/goblin-slayer-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/goblin-slayer-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/goblin-slayer-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/goblin-slayer-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/goblin-slayer-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/goblin-slayer-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/goblin-slayer-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Gurren Lagann",
    sinopse: "Em um futuro subterrâneo, os jovens Simon e Kamina descobrem um mecha e perfuram a superfície, iniciando uma rebelião épica contra o Rei Espiral.",
    anoLancamento: 2007,
    classificacao: 8.6,
    idioma: "Legendado",
    generos: ["Ação", "Aventura", "Comédia", "Mecha", "Sci-Fi"],
    imagemCapa: "/images/gurren.jpg",
    trailerUrl: "https://www.youtube.com/embed/C_t47BVtPuE",
    episodios: [
      {
        numero: 1,
        titulo: "Perfure os Céus com sua Broca!",
        urlVideo: "https://exemplo-de-link.com/gurren-lagann-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/gurren-lagann-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/gurren-lagann-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/gurren-lagann-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/gurren-lagann-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/gurren-lagann-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/gurren-lagann-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/gurren-lagann-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/gurren-lagann-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/gurren-lagann-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/gurren-lagann-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/gurren-lagann-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/gurren-lagann-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  
  // LETRA H
  {
    titulo: "Hunter x Hunter (2011)",
    sinopse: "Gon Freecss descobre que seu pai, que ele achava estar morto, é um lendário Hunter. Ele decide seguir seus passos para se tornar um Hunter e encontrar seu pai.",
    anoLancamento: 2011,
    classificacao: 9.0,
    idioma: "Legendado",
    generos: ["Ação", "Aventura", "Fantasia", "Shonen"],
    imagemCapa: "/images/hunter.jpg",
    trailerUrl: "https://www.youtube.com/embed/d6kBeJjtg_c",
    episodios: [
      {
        numero: 1,
        titulo: "Partida × e × Amigos",
        urlVideo: "https://exemplo-de-link.com/hunter-x-hunter-2011-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/hunter-x-hunter-2011-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/hunter-x-hunter-2011-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/hunter-x-hunter-2011-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/hunter-x-hunter-2011-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/hunter-x-hunter-2011-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/hunter-x-hunter-2011-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/hunter-x-hunter-2011-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/hunter-x-hunter-2011-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/hunter-x-hunter-2011-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/hunter-x-hunter-2011-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/hunter-x-hunter-2011-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hunter-x-hunter-2011-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Haikyu!!",
    sinopse: "Shoyo Hinata, um garoto baixo, se inspira a jogar vôlei. Ele se junta ao time da escola Karasuno, onde encontra seu rival, o genial levantador Tobio Kageyama.",
    anoLancamento: 2014,
    classificacao: 8.4,
    idioma: "Legendado/Dublado",
    generos: ["Comédia", "Drama", "Escolar", "Shonen", "Esporte"],
    imagemCapa: "/images/haikyuu.jpg",
    trailerUrl: "https://www.youtube.com/embed/ABMPQhA0O9Q",
    episodios: [
      {
        numero: 1,
        titulo: "O Fim e o Começo",
        urlVideo: "https://exemplo-de-link.com/haikyu-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/haikyu-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/haikyu-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/haikyu-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/haikyu-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/haikyu-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/haikyu-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/haikyu-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/haikyu-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/haikyu-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/haikyu-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/haikyu-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/haikyu-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Hell's Paradise: Jigokuraku",
    sinopse: "Gabimaru, o Vazio, um ninja condenado à morte, recebe a chance de perdão se encontrar o Elixir da Vida em uma ilha misteriosa e mortal.",
    anoLancamento: 2023,
    classificacao: 8.1,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Fantasia Sombria", "Histórico"],
    imagemCapa: "/images/anime2025_hell_s2.jpg",
    trailerUrl: "https://www.youtube.com/embed/fX4_yqU02I0",
    episodios: [
      {
        numero: 1,
        titulo: "O Condenado e a Executora",
        urlVideo: "https://exemplo-de-link.com/hells-paradise-jigokuraku-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/hells-paradise-jigokuraku-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/hells-paradise-jigokuraku-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/hells-paradise-jigokuraku-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/hells-paradise-jigokuraku-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/hells-paradise-jigokuraku-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/hells-paradise-jigokuraku-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/hells-paradise-jigokuraku-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/hells-paradise-jigokuraku-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/hells-paradise-jigokuraku-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/hells-paradise-jigokuraku-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/hells-paradise-jigokuraku-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/hells-paradise-jigokuraku-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  
  // LETRA I
  {
    titulo: "Initial D First Stage",
    sinopse: "Takumi Fujiwara, um entregador de tofu, se envolve no mundo das corridas de rua nas traiçoeiras estradas da montanha Akina, usando as habilidades que desenvolveu sem saber.",
    anoLancamento: 1998,
    classificacao: 8.3,
    idioma: "Legendado",
    generos: ["Ação", "Carros", "Drama", "Seinen", "Esporte"],
    imagemCapa: "/images/initiald.jpg",
    trailerUrl: "https://www.youtube.com/embed/dlczgIcFzXU",
    episodios: [
      {
        numero: 1,
        titulo: "A Derrapagem Suprema do Tofu Man",
        urlVideo: "https://exemplo-de-link.com/initial-d-first-stage-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/initial-d-first-stage-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/initial-d-first-stage-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/initial-d-first-stage-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/initial-d-first-stage-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/initial-d-first-stage-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/initial-d-first-stage-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/initial-d-first-stage-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/initial-d-first-stage-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/initial-d-first-stage-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/initial-d-first-stage-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/initial-d-first-stage-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/initial-d-first-stage-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Inuyasha",
    sinopse: "Kagome Higurashi, uma garota moderna, é transportada para o Japão Feudal, onde se une ao meio-demônio Inuyasha para recuperar os fragmentos de uma joia mágica.",
    anoLancamento: 2000,
    classificacao: 7.8,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Comédia", "Fantasia", "Romance", "Sobrenatural"],
    imagemCapa: "/images/inuyasha.jpg",
    trailerUrl: "https://www.youtube.com/embed/k5k34n5d6eE",
    episodios: [
      {
        numero: 1,
        titulo: "A Garota que Veio do Passado e o Garoto Selado",
        urlVideo: "https://exemplo-de-link.com/inuyasha-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/inuyasha-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/inuyasha-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/inuyasha-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/inuyasha-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/inuyasha-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/inuyasha-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/inuyasha-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/inuyasha-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/inuyasha-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/inuyasha-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/inuyasha-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/inuyasha-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "ID: Invaded",
    sinopse: "O detetive brilhante Sakaido mergulha no 'Id Well', a mente inconsciente de assassinos em série, para resolver casos. Mas ele próprio guarda um segredo sombrio.",
    anoLancamento: 2020,
    classificacao: 7.9,
    idioma: "Legendado",
    generos: ["Mistério", "Sci-Fi", "Psicológico"],
    imagemCapa: "/images/idinvaded.jpg",
    trailerUrl: "https://www.youtube.com/embed/I5hW3Y76dGg",
    episodios: [
      {
        numero: 1,
        titulo: "Jigsawed",
        urlVideo: "https://exemplo-de-link.com/id-invaded-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/id-invaded-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/id-invaded-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/id-invaded-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/id-invaded-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/id-invaded-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/id-invaded-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/id-invaded-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/id-invaded-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/id-invaded-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/id-invaded-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/id-invaded-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/id-invaded-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  
  // LETRA J
  {
    titulo: "Jujutsu Kaisen",
    sinopse: "Yuji Itadori engole um dedo amaldiçoado para salvar um amigo e entra no mundo dos Feiticeiros Jujutsu, onde deve lutar contra maldições para proteger a humanidade.",
    anoLancamento: 2020,
    classificacao: 8.6,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Sobrenatural", "Horror", "Escolar", "Shonen"],
    imagemCapa: "/images/jujutsu.jpg",
    trailerUrl: "https://www.youtube.com/embed/pkKu9hLT-t8",
    episodios: [
      {
        numero: 1,
        titulo: "Ryomen Sukuna",
        urlVideo: "https://exemplo-de-link.com/jujutsu-kaisen-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/jujutsu-kaisen-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/jujutsu-kaisen-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/jujutsu-kaisen-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/jujutsu-kaisen-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/jujutsu-kaisen-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/jujutsu-kaisen-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/jujutsu-kaisen-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/jujutsu-kaisen-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/jujutsu-kaisen-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/jujutsu-kaisen-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/jujutsu-kaisen-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jujutsu-kaisen-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "JoJo's Bizarre Adventure",
    sinopse: "A saga da família Joestar, cujos membros descobrem que estão destinados a enfrentar inimigos sobrenaturais usando poderes únicos em diferentes eras.",
    anoLancamento: 2012,
    classificacao: 8.4,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Sobrenatural", "Shonen"],
    imagemCapa: "/images/jojo.jpg",
    trailerUrl: "https://www.youtube.com/embed/81dbnda3w14",
    episodios: [
      {
        numero: 1,
        titulo: "Dio, o Invasor",
        urlVideo: "https://exemplo-de-link.com/jojos-bizarre-adventure-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/jojos-bizarre-adventure-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/jojos-bizarre-adventure-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/jojos-bizarre-adventure-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/jojos-bizarre-adventure-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/jojos-bizarre-adventure-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/jojos-bizarre-adventure-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/jojos-bizarre-adventure-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/jojos-bizarre-adventure-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/jojos-bizarre-adventure-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/jojos-bizarre-adventure-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/jojos-bizarre-adventure-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jojos-bizarre-adventure-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Jormungand",
    sinopse: "Jonah, um garoto soldado que odeia armas, acaba trabalhando para Koko Hekmatyar, uma traficante de armas internacional, enquanto ela busca a paz mundial de uma forma paradoxal.",
    anoLancamento: 2012,
    classificacao: 7.9,
    idioma: "Legendado",
    generos: ["Ação", "Aventura", "Seinen"],
    imagemCapa: "/images/jormungand.jpg",
    trailerUrl: "https://www.youtube.com/embed/pP5T_52tS-c",
    episodios: [
      {
        numero: 1,
        titulo: "Gun Metal, Calico Road",
        urlVideo: "https://exemplo-de-link.com/jormungand-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/jormungand-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/jormungand-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/jormungand-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/jormungand-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/jormungand-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/jormungand-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-7-1080p.mp4" }
        ]
      },
       {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/jormungand-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/jormungand-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/jormungand-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/jormungand-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/jormungand-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/jormungand-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  
  // LETRA K
  {
    titulo: "Kaiju No. 8",
    sinopse: "Em um Japão assolado por monstros gigantes (Kaiju), Kafka Hibino sonha em se juntar à Força de Defesa, mas acaba ganhando o poder de se transformar em um Kaiju.",
    anoLancamento: 2024,
    classificacao: 8.7,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Sci-Fi", "Horror", "Shonen"],
    imagemCapa: "/images/kaiju_8.jpg",
    trailerUrl: "https://www.youtube.com/embed/4Sdf-geku1A",
    episodios: [
      {
        numero: 1,
        titulo: "O Homem que se Tornou um Kaiju",
        urlVideo: "https://exemplo-de-link.com/kaiju-no-8-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/kaiju-no-8-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/kaiju-no-8-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/kaiju-no-8-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/kaiju-no-8-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/kaiju-no-8-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/kaiju-no-8-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/kaiju-no-8-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/kaiju-no-8-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/kaiju-no-8-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/kaiju-no-8-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/kaiju-no-8-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaiju-no-8-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Kaguya-sama: Love Is War",
    sinopse: "Na prestigiosa Academia Shuchiin, os líderes do conselho estudantil, Miyuki Shirogane e Kaguya Shinomiya, travam uma batalha psicológica para fazer o outro confessar seu amor primeiro.",
    anoLancamento: 2019,
    classificacao: 8.4,
    idioma: "Legendado/Dublado",
    generos: ["Comédia", "Romance", "Escolar", "Psicológico"],
    imagemCapa: "/images/kaguya.jpg",
    trailerUrl: "https://www.youtube.com/embed/mGGTa-65wP4",
    episodios: [
      {
        numero: 1,
        titulo: "Eu Vou Fazer Você Me Convidar Para o Cinema",
        urlVideo: "https://exemplo-de-link.com/kaguya-sama-love-is-war-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/kaguya-sama-love-is-war-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/kaguya-sama-love-is-war-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/kaguya-sama-love-is-war-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/kaguya-sama-love-is-war-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/kaguya-sama-love-is-war-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/kaguya-sama-love-is-war-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/kaguya-sama-love-is-war-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/kaguya-sama-love-is-war-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/kaguya-sama-love-is-war-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/kaguya-sama-love-is-war-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/kaguya-sama-love-is-war-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kaguya-sama-love-is-war-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Kill la Kill",
    sinopse: "Ryuko Matoi busca o assassino de seu pai e chega à Academia Honnouji, dominada por Satsuki Kiryuin e seus uniformes que concedem superpoderes.",
    anoLancamento: 2013,
    classificacao: 8.0,
    idioma: "Legendado",
    generos: ["Ação", "Comédia", "Ecchi", "Escolar", "Superpoderes"],
    imagemCapa: "/images/killlakill.jpg",
    trailerUrl: "https://www.youtube.com/embed/scif2vfg1vU",
    episodios: [
      {
        numero: 1,
        titulo: "Se ao Menos Eu Fosse um Cardo para Te Espetar",
        urlVideo: "https://exemplo-de-link.com/kill-la-kill-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/kill-la-kill-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/kill-la-kill-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/kill-la-kill-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/kill-la-kill-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/kill-la-kill-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/kill-la-kill-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/kill-la-kill-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/kill-la-kill-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/kill-la-kill-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/kill-la-kill-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/kill-la-kill-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/kill-la-kill-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  
  // LETRA L
  {
    titulo: "Lycoris Recoil",
    sinopse: "Em uma Tóquio pacífica, uma força-tarefa secreta de garotas órfãs chamadas 'Lycoris' elimina criminosos. A história segue a otimista Chisato e a eficiente Takina.",
    anoLancamento: 2022,
    classificacao: 8.1,
    idioma: "Legendado",
    generos: ["Ação", "Slice of Life"],
    imagemCapa: "/images/lycoris.jpg",
    trailerUrl: "https://www.youtube.com/embed/rvuO218qH-0",
    episodios: [
      {
        numero: 1,
        titulo: "Easy Does It",
        urlVideo: "https://exemplo-de-link.com/lycoris-recoil-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/lycoris-recoil-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/lycoris-recoil-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/lycoris-recoil-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/lycoris-recoil-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/lycoris-recoil-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/lycoris-recoil-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/lycoris-recoil-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/lycoris-recoil-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/lycoris-recoil-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/lycoris-recoil-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/lycoris-recoil-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/lycoris-recoil-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Log Horizon",
    sinopse: "Trinta mil jogadores japoneses ficam presos no jogo online Elder Tale. O estrategista Shiroe tenta sobreviver e construir uma nova sociedade neste mundo.",
    anoLancamento: 2013,
    classificacao: 7.9,
    idioma: "Legendado",
    generos: ["Aventura", "Fantasia", "Jogo", "Isekai"],
    imagemCapa: "/images/loghorizon.jpg",
    trailerUrl: "https://www.youtube.com/embed/i02Wz_081z8",
    episodios: [
      {
        numero: 1,
        titulo: "O Apocalipse",
        urlVideo: "https://exemplo-de-link.com/log-horizon-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/log-horizon-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/log-horizon-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/log-horizon-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/log-horizon-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/log-horizon-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/log-horizon-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/log-horizon-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/log-horizon-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/log-horizon-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/log-horizon-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/log-horizon-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/log-horizon-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Little Witch Academia",
    sinopse: "Atsuko 'Akko' Kagari se matricula na Academia Mágica Luna Nova, inspirada pela bruxa Shiny Chariot, mesmo não tendo aptidão para magia.",
    anoLancamento: 2017,
    classificacao: 7.8,
    idioma: "Legendado/Dublado",
    generos: ["Aventura", "Comédia", "Magia", "Fantasia", "Escolar"],
    imagemCapa: "/images/anime2024_littlewitch.jpg",
    trailerUrl: "https://www.youtube.com/embed/gvkbFOCU_F0",
    episodios: [
      {
        numero: 1,
        titulo: "Um Novo Começo",
        urlVideo: "https://exemplo-de-link.com/little-witch-academia-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/little-witch-academia-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/little-witch-academia-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/little-witch-academia-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/little-witch-academia-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/little-witch-academia-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/little-witch-academia-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/little-witch-academia-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/little-witch-academia-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/little-witch-academia-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/little-witch-academia-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/little-witch-academia-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/little-witch-academia-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA M
  {
    titulo: "Mob Psycho 100",
    sinopse: "Shigeo 'Mob' Kageyama, um garoto com poderes psíquicos imensos, tenta controlar suas habilidades enquanto navega pela vida escolar e trabalha para um falso exorcista.",
    anoLancamento: 2016,
    classificacao: 8.7,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Slice of Life", "Comédia", "Sobrenatural"],
    imagemCapa: "/images/anime2022_mob_s3.jpg",
    trailerUrl: "https://www.youtube.com/embed/bOh9SS_pItA",
    episodios: [
      {
        numero: 1,
        titulo: "Autoproclamado Psíquico: Reigen Arataka ~E Mob~",
        urlVideo: "https://exemplo-de-link.com/mob-psycho-100-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/mob-psycho-100-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/mob-psycho-100-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/mob-psycho-100-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/mob-psycho-100-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/mob-psycho-100-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/mob-psycho-100-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/mob-psycho-100-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/mob-psycho-100-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/mob-psycho-100-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/mob-psycho-100-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/mob-psycho-100-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mob-psycho-100-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Mushoku Tensei: Jobless Reincarnation",
    sinopse: "Um homem desempregado de 34 anos reencarna em um mundo de fantasia como Rudeus Greyrat e decide viver sua nova vida ao máximo, superando seus traumas passados.",
    anoLancamento: 2021,
    classificacao: 8.7,
    idioma: "Legendado/Dublado",
    generos: ["Aventura", "Drama", "Fantasia", "Isekai"],
    imagemCapa: "/images/anime2024_mushoku_s2p2.jpg",
    trailerUrl: "https://www.youtube.com/embed/R3SFqVniGP8",
    episodios: [
      {
        numero: 1,
        titulo: "Reencarnação Desempregada",
        urlVideo: "https://exemplo-de-link.com/mushoku-tensei-jobless-reincarnation-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/mushoku-tensei-jobless-reincarnation-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/mushoku-tensei-jobless-reincarnation-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/mushoku-tensei-jobless-reincarnation-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/mushoku-tensei-jobless-reincarnation-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/mushoku-tensei-jobless-reincarnation-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/mushoku-tensei-jobless-reincarnation-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/mushoku-tensei-jobless-reincarnation-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/mushoku-tensei-jobless-reincarnation-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/mushoku-tensei-jobless-reincarnation-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/mushoku-tensei-jobless-reincarnation-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/mushoku-tensei-jobless-reincarnation-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/mushoku-tensei-jobless-reincarnation-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Made in Abyss",
    sinopse: "Riko, uma jovem órfã, desce ao perigoso e misterioso Abismo para encontrar sua mãe, acompanhada pelo robô Reg. Eles descobrem um mundo belo e aterrorizante.",
    anoLancamento: 2017,
    classificacao: 8.8,
    idioma: "Legendado/Dublado",
    generos: ["Aventura", "Fantasia Sombria", "Drama", "Mistério", "Sci-Fi"],
    imagemCapa: "/images/madeinabyss.jpg",
    trailerUrl: "https://www.youtube.com/embed/DiqFu6A8-xQ",
    episodios: [
      {
        numero: 1,
        titulo: "A Cidade do Grande Abismo",
        urlVideo: "https://exemplo-de-link.com/made-in-abyss-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/made-in-abyss-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/made-in-abyss-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/made-in-abyss-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/made-in-abyss-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/made-in-abyss-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/made-in-abyss-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/made-in-abyss-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/made-in-abyss-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/made-in-abyss-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/made-in-abyss-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/made-in-abyss-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/made-in-abyss-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA N
  {
    titulo: "Naruto Shippuden",
    sinopse: "Dois anos e meio após sua partida, Naruto Uzumaki retorna a Konoha mais forte e determinado a resgatar seu amigo Sasuke e proteger a vila da ameaça da Akatsuki.",
    anoLancamento: 2007,
    classificacao: 8.2,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Comédia", "Artes Marciais", "Shonen"],
    imagemCapa: "/images/naruto.jpg",
    trailerUrl: "https://www.youtube.com/embed/1dy2zPPrKD8",
    episodios: [
      {
        numero: 1,
        titulo: "De Volta para Casa",
        urlVideo: "https://exemplo-de-link.com/naruto-shippuden-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/naruto-shippuden-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/naruto-shippuden-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/naruto-shippuden-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/naruto-shippuden-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/naruto-shippuden-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/naruto-shippuden-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/naruto-shippuden-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/naruto-shippuden-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/naruto-shippuden-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/naruto-shippuden-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/naruto-shippuden-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/naruto-shippuden-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "No Game No Life",
    sinopse: "Os irmãos geeks e reclusos, Sora e Shiro, são transportados para um mundo onde todos os conflitos são resolvidos através de jogos, e eles pretendem se tornar os reis.",
    anoLancamento: 2014,
    classificacao: 8.1,
    idioma: "Legendado",
    generos: ["Jogo", "Aventura", "Comédia", "Fantasia", "Isekai"],
    imagemCapa: "/images/nogamenolife.jpg",
    trailerUrl: "https://www.youtube.com/embed/TqMCYf1S2mc",
    episodios: [
      {
        numero: 1,
        titulo: "Iniciante",
        urlVideo: "https://exemplo-de-link.com/no-game-no-life-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/no-game-no-life-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/no-game-no-life-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/no-game-no-life-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/no-game-no-life-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/no-game-no-life-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/no-game-no-life-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/no-game-no-life-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/no-game-no-life-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/no-game-no-life-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/no-game-no-life-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/no-game-no-life-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/no-game-no-life-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Noragami",
    sinopse: "Yato é um deus menor que sonha em ter milhões de seguidores. Sua vida muda quando ele conhece Hiyori Iki, uma garota que se envolve em seus problemas.",
    anoLancamento: 2014,
    classificacao: 8.0,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Comédia", "Sobrenatural", "Shonen"],
    imagemCapa: "/images/noragami.jpg",
    trailerUrl: "https://www.youtube.com/embed/gWCnKoEgfP0",
    episodios: [
      {
        numero: 1,
        titulo: "Um Gato Doméstico, um Deus e um Rabo",
        urlVideo: "https://exemplo-de-link.com/noragami-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/noragami-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/noragami-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/noragami-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/noragami-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/noragami-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/noragami-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/noragami-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/noragami-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/noragami-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/noragami-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/noragami-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/noragami-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/noragami-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/noragami-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/noragami-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/noragami-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/noragami-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/noragami-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/noragami-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/noragami-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/noragami-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/noragami-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/noragami-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/noragami-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/noragami-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/noragami-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/noragami-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/noragami-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/noragami-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/noragami-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/noragami-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/noragami-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/noragami-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/noragami-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/noragami-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  
  // LETRA O
  {
    titulo: "One Punch Man",
    sinopse: "Saitama é um herói tão poderoso que derrota qualquer inimigo com um único soco. Isso o leva a uma crise existencial de tédio e busca por um oponente à sua altura.",
    anoLancamento: 2015,
    classificacao: 8.5,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Comédia", "Paródia", "Sci-Fi", "Superpoderes", "Seinen"],
    imagemCapa: "/images/onepunchman.jpg",
    trailerUrl: "https://www.youtube.com/embed/Poo5lRbBiFA",
    episodios: [
      {
        numero: 1,
        titulo: "O Homem Mais Forte",
        urlVideo: "https://exemplo-de-link.com/one-punch-man-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/one-punch-man-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/one-punch-man-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/one-punch-man-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/one-punch-man-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/one-punch-man-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/one-punch-man-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/one-punch-man-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/one-punch-man-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/one-punch-man-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/one-punch-man-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/one-punch-man-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/one-punch-man-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Overlord",
    sinopse: "No último dia de um jogo online, Momonga decide não deslogar e fica preso no corpo de seu avatar, um poderoso lich. Ele então decide conquistar este novo mundo.",
    anoLancamento: 2015,
    classificacao: 7.9,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Fantasia", "Jogo", "Isekai"],
    imagemCapa: "/images/overlord.jpg",
    trailerUrl: "https://www.youtube.com/embed/jMoVmSV4yA8",
    episodios: [
      {
        numero: 1,
        titulo: "O Fim e o Começo",
        urlVideo: "https://exemplo-de-link.com/overlord-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/overlord-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/overlord-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/overlord-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/overlord-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/overlord-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/overlord-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/overlord-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/overlord-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/overlord-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/overlord-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/overlord-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/overlord-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/overlord-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/overlord-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/overlord-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/overlord-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/overlord-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/overlord-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/overlord-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/overlord-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/overlord-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/overlord-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/overlord-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/overlord-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/overlord-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/overlord-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/overlord-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/overlord-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/overlord-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/overlord-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/overlord-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/overlord-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/overlord-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/overlord-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/overlord-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Ousama Ranking (Ranking of Kings)",
    sinopse: "Bojji é um príncipe surdo e fraco que não consegue nem empunhar uma espada infantil. Apesar das zombarias, ele sonha em se tornar o maior rei do mundo.",
    anoLancamento: 2021,
    classificacao: 8.6,
    idioma: "Legendado/Dublado",
    generos: ["Aventura", "Fantasia"],
    imagemCapa: "/images/ousama.jpg",
    trailerUrl: "https://www.youtube.com/embed/2OMixT12loI",
    episodios: [
      {
        numero: 1,
        titulo: "O Príncipe Nu",
        urlVideo: "https://exemplo-de-link.com/ousama-ranking-ranking-of-kings-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/ousama-ranking-ranking-of-kings-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/ousama-ranking-ranking-of-kings-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/ousama-ranking-ranking-of-kings-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/ousama-ranking-ranking-of-kings-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/ousama-ranking-ranking-of-kings-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/ousama-ranking-ranking-of-kings-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/ousama-ranking-ranking-of-kings-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/ousama-ranking-ranking-of-kings-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/ousama-ranking-ranking-of-kings-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/ousama-ranking-ranking-of-kings-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/ousama-ranking-ranking-of-kings-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ousama-ranking-ranking-of-kings-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  
  // LETRA P
  {
    titulo: "Psycho-Pass",
    sinopse: "Em um futuro onde o estado mental de uma pessoa pode ser medido, a inspetora Akane Tsunemori caça criminosos latentes com a ajuda de executores.",
    anoLancamento: 2012,
    classificacao: 8.3,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Sci-Fi", "Policial", "Psicológico"],
    imagemCapa: "/images/psychopass.jpg",
    trailerUrl: "https://www.youtube.com/embed/YzuJnyebc40",
    episodios: [
      {
        numero: 1,
        titulo: "Coeficiente de Criminalidade",
        urlVideo: "https://exemplo-de-link.com/psycho-pass-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/psycho-pass-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/psycho-pass-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/psycho-pass-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/psycho-pass-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/psycho-pass-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/psycho-pass-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/psycho-pass-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/psycho-pass-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/psycho-pass-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/psycho-pass-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/psycho-pass-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/psycho-pass-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Parasyte -the maxim-",
    sinopse: "Shinichi Izumi, um estudante de 17 anos, aprende a coexistir com Migi, um parasita alienígena que tentou, mas não conseguiu, tomar seu cérebro e se alojou em sua mão direita.",
    anoLancamento: 2014,
    classificacao: 8.4,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Sci-Fi", "Horror", "Psicológico", "Drama", "Seinen"],
    imagemCapa: "/images/parasyte.jpg",
    trailerUrl: "https://www.youtube.com/embed/RJc44MhOR3E",
    episodios: [
      {
        numero: 1,
        titulo: "Metamorfose",
        urlVideo: "https://exemplo-de-link.com/parasyte-the-maxim-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/parasyte-the-maxim-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/parasyte-the-maxim-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/parasyte-the-maxim-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/parasyte-the-maxim-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/parasyte-the-maxim-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/parasyte-the-maxim-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/parasyte-the-maxim-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/parasyte-the-maxim-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/parasyte-the-maxim-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/parasyte-the-maxim-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/parasyte-the-maxim-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/parasyte-the-maxim-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Promised Neverland, The",
    sinopse: "Emma, Norman e Ray vivem em um orfanato feliz, mas descobrem a terrível verdade por trás de sua existência e planejam uma fuga arriscada.",
    anoLancamento: 2019,
    classificacao: 8.5,
    idioma: "Legendado/Dublado",
    generos: ["Mistério", "Suspense", "Psicológico", "Sci-Fi", "Shonen"],
    imagemCapa: "/images/neverland.jpg",
    trailerUrl: "https://www.youtube.com/embed/ApLudqucq-s",
    episodios: [
      {
        numero: 1,
        titulo: "121045",
        urlVideo: "https://exemplo-de-link.com/the-promised-neverland-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/the-promised-neverland-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/the-promised-neverland-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/the-promised-neverland-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/the-promised-neverland-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/the-promised-neverland-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/the-promised-neverland-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/the-promised-neverland-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/the-promised-neverland-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/the-promised-neverland-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/the-promised-neverland-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/the-promised-neverland-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-promised-neverland-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA Q
  {
    titulo: "Quintessential Quintuplets, The",
    sinopse: "Futaro Uesugi, um estudante pobre e genial, é contratado como tutor de cinco gêmeas idênticas e problemáticas, que odeiam estudar.",
    anoLancamento: 2019,
    classificacao: 7.9,
    idioma: "Legendado/Dublado",
    generos: ["Comédia", "Harém", "Romance", "Escolar", "Shonen"],
    imagemCapa: "/images/quintessential.jpg",
    trailerUrl: "https://www.youtube.com/embed/p3pgY_69gMk",
    episodios: [
      {
        numero: 1,
        titulo: "As Gêmeas Essenciais",
        urlVideo: "https://exemplo-de-link.com/the-quintessential-quintuplets-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/the-quintessential-quintuplets-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/the-quintessential-quintuplets-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/the-quintessential-quintuplets-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/the-quintessential-quintuplets-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/the-quintessential-quintuplets-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/the-quintessential-quintuplets-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/the-quintessential-quintuplets-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/the-quintessential-quintuplets-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/the-quintessential-quintuplets-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/the-quintessential-quintuplets-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/the-quintessential-quintuplets-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-quintessential-quintuplets-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Queen's Blade: Rurou no Senshi",
    sinopse: "A cada quatro anos, um torneio chamado Queen's Blade é realizado para determinar a rainha mais bela e forte. Guerreiras de todo o continente competem pelo trono.",
    anoLancamento: 2009,
    classificacao: 6.3,
    idioma: "Legendado",
    generos: ["Ação", "Aventura", "Ecchi", "Fantasia"],
    imagemCapa: "/images/queensblade.jpg",
    trailerUrl: "https://www.youtube.com/embed/V9jJXZv9_aI",
    episodios: [
      {
        numero: 1,
        titulo: "A Viajante Guerreira",
        urlVideo: "https://exemplo-de-link.com/queens-blade-rurou-no-senshi-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/queens-blade-rurou-no-senshi-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/queens-blade-rurou-no-senshi-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/queens-blade-rurou-no-senshi-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/queens-blade-rurou-no-senshi-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/queens-blade-rurou-no-senshi-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/queens-blade-rurou-no-senshi-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/queens-blade-rurou-no-senshi-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/queens-blade-rurou-no-senshi-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/queens-blade-rurou-no-senshi-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/queens-blade-rurou-no-senshi-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/queens-blade-rurou-no-senshi-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/queens-blade-rurou-no-senshi-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Qualidea Code",
    sinopse: "Em um mundo onde a humanidade luta contra uma ameaça conhecida como 'Unknown', crianças que despertaram superpoderes lutam para defender o Japão.",
    anoLancamento: 2016,
    classificacao: 6.0,
    idioma: "Legendado",
    generos: ["Ação", "Magia", "Sobrenatural"],
    imagemCapa: "/images/qualidea.jpg",
    trailerUrl: "https://www.youtube.com/embed/wAkG3sMhS50",
    episodios: [
      {
        numero: 1,
        titulo: "Mundo de Glória Sobrevivente",
        urlVideo: "https://exemplo-de-link.com/qualidea-code-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/qualidea-code-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/qualidea-code-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/qualidea-code-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/qualidea-code-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/qualidea-code-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/qualidea-code-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/qualidea-code-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/qualidea-code-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/qualidea-code-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/qualidea-code-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/qualidea-code-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/qualidea-code-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA R
  {
    titulo: "Re:ZERO -Starting Life in Another World-",
    sinopse: "Subaru Natsuki é transportado para outro mundo, onde descobre que tem a habilidade de 'Retornar da Morte', voltando no tempo toda vez que morre.",
    anoLancamento: 2016,
    classificacao: 8.2,
    idioma: "Legendado/Dublado",
    generos: ["Drama", "Fantasia", "Suspense", "Psicológico", "Isekai"],
    imagemCapa: "/images/rezero.jpg",
    trailerUrl: "https://www.youtube.com/embed/Slz_rahWp6M",
    episodios: [
      {
        numero: 1,
        titulo: "O Fim do Começo e o Começo do Fim",
        urlVideo: "https://exemplo-de-link.com/re-zero-starting-life-in-another-world-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/re-zero-starting-life-in-another-world-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/re-zero-starting-life-in-another-world-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/re-zero-starting-life-in-another-world-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/re-zero-starting-life-in-another-world-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/re-zero-starting-life-in-another-world-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/re-zero-starting-life-in-another-world-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/re-zero-starting-life-in-another-world-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/re-zero-starting-life-in-another-world-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/re-zero-starting-life-in-another-world-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/re-zero-starting-life-in-another-world-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/re-zero-starting-life-in-another-world-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/re-zero-starting-life-in-another-world-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Rurouni Kenshin",
    sinopse: "Kenshin Himura, um ex-assassino lendário, vaga pelo Japão oferecendo proteção e ajuda aos necessitados como uma forma de expiar seus pecados do passado.",
    anoLancamento: 1996,
    classificacao: 8.3,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Comédia", "Histórico", "Romance", "Samurai"],
    imagemCapa: "/images/kenshin.jpg",
    trailerUrl: "https://www.youtube.com/embed/kM2_-_Y_vYk",
    episodios: [
      {
        numero: 1,
        titulo: "O Lendário Samurai",
        urlVideo: "https://exemplo-de-link.com/rurouni-kenshin-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/rurouni-kenshin-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/rurouni-kenshin-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/rurouni-kenshin-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/rurouni-kenshin-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/rurouni-kenshin-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/rurouni-kenshin-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/rurouni-kenshin-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/rurouni-kenshin-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/rurouni-kenshin-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/rurouni-kenshin-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/rurouni-kenshin-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/rurouni-kenshin-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Rising of the Shield Hero, The",
    sinopse: "Naofumi Iwatani é invocado para outro mundo como um dos Quatro Heróis Cardeais, o Herói do Escudo. Traído e desprezado, ele precisa lutar para sobreviver e provar seu valor.",
    anoLancamento: 2019,
    classificacao: 7.9,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Drama", "Fantasia", "Isekai"],
    imagemCapa: "/images/shieldhero.jpg",
    trailerUrl: "https://www.youtube.com/embed/Vp4t_B2S5pU",
    episodios: [
      {
        numero: 1,
        titulo: "O Herói do Escudo",
        urlVideo: "https://exemplo-de-link.com/the-rising-of-the-shield-hero-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/the-rising-of-the-shield-hero-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/the-rising-of-the-shield-hero-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/the-rising-of-the-shield-hero-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/the-rising-of-the-shield-hero-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/the-rising-of-the-shield-hero-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/the-rising-of-the-shield-hero-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/the-rising-of-the-shield-hero-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/the-rising-of-the-shield-hero-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/the-rising-of-the-shield-hero-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/the-rising-of-the-shield-hero-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/the-rising-of-the-shield-hero-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/the-rising-of-the-shield-hero-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA S
  {
    titulo: "Solo Leveling 1ª Temporada",
    sinopse: "Sung Jinwoo, o caçador mais fraco, ganha um sistema misterioso que o permite subir de nível infinitamente, transformando-o no mais forte caçador que existe.",
    anoLancamento: 2024,
    classificacao: 8.4,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Fantasia"],
    imagemCapa: "/images/solo.jpg",
    trailerUrl: "https://www.youtube.com/embed/bssSj4cKsrI",
    episodios: [
      {
        numero: 1,
        titulo: "I’m Used to It",
        urlVideo: "https://drive.google.com/file/d/1uQsREQibsWZaIjDdH6egt5fUJW7pYC8X/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/1uQsREQibsWZaIjDdH6egt5fUJW7pYC8X/view?usp=sharing" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/1uQsREQibsWZaIjDdH6egt5fUJW7pYC8X/view?usp=sharing" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://drive.google.com/file/d/1UNskvpvWH_Y7lVLNGDWuCRTFyuAQ7PfF/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/1UNskvpvWH_Y7lVLNGDWuCRTFyuAQ7PfF/view?usp=sharing" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/1UNskvpvWH_Y7lVLNGDWuCRTFyuAQ7PfF/view?usp=sharing" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://drive.google.com/file/d/1j4joGlthVwTsfHcxUUPPn_-dfMGsAsFe/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/1j4joGlthVwTsfHcxUUPPn_-dfMGsAsFe/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/1j4joGlthVwTsfHcxUUPPn_-dfMGsAsFe/view?usp=drive_link" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://drive.google.com/file/d/19JM99htpps89LLd_lTsL7F21POIKdZKD/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/19JM99htpps89LLd_lTsL7F21POIKdZKD/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/19JM99htpps89LLd_lTsL7F21POIKdZKD/view?usp=drive_link" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://drive.google.com/file/d/1MSqDjsFGpj4j3_dSA5Gyym0aQFLR3g9G/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/1MSqDjsFGpj4j3_dSA5Gyym0aQFLR3g9G/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/1MSqDjsFGpj4j3_dSA5Gyym0aQFLR3g9G/view?usp=drive_link" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://drive.google.com/file/d/1QVtLp2JsmDr32fsOqqfbpUJ90tfxQg0l/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/1QVtLp2JsmDr32fsOqqfbpUJ90tfxQg0l/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/1QVtLp2JsmDr32fsOqqfbpUJ90tfxQg0l/view?usp=drive_link" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://drive.google.com/file/d/1EbOSxX-ZkJPwC_Fp5sZ17qzOZ9T9qi6Z/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/1EbOSxX-ZkJPwC_Fp5sZ17qzOZ9T9qi6Z/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/1EbOSxX-ZkJPwC_Fp5sZ17qzOZ9T9qi6Z/view?usp=drive_link" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://drive.google.com/file/d/191qKnK5QpNWvwVx0iM0WFWqb4oNLq8qo/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/191qKnK5QpNWvwVx0iM0WFWqb4oNLq8qo/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/191qKnK5QpNWvwVx0iM0WFWqb4oNLq8qo/view?usp=drive_link" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://drive.google.com/file/d/1MmdMcKbafuHpMdg6L_cI3qzcE-xNH9g5/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/1MmdMcKbafuHpMdg6L_cI3qzcE-xNH9g5/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/1MmdMcKbafuHpMdg6L_cI3qzcE-xNH9g5/view?usp=drive_link" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://drive.google.com/file/d/1w7dftROBkd-XRnTtJqbLjnTSzX315X_n/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/1w7dftROBkd-XRnTtJqbLjnTSzX315X_n/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/1w7dftROBkd-XRnTtJqbLjnTSzX315X_n/view?usp=drive_link" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://drive.google.com/file/d/1VCHzHq2mW3-j3yjR9i85KSEyEOyiifWe/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/1VCHzHq2mW3-j3yjR9i85KSEyEOyiifWe/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/1VCHzHq2mW3-j3yjR9i85KSEyEOyiifWe/view?usp=drive_link" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12 Final",
        urlVideo: "https://drive.google.com/file/d/1mU3BzI6TD0AtStNlC1bwG7630-L2TXof/preview",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://drive.google.com/file/d/1mU3BzI6TD0AtStNlC1bwG7630-L2TXof/view?usp=drive_link" },
          { qualidade: "1080p", urlDownload: "https://drive.google.com/file/d/1mU3BzI6TD0AtStNlC1bwG7630-L2TXof/view?usp=drive_link" }
        ]
      }
    ]
  },
  {
    titulo: "Steins;Gate",
    sinopse: "Um grupo de amigos transforma seu micro-ondas em um dispositivo que envia mensagens para o passado, atraindo a atenção de uma organização sinistra.",
    anoLancamento: 2011,
    classificacao: 9.0,
    idioma: "Legendado",
    generos: ["Sci-Fi", "Suspense", "Drama", "Psicológico"],
    imagemCapa: "/images/steinsgate.jpg",
    trailerUrl: "https://www.youtube.com/embed/27LKPnAo2hA",
    episodios: [
      {
        numero: 1,
        titulo: "Prólogo do Começo e do Fim",
        urlVideo: "https://exemplo-de-link.com/steins-gate-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/steins-gate-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/steins-gate-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/steins-gate-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/steins-gate-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/steins-gate-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/steins-gate-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/steins-gate-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/steins-gate-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/steins-gate-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/steins-gate-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/steins-gate-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/steins-gate-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Spy x Family",
    sinopse: "Um espião, uma assassina e uma telepata formam uma família falsa para cumprir uma missão, sem saberem dos segredos uns dos outros. O resultado é uma comédia charmosa.",
    anoLancamento: 2022,
    classificacao: 8.6,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Comédia", "Espionagem", "Slice of Life", "Shonen"],
    imagemCapa: "/images/spyx.jpg",
    trailerUrl: "https://www.youtube.com/embed/Ofgwr2qv1tI",
    episodios: [
      {
        numero: 1,
        titulo: "Operação Strix",
        urlVideo: "https://exemplo-de-link.com/spy-x-family-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/spy-x-family-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/spy-x-family-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/spy-x-family-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/spy-x-family-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/spy-x-family-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/spy-x-family-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/spy-x-family-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/spy-x-family-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/spy-x-family-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/spy-x-family-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/spy-x-family-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/spy-x-family-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA T
  {
    titulo: "Tokyo Ghoul",
    sinopse: "Ken Kaneki, um estudante universitário, sobrevive a um encontro mortal com uma ghoul e se torna um meio-ghoul, forçado a viver entre os dois mundos.",
    anoLancamento: 2014,
    classificacao: 7.7,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Mistério", "Horror", "Psicológico", "Sobrenatural", "Seinen"],
    imagemCapa: "/images/tokyoghoul.jpg",
    trailerUrl: "https://www.youtube.com/embed/vGuQeQsoRgU",
    episodios: [
      {
        numero: 1,
        titulo: "Tragédia",
        urlVideo: "https://exemplo-de-link.com/tokyo-ghoul-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/tokyo-ghoul-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/tokyo-ghoul-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/tokyo-ghoul-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/tokyo-ghoul-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/tokyo-ghoul-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/tokyo-ghoul-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/tokyo-ghoul-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/tokyo-ghoul-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/tokyo-ghoul-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/tokyo-ghoul-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/tokyo-ghoul-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/tokyo-ghoul-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Toradora!",
    sinopse: "Ryuji Takasu e Taiga Aisaka, dois estudantes com aparências enganosas, fazem um pacto para ajudar um ao outro a se aproximar de seus respectivos interesses amorosos.",
    anoLancamento: 2008,
    classificacao: 8.1,
    idioma: "Legendado/Dublado",
    generos: ["Comédia", "Romance", "Slice of Life", "Escolar"],
    imagemCapa: "/images/toradora.jpg",
    trailerUrl: "https://www.youtube.com/embed/Y3X0VGb9T-k",
    episodios: [
      {
        numero: 1,
        titulo: "Tigre e Dragão",
        urlVideo: "https://exemplo-de-link.com/toradora-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/toradora-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/toradora-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/toradora-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/toradora-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/toradora-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/toradora-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/toradora-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/toradora-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/toradora-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/toradora-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/toradora-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/toradora-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/toradora-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/toradora-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/toradora-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/toradora-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/toradora-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/toradora-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/toradora-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/toradora-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/toradora-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/toradora-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/toradora-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/toradora-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/toradora-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/toradora-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/toradora-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/toradora-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/toradora-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/toradora-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/toradora-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/toradora-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/toradora-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/toradora-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/toradora-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "To Your Eternity",
    sinopse: "Um ser imortal é enviado à Terra sem identidade ou emoções. Ele assume a forma daqueles que o tocam, aprendendo sobre a vida e a humanidade através de encontros e perdas.",
    anoLancamento: 2021,
    classificacao: 8.4,
     idioma: "Legendado/Dublado",
    generos: ["Aventura", "Drama", "Sobrenatural", "Shonen"],
    imagemCapa: "/images/toyoureternity.jpg",
    trailerUrl: "https://www.youtube.com/embed/WHoW60EfG3o",
    episodios: [
      {
        numero: 1,
        titulo: "O Último",
        urlVideo: "https://exemplo-de-link.com/to-your-eternity-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/to-your-eternity-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/to-your-eternity-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/to-your-eternity-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/to-your-eternity-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/to-your-eternity-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/to-your-eternity-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/to-your-eternity-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/to-your-eternity-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/to-your-eternity-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/to-your-eternity-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/to-your-eternity-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/to-your-eternity-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  
  // LETRA U
  {
    titulo: "Uzumaki",
    sinopse: "Na cidade de Kurouzu-cho, os cidadãos se tornam obcecados por espirais, uma maldição que distorce suas mentes e corpos de formas grotescas e aterrorizantes.",
    anoLancamento: 2024,
    classificacao: 8.5,
    idioma: "Legendado",
    generos: ["Horror", "Psicológico", "Sobrenatural", "Drama"],
    imagemCapa: "/images/uzumaki.jpg",
    trailerUrl: "https://www.youtube.com/embed/uWF6ub-kHwA",
    episodios: [
      {
        numero: 1,
        titulo: "A Obsessão por Espirais: Parte 1",
        urlVideo: "https://exemplo-de-link.com/uzumaki-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/uzumaki-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/uzumaki-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/uzumaki-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/uzumaki-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/uzumaki-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/uzumaki-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/uzumaki-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/uzumaki-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/uzumaki-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/uzumaki-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/uzumaki-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/uzumaki-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Ushio to Tora",
    sinopse: "Ushio Aotsuki liberta acidentalmente o demônio Tora e herda a Lança da Besta, uma arma lendária para combater outros youkais e proteger a humanidade.",
    anoLancamento: 2015,
    classificacao: 7.7,
    idioma: "Legendado",
    generos: ["Ação", "Comédia", "Demônios", "Sobrenatural", "Shonen"],
    imagemCapa: "/images/ushiototora.jpg",
    trailerUrl: "https://www.youtube.com/embed/z2iL-j_w9pU",
    episodios: [
      {
        numero: 1,
        titulo: "O Encontro Fatídico de Ushio e Tora",
        urlVideo: "https://exemplo-de-link.com/ushio-to-tora-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/ushio-to-tora-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/ushio-to-tora-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/ushio-to-tora-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/ushio-to-tora-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/ushio-to-tora-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/ushio-to-tora-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/ushio-to-tora-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/ushio-to-tora-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/ushio-to-tora-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/ushio-to-tora-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/ushio-to-tora-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/ushio-to-tora-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Urusei Yatsura (2022)",
    sinopse: "A vida do azarado Ataru Moroboshi vira de cabeça para baixo quando ele acidentalmente fica noivo de Lum, uma bela princesa alienígena com chifres e poderes elétricos.",
    anoLancamento: 2022,
    classificacao: 7.5,
    idioma: "Legendado",
    generos: ["Comédia", "Sci-Fi", "Romance", "Shonen"],
    imagemCapa: "/images/urusei.jpg",
    trailerUrl: "https://www.youtube.com/embed/IBa5m4kjelE",
    episodios: [
      {
        numero: 1,
        titulo: "Corrida da Juventude",
        urlVideo: "https://exemplo-de-link.com/urusei-yatsura-2022-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/urusei-yatsura-2022-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/urusei-yatsura-2022-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/urusei-yatsura-2022-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/urusei-yatsura-2022-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/urusei-yatsura-2022-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/urusei-yatsura-2022-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/urusei-yatsura-2022-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/urusei-yatsura-2022-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/urusei-yatsura-2022-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/urusei-yatsura-2022-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/urusei-yatsura-2022-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/urusei-yatsura-2022-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA V
  {
    titulo: "Vinland Saga",
    sinopse: "Thorfinn busca vingança pela morte do pai em meio às guerras vikings, mas sua jornada o leva a questionar o significado de ser um verdadeiro guerreiro.",
    anoLancamento: 2019,
    classificacao: 8.7,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Drama", "Histórico", "Seinen"],
    imagemCapa: "/images/anime2025_vinland_s2.jpg",
    trailerUrl: "https://www.youtube.com/embed/ML_alfGj_ms",
    episodios: [
      {
        numero: 1,
        titulo: "Em Algum Lugar que Não é Aqui",
        urlVideo: "https://exemplo-de-link.com/vinland-saga-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/vinland-saga-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/vinland-saga-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/vinland-saga-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/vinland-saga-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/vinland-saga-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/vinland-saga-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/vinland-saga-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/vinland-saga-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/vinland-saga-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/vinland-saga-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/vinland-saga-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vinland-saga-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Violet Evergarden",
    sinopse: "Após a guerra, a ex-soldado Violet Evergarden começa a trabalhar como Autômata de Automemórias para entender o amor e as últimas palavras de seu major.",
    anoLancamento: 2018,
    classificacao: 8.6,
    idioma: "Legendado/Dublado",
    generos: ["Drama", "Fantasia", "Slice of Life"],
    imagemCapa: "/images/violet.jpg",
    trailerUrl: "https://www.youtube.com/embed/BUfSen2rYvA",
    episodios: [
      {
        numero: 1,
        titulo: "Eu te Amo e as Bonecas de Automemória",
        urlVideo: "https://exemplo-de-link.com/violet-evergarden-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/violet-evergarden-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/violet-evergarden-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/violet-evergarden-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/violet-evergarden-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/violet-evergarden-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/violet-evergarden-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/violet-evergarden-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/violet-evergarden-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/violet-evergarden-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/violet-evergarden-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/violet-evergarden-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/violet-evergarden-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Vivy: Fluorite Eye's Song",
    sinopse: "Vivy, a primeira IA autônoma, tem a missão de cantar para fazer as pessoas felizes. Sua vida muda quando uma IA do futuro a recruta para impedir uma guerra contra a humanidade.",
    anoLancamento: 2021,
    classificacao: 8.5,
    idioma: "Legendado",
    generos: ["Ação", "Sci-Fi", "Música", "Suspense"],
    imagemCapa: "/images/vivy.jpg",
    trailerUrl: "https://www.youtube.com/embed/Y653d_3goW8",
    episodios: [
      {
        numero: 1,
        titulo: "Minha Missão, Sua Missão",
        urlVideo: "https://exemplo-de-link.com/vivy-fluorite-eyes-song-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/vivy-fluorite-eyes-song-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/vivy-fluorite-eyes-song-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/vivy-fluorite-eyes-song-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/vivy-fluorite-eyes-song-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/vivy-fluorite-eyes-song-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/vivy-fluorite-eyes-song-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/vivy-fluorite-eyes-song-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/vivy-fluorite-eyes-song-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/vivy-fluorite-eyes-song-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/vivy-fluorite-eyes-song-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/vivy-fluorite-eyes-song-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/vivy-fluorite-eyes-song-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA W
  {
    titulo: "Welcome to the N.H.K.",
    sinopse: "Tatsuhiro Satou, um hikikomori (recluso social), acredita em uma conspiração da NHK para criar pessoas como ele. Sua vida muda ao conhecer a misteriosa Misaki Nakahara.",
    anoLancamento: 2006,
    classificacao: 8.2,
    idioma: "Legendado",
    generos: ["Comédia", "Drama", "Psicológico", "Romance"],
    imagemCapa: "/images/nhk.jpg",
    trailerUrl: "https://www.youtube.com/embed/219YxuIy4G0",
    episodios: [
      {
        numero: 1,
        titulo: "Bem-vindo ao Projeto!",
        urlVideo: "https://exemplo-de-link.com/welcome-to-the-nhk-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/welcome-to-the-nhk-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/welcome-to-the-nhk-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/welcome-to-the-nhk-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/welcome-to-the-nhk-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/welcome-to-the-nhk-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/welcome-to-the-nhk-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/welcome-to-the-nhk-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/welcome-to-the-nhk-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/welcome-to-the-nhk-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/welcome-to-the-nhk-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/welcome-to-the-nhk-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/welcome-to-the-nhk-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Wolf's Rain",
    sinopse: "Em um mundo moribundo, uma lenda diz que os lobos encontrarão o caminho para o paraíso. Quatro lobos disfarçados de humanos buscam esse lugar lendário.",
    anoLancamento: 2003,
    classificacao: 7.9,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Aventura", "Drama", "Fantasia", "Mistério", "Sci-Fi"],
    imagemCapa: "/images/wolfsrain.jpg",
    trailerUrl: "https://www.youtube.com/embed/3i_aA8Z0sZc",
    episodios: [
      {
        numero: 1,
        titulo: "A Cidade dos Uivos",
        urlVideo: "https://exemplo-de-link.com/wolfs-rain-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/wolfs-rain-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/wolfs-rain-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/wolfs-rain-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/wolfs-rain-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/wolfs-rain-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/wolfs-rain-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/wolfs-rain-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/wolfs-rain-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/wolfs-rain-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/wolfs-rain-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/wolfs-rain-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wolfs-rain-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Wonder Egg Priority",
    sinopse: "Ai Ohto, uma garota lidando com o suicídio de sua melhor amiga, compra um 'Ovo Maravilha' e é arrastada para um mundo de sonhos onde deve proteger garotas de seus traumas.",
    anoLancamento: 2021,
    classificacao: 7.8,
    idioma: "Legendado",
    generos: ["Drama", "Fantasia", "Psicológico", "Mistério"],
    imagemCapa: "/images/wonderegg.jpg",
    trailerUrl: "https://www.youtube.com/embed/WaWanncKlR4",
    episodios: [
      {
        numero: 1,
        titulo: "O Domínio das Crianças",
        urlVideo: "https://exemplo-de-link.com/wonder-egg-priority-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/wonder-egg-priority-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/wonder-egg-priority-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/wonder-egg-priority-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/wonder-egg-priority-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/wonder-egg-priority-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/wonder-egg-priority-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/wonder-egg-priority-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/wonder-egg-priority-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/wonder-egg-priority-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/wonder-egg-priority-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/wonder-egg-priority-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/wonder-egg-priority-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  
  // LETRA X
  {
    titulo: "X-Men (2011)",
    sinopse: "Após a morte de Jean Grey, os X-Men se separam. Mas eles se reúnem no Japão para investigar o sequestro de Hisako Ichiki, uma jovem mutante.",
    anoLancamento: 2011,
    classificacao: 6.5,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Sci-Fi", "Superpoderes"],
    imagemCapa: "/images/xmen_anime.jpg",
    trailerUrl: "https://www.youtube.com/embed/pSAb0QAu4sY",
    episodios: [
      {
        numero: 1,
        titulo: "O Retorno",
        urlVideo: "https://exemplo-de-link.com/x-men-2011-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/x-men-2011-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/x-men-2011-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/x-men-2011-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/x-men-2011-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/x-men-2011-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/x-men-2011-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/x-men-2011-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/x-men-2011-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/x-men-2011-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/x-men-2011-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/x-men-2011-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-men-2011-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "xxxHOLiC",
    sinopse: "Kimihiro Watanuki, um jovem que pode ver espíritos, acaba trabalhando para a enigmática bruxa Yuko Ichihara para se livrar de sua habilidade.",
    anoLancamento: 2006,
    classificacao: 8.0,
    idioma: "Legendado",
    generos: ["Comédia", "Drama", "Mistério", "Psicológico", "Sobrenatural"],
    imagemCapa: "/images/xxxholic.jpg",
    trailerUrl: "https://www.youtube.com/embed/e8YUk9gIeR4",
    episodios: [
      {
        numero: 1,
        titulo: "O Inevitável",
        urlVideo: "https://exemplo-de-link.com/xxxholic-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/xxxholic-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/xxxholic-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/xxxholic-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/xxxholic-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/xxxholic-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/xxxholic-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/xxxholic-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/xxxholic-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/xxxholic-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/xxxholic-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/xxxholic-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/xxxholic-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "X (X/1999)",
    sinopse: "Kamui Shiro retorna a Tóquio para descobrir que ele é a figura central em uma batalha apocalíptica entre os Dragões do Céu e os Dragões da Terra.",
    anoLancamento: 2001,
    classificacao: 7.2,
    idioma: "Legendado",
    generos: ["Ação", "Drama", "Fantasia", "Magia", "Sobrenatural"],
    imagemCapa: "/images/x1999.jpg",
    trailerUrl: "https://www.youtube.com/embed/k9rC2KAb4GM",
    episodios: [
      {
        numero: 1,
        titulo: "Um Reencontro",
        urlVideo: "https://exemplo-de-link.com/x-1999-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/x-1999-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/x-1999-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/x-1999-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/x-1999-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/x-1999-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/x-1999-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/x-1999-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/x-1999-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/x-1999-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/x-1999-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/x-1999-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/x-1999-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA Y
  {
    titulo: "Yu Yu Hakusho",
    sinopse: "Yusuke Urameshi, um delinquente juvenil, morre salvando uma criança e ganha uma segunda chance como Detetive Espiritual, investigando casos sobrenaturais.",
    anoLancamento: 1992,
    classificacao: 8.4,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Comédia", "Demônios", "Sobrenatural", "Artes Marciais", "Shonen"],
    imagemCapa: "/images/yuyuhakusho.jpg",
    trailerUrl: "https://www.youtube.com/embed/MX37clt_-U0",
    episodios: [
      {
        numero: 1,
        titulo: "Surpreso por Estar Morto",
        urlVideo: "https://exemplo-de-link.com/yu-yu-hakusho-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/yu-yu-hakusho-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/yu-yu-hakusho-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/yu-yu-hakusho-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/yu-yu-hakusho-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/yu-yu-hakusho-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/yu-yu-hakusho-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/yu-yu-hakusho-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/yu-yu-hakusho-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/yu-yu-hakusho-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/yu-yu-hakusho-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/yu-yu-hakusho-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yu-yu-hakusho-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Your Lie in April",
    sinopse: "Kosei Arima, um prodígio do piano que parou de tocar após a morte de sua mãe, reencontra a paixão pela música ao conhecer a vibrante violinista Kaori Miyazono.",
    anoLancamento: 2014,
    classificacao: 8.6,
    idioma: "Legendado/Dublado",
    generos: ["Drama", "Música", "Romance", "Escolar", "Shonen"],
    imagemCapa: "/images/yourlie.jpg",
    trailerUrl: "https://www.youtube.com/embed/3aL0gDZtFbE",
    episodios: [
      {
        numero: 1,
        titulo: "Monótono/Colorido",
        urlVideo: "https://exemplo-de-link.com/your-lie-in-april-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/your-lie-in-april-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/your-lie-in-april-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/your-lie-in-april-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/your-lie-in-april-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/your-lie-in-april-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/your-lie-in-april-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/your-lie-in-april-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/your-lie-in-april-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/your-lie-in-april-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/your-lie-in-april-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/your-lie-in-april-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/your-lie-in-april-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Yuri!!! on Ice",
    sinopse: "Após uma derrota esmagadora, o patinador artístico Yuri Katsuki está prestes a desistir, mas sua vida muda quando seu ídolo, Victor Nikiforov, se oferece para ser seu treinador.",
    anoLancamento: 2016,
    classificacao: 7.9,
    idioma: "Legendado/Dublado",
    generos: ["Comédia", "Drama", "Esporte"],
    imagemCapa: "/images/yurionice.jpg",
    trailerUrl: "https://www.youtube.com/embed/5u3RGhznctE",
    episodios: [
      {
        numero: 1,
        titulo: "Fácil como um Pirozhki!! A Final do Grand Prix das Lágrimas",
        urlVideo: "https://exemplo-de-link.com/yuri-on-ice-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/yuri-on-ice-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/yuri-on-ice-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/yuri-on-ice-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/yuri-on-ice-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/yuri-on-ice-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/yuri-on-ice-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/yuri-on-ice-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/yuri-on-ice-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/yuri-on-ice-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/yuri-on-ice-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/yuri-on-ice-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/yuri-on-ice-ep-12-1080p.mp4" }
        ]
      }
    ]
  },

  // LETRA Z
  {
    titulo: "Zom 100: Bucket List of the Dead",
    sinopse: "Após seu trabalho sugar sua alma, Akira se sente vivo quando um apocalipse zumbi o liberta. Ele então decide criar uma lista de 100 coisas para fazer antes de virar zumbi.",
    anoLancamento: 2023,
    classificacao: 7.7,
    idioma: "Legendado/Dublado",
    generos: ["Ação", "Comédia", "Horror", "Sobrenatural", "Shonen"],
    imagemCapa: "/images/zom100.jpg",
    trailerUrl: "https://www.youtube.com/embed/l2l_w06J3I",
    episodios: [
      {
        numero: 1,
        titulo: "Akira da Morte",
        urlVideo: "https://exemplo-de-link.com/zom-100-bucket-list-of-the-dead-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/zom-100-bucket-list-of-the-dead-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/zom-100-bucket-list-of-the-dead-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/zom-100-bucket-list-of-the-dead-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/zom-100-bucket-list-of-the-dead-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/zom-100-bucket-list-of-the-dead-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/zom-100-bucket-list-of-the-dead-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/zom-100-bucket-list-of-the-dead-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/zom-100-bucket-list-of-the-dead-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/zom-100-bucket-list-of-the-dead-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/zom-100-bucket-list-of-the-dead-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/zom-100-bucket-list-of-the-dead-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zom-100-bucket-list-of-the-dead-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Zankyou no Terror (Terror in Resonance)",
    sinopse: "Dois adolescentes conhecidos como 'Sphinx' ameaçam destruir Tóquio com ataques terroristas, deixando enigmas para a polícia em uma corrida contra o tempo.",
    anoLancamento: 2014,
    classificacao: 8.1,
    idioma: "Legendado",
    generos: ["Mistério", "Psicológico", "Suspense"],
    imagemCapa: "/images/zankyou.jpg",
    trailerUrl: "https://www.youtube.com/embed/6l60g_3goW8",
    episodios: [
      {
        numero: 1,
        titulo: "Falling",
        urlVideo: "https://exemplo-de-link.com/zankyou-no-terror-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/zankyou-no-terror-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/zankyou-no-terror-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/zankyou-no-terror-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/zankyou-no-terror-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/zankyou-no-terror-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/zankyou-no-terror-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/zankyou-no-terror-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/zankyou-no-terror-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/zankyou-no-terror-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/zankyou-no-terror-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/zankyou-no-terror-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zankyou-no-terror-ep-12-1080p.mp4" }
        ]
      }
    ]
  },
  {
    titulo: "Zatch Bell!",
    sinopse: "Kiyo Takamine se junta a Zatch Bell, um mamodo, em uma batalha de 100 mamodos na Terra para determinar o próximo rei do Mundo Mamodo.",
    anoLancamento: 2003,
    classificacao: 7.8,
    idioma: "Legendado/Dublado",
    generos: ["Aventura", "Comédia", "Magia", "Shonen"],
    imagemCapa: "/images/zatchbell.jpg",
    trailerUrl: "https://www.youtube.com/embed/7kPUDG9jOJY",
    episodios: [
      {
        numero: 1,
        titulo: "O Garoto do Livro Vermelho",
        urlVideo: "https://exemplo-de-link.com/zatch-bell-ep-1",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-1-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-1-1080p.mp4" }
        ]
      },
      {
        numero: 2,
        titulo: "Episódio 2",
        urlVideo: "https://exemplo-de-link.com/zatch-bell-ep-2",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-2-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-2-1080p.mp4" }
        ]
      },
      {
        numero: 3,
        titulo: "Episódio 3",
        urlVideo: "https://exemplo-de-link.com/zatch-bell-ep-3",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-3-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-3-1080p.mp4" }
        ]
      },
      {
        numero: 4,
        titulo: "Episódio 4",
        urlVideo: "https://exemplo-de-link.com/zatch-bell-ep-4",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-4-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-4-1080p.mp4" }
        ]
      },
      {
        numero: 5,
        titulo: "Episódio 5",
        urlVideo: "https://exemplo-de-link.com/zatch-bell-ep-5",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-5-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-5-1080p.mp4" }
        ]
      },
      {
        numero: 6,
        titulo: "Episódio 6",
        urlVideo: "https://exemplo-de-link.com/zatch-bell-ep-6",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-6-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-6-1080p.mp4" }
        ]
      },
      {
        numero: 7,
        titulo: "Episódio 7",
        urlVideo: "https://exemplo-de-link.com/zatch-bell-ep-7",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-7-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-7-1080p.mp4" }
        ]
      },
      {
        numero: 8,
        titulo: "Episódio 8",
        urlVideo: "https://exemplo-de-link.com/zatch-bell-ep-8",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-8-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-8-1080p.mp4" }
        ]
      },
      {
        numero: 9,
        titulo: "Episódio 9",
        urlVideo: "https://exemplo-de-link.com/zatch-bell-ep-9",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-9-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-9-1080p.mp4" }
        ]
      },
      {
        numero: 10,
        titulo: "Episódio 10",
        urlVideo: "https://exemplo-de-link.com/zatch-bell-ep-10",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-10-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-10-1080p.mp4" }
        ]
      },
      {
        numero: 11,
        titulo: "Episódio 11",
        urlVideo: "https://exemplo-de-link.com/zatch-bell-ep-11",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-11-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-11-1080p.mp4" }
        ]
      },
      {
        numero: 12,
        titulo: "Episódio 12",
        urlVideo: "https://exemplo-de-link.com/zatch-bell-ep-12",
        tipoVideo: "iframe",
        downloads: [
          { qualidade: "720p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-12-720p.mp4" },
          { qualidade: "1080p", urlDownload: "https://exemplo-de-download.com/zatch-bell-ep-12-1080p.mp4" }
        ]
      }
    ]
  }
];

module.exports = animes;