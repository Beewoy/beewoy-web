export const schoolConfig = {
  name: "AUTOŠKOLA NOVA",
  shortName: "NOVA",
  slogan: "Tvoj vodičák. Tvoja cesta.",
  city: "Bratislava",
  locations: ["Bratislava"],
  colors: { dark: "#111827", accent: "#c8ff3d", background: "#ffffff" },
  logo: "/logo.svg",
  contact: {
    phoneDisplay: "+421 900 000 000",
    phoneHref: "+421900000000",
    email: "ahoj@autoskola-nova.example",
    address: "Presná adresa v deme nie je uvedená",
    hours: "Po – Pia / podľa dohody",
  },
  social: [] as { label: string; url: string }[],
} as const;
