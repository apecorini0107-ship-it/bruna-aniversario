export type Destination = {
  id: string;
  badge?: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  link?: {
    label: string;
    url: string;
  };
  images: string[];
};

export const destinations: Destination[] = [
  {
    id: "romont",
    emoji: "🌲",
    title: "Uma noite nas árvores",
    subtitle: "Bivouac dans les arbres — região de Romont, Suíça",
    description:
      "Uma noite diferente no meio da natureza, dormindo em um pequeno bivouac suspenso entre as árvores ou sobre o rio. Um lugar tranquilo, simples e especial para desconectar de tudo e aproveitar uma noite só nossa.",
    bullets: [
      "Região de Romont / Villarimboud",
      "Bivouacs suspensos entre as árvores ou sobre o rio",
      "Café da manhã disponível conforme a formula escolhida",
      "Uma experiência atípica, cercada de natureza",
    ],
    link: {
      label: "Ver o site",
      url: "https://fribourg.ch/fr/romontregion/hebergements-insolites/bivouacs-dans-les-arbres/",
    },
    images: [
      "/images/romont/cover.jpg",
      "/images/romont/01.jpg",
      "/images/romont/02.jpg",
      "/images/romont/03.jpg",
    ],
  },
  {
    id: "chamonix",
    emoji: "🏔️",
    title: "Uma cabana perto de Chamonix",
    subtitle: "Les Cabanes du Mont Blanc — Passy, Haute-Savoie",
    description:
      "Uma pequena cabana de madeira no meio da natureza, perto de Chamonix e das montanhas. Dois dias para desacelerar, acordar juntos com vista para os Alpes e aproveitar um cantinho só nosso.",
    bullets: [
      "Passy, Haute-Savoie — perto de Chamonix e do Mont-Blanc",
      "Cabana estilo \"Trappeur\", construída sobre pilotis",
      "Café da manhã incluído",
      "Estadia de 2 noites para duas pessoas",
    ],
    link: {
      label: "Ver o site",
      url: "https://www.smartbox.com/ch/fr/nos-smartbox/sejour/2-nuits-insolites-en-cabane-pres-de-chamonix-mont-blanc-1581163.html",
    },
    images: [
      "/images/chamonix/cover.jpg",
      "/images/chamonix/01.jpg",
      "/images/chamonix/02.jpg",
      "/images/chamonix/03.jpg",
    ],
  },
  {
    id: "custom",
    badge: "Você escolhe o destino",
    emoji: "💕",
    title: "Um pequeno refúgio... onde você quiser",
    subtitle: "Destino surpresa",
    description:
      "Uma noite em um pequeno cantinho romântico escolhido especialmente para nós. Pode ser nas montanhas, perto de um lago, em uma cabana, em um tiny house ou em qualquer lugar que faça você sonhar.",
    bullets: ["Você escolhe o estilo... e eu cuido do resto. ❤️"],
    images: ["/images/custom/cover.jpg"],
  },
];
