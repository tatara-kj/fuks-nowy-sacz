"use client";

import { useEffect, useRef, useState } from "react";
import { contact } from "@/data/site";

const minimumPluginWidth = 180;
const maximumPluginWidth = 500;

export function FacebookFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameWidth, setFrameWidth] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function updateWidth(width: number) {
      const nextWidth = Math.min(maximumPluginWidth, Math.max(minimumPluginWidth, Math.floor(width)));
      setFrameWidth((currentWidth) => currentWidth !== null && Math.abs(currentWidth - nextWidth) < 8 ? currentWidth : nextWidth);
    }

    updateWidth(container.getBoundingClientRect().width);
    if (!("ResizeObserver" in window)) return;

    const observer = new ResizeObserver(([entry]) => updateWidth(entry.contentRect.width));
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const frameSrc = frameWidth === null ? null : `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(contact.facebook)}&tabs=timeline&width=${frameWidth}&height=720&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`;

  return (
    <section className="facebook-feed" aria-labelledby="facebook-feed-title">
      <div className="facebook-feed__header">
        <span id="facebook-feed-title"><i aria-hidden="true" /> Aktualności na żywo</span>
        <small>automatycznie z Facebooka</small>
      </div>
      <div className="facebook-feed__viewport" ref={containerRef}>
        {frameSrc ? (
          <iframe
            key={frameWidth}
            title="Najnowsze aktualności FUKS na Facebooku"
            src={frameSrc}
            width={frameWidth ?? maximumPluginWidth}
            height="720"
            loading="lazy"
            allow="encrypted-media; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="facebook-feed__skeleton" aria-hidden="true"><span /><span /><span /></div>
        )}
      </div>
      <p>Nowe posty pojawią się tutaj automatycznie po publikacji na oficjalnym profilu. Gdy Facebook lub bloker prywatności nie pozwoli wyświetlić osi czasu, poniższe wyróżnione wpisy nadal pozostaną dostępne.</p>
    </section>
  );
}
