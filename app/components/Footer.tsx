import { Footer as DaisyFooter } from "react-daisyui";

export const Footer = () => (
  <DaisyFooter className="p-10 bg-neutral text-neutral-content">
    <div>
      <h5 className="text-base font-bold">Salen samfällighetsförening</h5>
    </div>
    <div>
      <DaisyFooter.Title>Länkar</DaisyFooter.Title>
      <a className="link link-hover" href="https://driftinfo.umeaenergi.se/">
        Umeå Energi driftinfo
      </a>
      <a className="link link-hover" href="Återvinningscentralernas öppettider">
        Vakin
      </a>
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
