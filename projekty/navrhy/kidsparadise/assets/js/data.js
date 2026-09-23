window.KP = window.KP || {};

KP.social = {
  instagram: "https://www.instagram.com/materskaskolakidsparadise/",
  facebook: "https://www.facebook.com/kidsparadise.sk/"
};

KP.logo = "https://www.kidsparadise.sk/engine/wp-content/themes/kidsparadise/images/logo-kids-paradise.png";

KP.branches = {
  petrzalka: {
    id: "petrzalka",
    name: "Kids Paradise Petržalka",
    shortName: "Petržalka",
    page: "petrzalka.html",
    addressLines: ["Vyšehradská 12 a 18", "851 06 Bratislava – Petržalka"],
    phone: "0908 036 888",
    phoneHref: "tel:+421908036888",
    email: "vysehradska@kidsparadise.sk",
    mapQuery: "Vyšehradská+12,+Bratislava",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Vy%C5%A1ehradsk%C3%A1+12,+Bratislava",
    heroImage: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/petrzalka_exterier_4.jpg",
    galleryPrefix: "petrzalka"
  },
  ruzinov: {
    id: "ruzinov",
    name: "Kids Paradise Ružinov",
    shortName: "Ružinov",
    page: "ruzinov.html",
    addressLines: ["Martinčekova 13", "821 01 Bratislava – Ružinov"],
    phone: "0905 677 964",
    phoneHref: "tel:+421905677964",
    email: "stanislava.slovakova@kidsparadise.sk",
    mapQuery: "Martinčekova+13,+Bratislava",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Martin%C4%8Dekova+13,+Bratislava",
    heroImage: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/ruzinov_ostatne_6.jpg",
    galleryPrefix: "ruzinov"
  }
};

KP.mealCancel = {
  petrzalka: { phone: "0908 064 525", phoneHref: "tel:+421908064525" },
  ruzinov: { phone: "0907 149 840", phoneHref: "tel:+421907149840" },
  note: "Odhlásenie stravy SMS alebo telefonicky do 7:20."
};

KP.pricing = {
  from: 399,
  year: "2026/2027",
  plans: [
    {
      tag: "Flexibilne",
      title: "3 dni / poldenná",
      desc: "Celodenná 3 dni v týždni alebo poldenná počas celého týždňa",
      price: 399,
      featured: false,
      points: ["Bez ohľadu na vek", "Flexibilnejšia dochádzka"]
    },
    {
      tag: "Najčastejšia voľba",
      title: "Celodenná od 3 rokov",
      desc: "Celodenná forma počas celého týždňa",
      price: 449,
      featured: true,
      points: ["Deti od 3 rokov", "Pondelok – piatok"]
    },
    {
      tag: "Mladšie deti",
      title: "Do 3 rokov / plienky",
      desc: "Celodenná forma počas celého týždňa",
      price: 489,
      featured: false,
      points: ["Do 3 rokov", "Alebo nad 3 roky s plienkami"]
    },
    {
      tag: "Predškoláci",
      title: "Predškolák Plus",
      desc: "Program pre deti plniace povinné predprimárne vzdelávanie",
      price: 489,
      featured: false,
      points: ["Deti 5–6 rokov", "Povinné predprimárne vzdelávanie"]
    }
  ],
  extras: {
    meals: "5,8 € / deň — podľa dochádzky po ukončení mesiaca",
    clubs: "32–35 € / mesiac",
    yearDiscount: "20 € / mesiac pri ročnej úhrade vopred",
    siblingDiscount: "25 € / mesiac",
    registration: "10 € jednorazovo"
  }
};

KP.documents = [
  {
    title: "Prihláška na vzdelávanie v materskej škole",
    href: "https://www.kidsparadise.sk/engine/wp-content/uploads/2026/03/prihlaska-na-vzdelavanie-v-materskej-skole.pdf",
    note: "PDF na stiahnutie"
  },
  {
    title: "Potvrdenie o zdravotnej spôsobilosti",
    href: "https://www.kidsparadise.sk/engine/wp-content/uploads/2026/03/potvrdenie-o-zdravotnej-sposobilosti.pdf",
    note: "PDF na stiahnutie"
  }
];

KP.gallery = [
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/petrzalka_interier_1.jpg", alt: "Interiér Petržalka", branch: "petrzalka", type: "interier" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/petrzalka_interier_3.jpg", alt: "Trieda Petržalka", branch: "petrzalka", type: "interier" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/petrzalka_interier_5.jpg", alt: "Priestory triedy Petržalka", branch: "petrzalka", type: "interier" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/petrzalka_interier_6.jpg", alt: "Trieda Petržalka", branch: "petrzalka", type: "interier" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/petrzalka_exterier_1.jpg", alt: "Ihrisko Petržalka", branch: "petrzalka", type: "ihrisko" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/petrzalka_exterier_2.jpg", alt: "Exteriér Petržalka", branch: "petrzalka", type: "ihrisko" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/petrzalka_exterier_4.jpg", alt: "Ihrisko Petržalka", branch: "petrzalka", type: "ihrisko" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/petrzalka_exterier_5.jpg", alt: "Exteriér Petržalka", branch: "petrzalka", type: "ihrisko" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/ruzinov_ostatne_1.jpg", alt: "Priestory Ružinov", branch: "ruzinov", type: "interier" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/ruzinov_ostatne_2.jpg", alt: "Priestory Ružinov", branch: "ruzinov", type: "interier" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/ruzinov_ostatne_4.jpg", alt: "Priestory Ružinov", branch: "ruzinov", type: "interier" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/ruzinov_ostatne_5.jpg", alt: "Priestory Ružinov", branch: "ruzinov", type: "interier" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/ruzinov_ostatne_6.jpg", alt: "Priestory Ružinov", branch: "ruzinov", type: "interier" },
  { src: "https://www.kidsparadise.sk/engine/wp-content/uploads/2022/01/ruzinov_ostatne_3.jpg", alt: "Priestory Ružinov", branch: "ruzinov", type: "interier" }
];
