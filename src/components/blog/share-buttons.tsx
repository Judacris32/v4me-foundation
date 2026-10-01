"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Link2 } from "lucide-react";

/** Share to WhatsApp, Facebook, X and LinkedIn, plus copy link. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const targets = [
    { label: "WhatsApp", icon: "/images/icons/social/whatsapp.png", href: `https://wa.me/?text=${t}%20${u}` },
    { label: "Facebook", icon: "/images/icons/social/facebook.png", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "X", icon: "/images/icons/social/x-twitter.png", href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { label: "LinkedIn", icon: "/images/icons/social/linkedin.png", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked, ignore */
    }
  }

  const base =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-accent-400";

  return (
    <div className="flex items-center gap-2.5">
      {targets.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${s.label}`} className={base}>
          <Image src={s.icon} alt="" aria-hidden="true" width={40} height={40} className="h-5 w-5 object-contain" />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" className={`${base} text-primary-950`}>
        {copied ? <Check className="h-5 w-5 text-primary-600" /> : <Link2 className="h-5 w-5" />}
      </button>
    </div>
  );
}
