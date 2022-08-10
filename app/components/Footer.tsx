import { Footer as DaisyFooter } from "react-daisyui";

export const Footer = () => (
  <DaisyFooter className="p-10 bg-neutral text-neutral-content">
    <div>
      <h5 className="text-base font-bold">Salen samfällighetsförening</h5>
    </div>
    <div>
      <DaisyFooter.Title>Länkar</DaisyFooter.Title>
      {[
        {
          text: "Umeå Energi driftinfo",
          key: "umea-energi",
          href: "https://driftinfo.umeaenergi.se/",
        },
        {
          text: "Återvinningscentralernas öppettider",
          key: "vakin-oppettider",
          href: "https://www.vakin.se/tjansterochabonnemang/lamnaavfall/oppettider.4.682b00ae16206de094712b0e.htmder",
        },
      ].map(({ text, key, href }) => (
        <a key={key} className="link link-hover" href={href} target="_blank" rel="noreferrer">
          {text}
        </a>
      ))}
    </div>
    <div>
      <DaisyFooter.Title>Ser något fel ut?</DaisyFooter.Title>
      <a
        className="link link-hover"
        href={`mailto:mail@rickardlindahl.com?subject=${encodeURIComponent(
          "Buggrapport Salen samfällighetsförening",
        )}&body=${"Hej! Jag skulle vilja rapportera en bugg på hemsidan."}`}
      >
        Rapportera en bugg
      </a>
    </div>
  </DaisyFooter>
);
