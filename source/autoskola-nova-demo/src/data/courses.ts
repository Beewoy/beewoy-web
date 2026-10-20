export type Course = {
  id: string;
  name: string;
  shortName: string;
  eyebrow: string;
  price: string;
  priceNote: string;
  description: string;
  detail: string;
  href: string;
  image: string;
  imageAlt: string;
  features: string[];
  includes: string[];
};

export const courses: Course[] = [
  {
    id: "skupina-b",
    name: "Vodičský kurz skupiny B",
    shortName: "Skupina B",
    eyebrow: "Vodičský kurz",
    price: "1 090 €",
    priceNote: "od",
    description:
      "Jeden kurz skupiny B. Pri prihláške si vyberieš manuál alebo automat.",
    detail:
      "Vyber si začiatok kurzu a potom vozidlo, na ktorom chceš absolvovať výcvik. Dostupnosť ti potvrdí autoškola.",
    href: "/kurzy/skupina-b/",
    image: "/images/interior.jpg",
    imageAlt: "Ilustračný pohľad do výcvikového auta s manuálnou prevodovkou",
    features: ["Manuál alebo automat", "Jazdy v meste", "Príprava na skúšku"],
    includes: [
      "Teoretická príprava",
      "Praktický výcvik s inštruktorom",
      "Príprava na záverečnú skúšku",
    ],
  },
  {
    id: "intenzivny-b",
    name: "Intenzívny kurz skupiny B",
    shortName: "Intenzívny B",
    eyebrow: "Keď chceš jazdiť častejšie",
    price: "1 390 €",
    priceNote: "od",
    description:
      "Hustejší plán teórie a jázd pre tých, ktorí chcú výcviku venovať viac času naraz.",
    detail:
      "Kurz skupiny B s intenzívnejším plánom výučby a jázd. Konkrétny rozvrh a dostupnosť by potvrdila autoškola.",
    href: "/kurzy/intenzivny-b/",
    image: "/images/hero-car-school.jpg",
    imageAlt: "Ilustračné výcvikové auto s označením autoškola",
    features: ["Častejšie jazdy", "Manuál alebo automat", "Plán podľa dohody"],
    includes: [
      "Teoretická príprava",
      "Praktický výcvik s hustejším rozvrhom",
      "Príprava na záverečnú skúšku",
    ],
  },
  {
    id: "kondicne-jazdy",
    name: "Kondičné jazdy",
    shortName: "Kondičné jazdy",
    eyebrow: "Návrat za volant",
    price: "35 € / jazda",
    priceNote: "od",
    description:
      "Získaj späť istotu pri parkovaní, v premávke alebo na novej trase.",
    detail:
      "Individuálna jazda zameraná na situácie, ktoré si chceš bezpečne precvičiť.",
    href: "/kondicne-jazdy/",
    image: "/images/lesson.jpg",
    imageAlt: "Ilustračný záber inštruktora a vodičky počas výcviku",
    features: ["Vlastné tempo", "Manuál alebo automat", "Konkrétne situácie"],
    includes: [
      "Úvodný rozhovor o cieľoch",
      "Jazda s inštruktorom",
      "Spätná väzba po jazde",
    ],
  },
  {
    id: "individualny-vycvik",
    name: "Individuálny výcvik",
    shortName: "Individuálny",
    eyebrow: "Výcvik podľa teba",
    price: "Na vyžiadanie",
    priceNote: "",
    description: "Tempo a organizáciu výcviku prispôsobíme tvojim možnostiam.",
    detail:
      "Ukážka individuálnej ponuky, ktorej konkrétny rozsah by sa dohodol s autoškolou.",
    href: "/kontakt/?tema=individualny-vycvik",
    image: "/images/interior.jpg",
    imageAlt: "Ilustračný interiér výcvikového auta",
    features: ["Osobný plán", "Flexibilné termíny", "Priamy kontakt"],
    includes: [
      "Konzultácia potrieb",
      "Návrh výcvikového plánu",
      "Individuálne dohodnutý rozsah",
    ],
  },
];

export const getCourse = (id: string) =>
  courses.find((course) => course.id === id);
