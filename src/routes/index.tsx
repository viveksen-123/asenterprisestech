import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { siteCss, siteHtml } from "@/lib/site-content";
import managerImg from "@/assets/manager.jpg.asset.json";
import techImg from "@/assets/tech-expert.jpg.asset.json";
import devImg from "@/assets/developer.jpg.asset.json";

const html = siteHtml
  .replace("__IMG_ANKUSH__", techImg.url)
  .replace("__IMG_KRISHNA__", managerImg.url)
  .replace("__IMG_SACHIN__", devImg.url);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "AS ENTERPRISES - CP PLUS CCTV Camera Installation & Security Solutions | Bhopal",
      },
      {
        name: "description",
        content:
          "Professional CP PLUS CCTV camera installation, service & maintenance in Bhopal. HD/4K cameras, live mobile view, DVR/NVR setup for home, shop, office and factory.",
      },
      {
        name: "keywords",
        content:
          "CP PLUS CCTV Bhopal, AS Enterprises CCTV, Camera Installation Bhopal, Ankush Kumar Singh, Krishna Singh, Sachin Vishwakarma",
      },
      {
        property: "og:title",
        content: "AS ENTERPRISES - CP PLUS CCTV Camera Installation & Security Solutions | Bhopal",
      },
      {
        property: "og:description",
        content:
          "Professional CP PLUS CCTV camera installation, service & maintenance in Bhopal. HD/4K cameras, live mobile view, DVR/NVR setup for home, shop, office and factory.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    document.body.classList.add("lang-hi");

    const toggle = document.querySelector<HTMLElement>(".mobile-nav-toggle");
    const nav = document.querySelector<HTMLElement>(".nav-links");
    const onToggle = () => nav?.classList.toggle("mobile-open");
    const onNavClick = () => nav?.classList.remove("mobile-open");
    toggle?.addEventListener("click", onToggle);
    nav?.querySelectorAll("a").forEach((a) => a.addEventListener("click", onNavClick));

    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const onAnchor = (e: Event) => {
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
      const el = href ? document.querySelector(href) : null;
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    anchors.forEach((a) => a.addEventListener("click", onAnchor));

    const slider = document.getElementById("camCountSlider") as HTMLInputElement | null;
    const badge = document.getElementById("camValBadge");
    const price = document.getElementById("calcEstPrice");
    const rec = document.getElementById("calcRecSummary");
    const dvr = document.getElementById("calcDvrSummary");
    const update = () => {
      if (!slider) return;
      const n = +slider.value;
      if (badge) badge.textContent = `${n} Cams`;
      if (rec) rec.textContent = `${n} x CP PLUS HD Night-Vision Cams (HOME)`;
      if (dvr) dvr.textContent = `${n}-Channel CP PLUS Smart DVR`;
      if (price)
        price.textContent = `₹ ${n === 4 ? "16,700" : (12000 + n * 1100).toLocaleString("en-IN")}*`;
    };
    slider?.addEventListener("input", update);
    update();

    const optCards = Array.from(document.querySelectorAll<HTMLElement>(".opt-card"));
    const onOpt = (e: Event) => {
      const c = e.currentTarget as HTMLElement;
      optCards.forEach((x) => x.classList.remove("selected"));
      c.classList.add("selected");
      const p = c.dataset["prop"] || "home";
      if (rec)
        rec.textContent = `${slider ? slider.value : 4} x CP PLUS HD Night-Vision Cams (${p.toUpperCase()})`;
    };
    optCards.forEach((c) => c.addEventListener("click", onOpt));

    const form = document.getElementById("asContactForm") as HTMLFormElement | null;
    const onSubmit = (e: Event) => {
      e.preventDefault();
      const val = (id: string) =>
        (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null)?.value || "";
      const text = `Hello AS ENTERPRISES!\nName: ${val("formName")}\nPhone: ${val("formPhone")}\nService: ${val("formService")}\nMessage: ${val("formMessage")}`;
      window.location.href = `https://wa.me/917007937097?text=${encodeURIComponent(text)}`;
    };
    form?.addEventListener("submit", onSubmit);

    return () => {
      toggle?.removeEventListener("click", onToggle);
      nav?.querySelectorAll("a").forEach((a) => a.removeEventListener("click", onNavClick));
      anchors.forEach((a) => a.removeEventListener("click", onAnchor));
      slider?.removeEventListener("input", update);
      optCards.forEach((c) => c.removeEventListener("click", onOpt));
      form?.removeEventListener("submit", onSubmit);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: siteCss }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
