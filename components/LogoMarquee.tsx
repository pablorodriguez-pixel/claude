import Image from "next/image";

export type Logo = { src: string; alt: string; width: number; height: number };

/**
 * Prueba social temprana. Las imágenes llevan width/height explícitos: es la
 * deuda de CLS más repetida del corpus actual (65 de 66 imágenes en
 * /maic-dossier van sin dimensiones).
 */
export default function LogoMarquee({ logos }: { logos: Logo[] }) {
  const track = (
    <div className="fz-marquee__track" aria-hidden="false">
      {logos.map((l) => (
        <Image
          key={l.src}
          src={l.src}
          alt={l.alt}
          width={l.width}
          height={l.height}
          loading="lazy"
        />
      ))}
    </div>
  );
  return (
    <div className="fz-marquee">
      {track}
      <div className="fz-marquee__track" aria-hidden="true">
        {logos.map((l) => (
          <Image
            key={`dup-${l.src}`}
            src={l.src}
            alt=""
            width={l.width}
            height={l.height}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
