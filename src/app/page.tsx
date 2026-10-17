"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import data from "@/data/homepage.json";
import sliderData from "@/data/slider.json";

export default function HomePage(){
  const h=data.homepage;
  const slides = sliderData.slides;
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActiveSlide(current => (current + 1) % slides.length), 5500); return () => window.clearInterval(timer); }, [slides.length]);
  useEffect(() => {
    const nodes = document.querySelectorAll(".scroll-reveal");
    if (!("IntersectionObserver" in window)) { nodes.forEach(node => node.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  const slide = slides[activeSlide];
  return <><style jsx global>{`
    .scroll-reveal{opacity:0;transform:translate3d(0,32px,0);transition:opacity .8s cubic-bezier(.2,.65,.3,1),transform .8s cubic-bezier(.2,.65,.3,1);will-change:opacity,transform}
    .scroll-reveal.is-visible{opacity:1;transform:translate3d(0,0,0)}
    .important-updates-scroll{display:flex;min-width:0;max-width:100%;overflow:hidden!important;scrollbar-width:none!important;gap:12px;mask-image:linear-gradient(90deg,transparent,#000 2%,#000 98%,transparent)}
    .important-updates-scroll::-webkit-scrollbar{display:none!important}
    .important-updates-track{display:flex;flex:0 0 auto;gap:12px;width:max-content;max-width:none;animation:updatesMarquee 38s linear infinite}
    .important-updates-scroll:hover .important-updates-track,.important-updates-scroll:focus-within .important-updates-track{animation-play-state:paused}
    @keyframes updatesMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @media(prefers-reduced-motion:reduce){.scroll-reveal{opacity:1;transform:none;transition:none}.important-updates-track{animation:none}}
  

      .reference-slider{width:100%;max-width:100%;padding:0;margin:0;background:#eef8f4;overflow:clip;contain:paint;}
    html,body{max-width:100%;overflow-x:clip;}
      .reference-hero-image{position:relative;width:100%;max-width:100%;min-width:0;min-height:clamp(520px,calc(100vh - 90px),820px);width:100%;background-position:center;background-size:cover;background-repeat:no-repeat;display:flex;align-items:center;animation:none;overflow:hidden;}
      .reference-hero-content{width:min(1180px,calc(100% - 64px));margin:0 auto;color:#fff;padding:64px 0 90px;position:relative;z-index:1;}
      .reference-eyebrow{display:inline-block;color:#b8f4df;font-size:14px;font-weight:700;letter-spacing:.03em;margin-bottom:12px;}
      .reference-hero-content h1{font-size:clamp(32px,4.1vw,58px);line-height:1.45;max-width:650px;margin:0 0 18px;color:#fff;font-weight:800;text-shadow:0 2px 18px #001d16a8;}
      .reference-hero-content p{font-size:clamp(15px,1.25vw,18px);line-height:2;max-width:620px;color:#f1faf6;margin:0 0 26px;text-shadow:0 1px 8px #001d1680;}
      .reference-hero-content :global(.button){display:inline-flex;align-items:center;padding:12px 22px;font-size:15px;border-radius:6px;}
      .reference-slider-controls{position:absolute;left:50%;bottom:34px;transform:translateX(-50%);display:flex;align-items:center;gap:9px;z-index:2;}
      .reference-slider-controls button{border:1px solid #ffffff9c;cursor:pointer;width:12px;height:12px;border-radius:50%;background:#ffffffa8;color:#075643;font-size:18px;display:inline-flex;align-items:center;justify-content:center;padding:0;transition:all .25s ease;}
      .reference-slider-controls button:first-child,.reference-slider-controls button:last-child{width:32px;height:32px;background:#ffffffeb;border-color:transparent;font-size:25px;}
      .reference-slider-controls button.active{background:#0bb29a;border-color:#fff;width:27px;border-radius:12px;}
      .hero-scroll-hint{position:absolute;right:28px;bottom:28px;display:flex;align-items:center;gap:9px;color:#fff;font-size:12px;opacity:.9;writing-mode:vertical-rl;z-index:2;}
      .hero-scroll-hint span{display:block;width:1px;height:35px;background:#ffffffb3;}
      .hero-bg-layer{position:absolute;inset:0;z-index:0;background-position:center;background-size:cover;background-repeat:no-repeat;opacity:0;transition:opacity 1.2s ease-in-out;}
      .hero-bg-layer.is-active{opacity:1;}
      .reference-hero-content{animation:heroTextIn .9s ease both;}
      @keyframes heroTextIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      @media(max-width:650px){.hero-bg-layer{background-position:58% center}}
      @media(prefers-reduced-motion:reduce){.hero-bg-layer{transition:none}.reference-hero-content{animation:none}}
      
      @media(max-width:650px){.reference-hero-image{min-height:calc(100svh - 76px);background-position:58% center}.reference-hero-content{width:calc(100% - 36px);padding:48px 0 88px}.reference-hero-content h1{font-size:30px;line-height:1.55}.reference-hero-content p{font-size:14px;line-height:1.9}.reference-slider-controls{bottom:22px}.hero-scroll-hint{display:none}}
    

      .important-updates-section{padding:28px 0;background:#fff;border-bottom:1px solid #e4eee9;}
      .important-updates-inner{max-width:1180px;}
      .important-updates-heading{display:flex;align-items:center;gap:12px;margin-bottom:15px;}
      .updates-mark{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:10px;background:#e6f7f0;color:#08745b;font-size:20px;}
      .important-updates-heading .section-kicker{margin-bottom:2px;}
      .important-updates-heading h2{font-size:22px;line-height:1.4;margin:0;color:#114c3e;}
      .important-updates-heading>a{margin-left:auto;color:#08745b;text-decoration:none;font-weight:700;font-size:13px;white-space:nowrap;}
      .important-updates-scroll{display:flex;gap:12px;overflow:hidden;padding:2px 0 12px;}
      .important-update-item{flex:0 0 clamp(230px,27%,320px);min-height:105px;display:flex;flex-direction:column;gap:7px;position:relative;padding:15px 17px;background:#fff;border:1px solid #dce9e4;border-radius:12px;color:#243e36;text-decoration:none;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease;}
      .important-update-item:hover{transform:translateY(-3px);border-color:#9acfc0;box-shadow:0 8px 22px #0b634510;}
      .update-date{font-size:12px;color:#829b92;}.important-update-item strong{font-size:14px;line-height:1.75;padding-right:14px;}.update-arrow{position:absolute;right:14px;bottom:13px;color:#08745b;font-size:15px;}
      @media(max-width:650px){.important-updates-section{padding:22px 0}.important-updates-heading h2{font-size:19px}.important-updates-heading>a{font-size:11px}.important-update-item{flex-basis:78%;min-height:100px}}
    
`}</style><section className="reference-slider" aria-label="প্রধান স্লাইডার">
    <div className="reference-hero-image" role="img" aria-label={slide.alt}>
      {slides.map((item, index) => <div key={`${item.image}-${index}`} className={index === activeSlide ? "hero-bg-layer is-active" : "hero-bg-layer"} style={{ backgroundImage: `linear-gradient(90deg, rgba(3,35,27,.72) 0%, rgba(3,35,27,.36) 45%, rgba(3,35,27,.05) 100%), url("${item.image}")` }} aria-hidden="true" />)}
      <div className="reference-hero-content" key={activeSlide}><span className="reference-eyebrow">{slide.eyebrow}</span><h1>{slide.title}</h1><p>{slide.description}</p><a className="button button-primary" href={slide.primaryLink}>{slide.primaryLabel} ↗</a></div>
      <div className="reference-slider-controls"><button type="button" aria-label="আগের স্লাইড" onClick={() => setActiveSlide(current => (current - 1 + slides.length) % slides.length)}>‹</button>{slides.map((item, index) => <button key={item.title} type="button" className={index === activeSlide ? "active" : ""} aria-label={`স্লাইড ${index + 1}`} onClick={() => setActiveSlide(index)} />)}<button type="button" aria-label="পরের স্লাইড" onClick={() => setActiveSlide(current => (current + 1) % slides.length)}>›</button></div>
      <div className="hero-scroll-hint"><span></span>নিচে স্ক্রল করুন</div>
    </div>
    
  </section>
<section className="important-updates-section scroll-reveal"><div className="wrap important-updates-inner"><div className="important-updates-heading"><span className="updates-mark">▤</span><div><div className="section-kicker">সর্বশেষ তথ্য</div><h2>গুরুত্বপূর্ণ আপডেট</h2></div><Link href="/notice">সকল নোটিশ দেখুন ↗</Link></div><div className="important-updates-scroll" aria-label="গুরুত্বপূর্ণ আপডেট তালিকা"><div className="important-updates-track">{[...data.announcements,...data.announcements].map((n,i)=><a className="important-update-item" href={n.url} key={`${n.id}-${i}`}><span className="update-date">{n.date}</span><strong>{n.title}</strong><span className="update-arrow">↗</span></a>)}</div></div></div></section>
<section className="section wrap intro-section scroll-reveal"><div className="section-kicker">{h.about.kicker}</div><div className="intro-grid"><div><h2>{h.about.title}</h2><p className="lead">{h.about.description}</p><Link className="text-link" href="/about">{h.about.linkLabel} ↗</Link></div><div className="stats-card">{h.about.stats.map(s=><div className="stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div></div></section>
<section className="section features-section scroll-reveal"><div className="wrap"><div className="section-heading"><div><div className="section-kicker">{h.features.kicker}</div><h2>{h.features.title}</h2></div><p>{h.features.description}</p></div><div className="feature-grid">{h.features.items.map((item,i)=><article className="feature-card" key={item.title}><div className={`feature-icon feature-icon-${i+1}`}>{item.icon}</div><span className="feature-number">{String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.description}</p><a href={item.url}>আরও দেখুন ↗</a></article>)}</div></div></section>
<section className="section wrap facilities-section scroll-reveal"><div className="facility-photo"><img src={h.facilities.image} alt={h.facilities.imageAlt}/><div className="photo-caption"><span>⌂</span><div><strong>{h.facilities.photoTitle}</strong><small>{h.facilities.photoSubtitle}</small></div></div></div><div className="facility-copy"><div className="section-kicker">{h.facilities.kicker}</div><h2>{h.facilities.title}</h2><p className="lead">{h.facilities.description}</p><div className="facility-list">{h.facilities.items.map(i=><div className="facility-item" key={i.title}><span className="check">✓</span><div><h3>{i.title}</h3><p>{i.description}</p></div></div>)}</div><Link className="button button-primary" href="/campus">অন্যান্য সুযোগ-সুবিধাসমূহ ↗</Link></div></section>
<section className="quote-section scroll-reveal"><div className="wrap quote-inner"><div className="quote-mark">“</div><div><div className="section-kicker">{h.quote.kicker}</div><blockquote>{h.quote.text}</blockquote><div className="quote-author"><img src={h.quote.image} alt={h.quote.name}/><div><strong>{h.quote.name}</strong><span>{h.quote.role}</span></div></div></div><div className="quote-decoration">۞</div></div></section>
<section className="section wrap contact-info-section scroll-reveal"><div className="section-heading"><div><div className="section-kicker">যোগাযোগ</div><h2>আমাদের সাথে যোগাযোগ</h2></div><p>আপনার যেকোনো প্রশ্ন, পরামর্শ বা সহযোগিতার জন্য যোগাযোগ করুন।</p></div><div className="contact-info-grid"><article><span className="contact-symbol">☎</span><h3>ফোন করুন</h3><a href={`tel:${data.site.phone.replaceAll(' ','')}`}>{data.site.phone}</a><p>{data.site.addressHours}</p></article><article><span className="contact-symbol">✉</span><h3>ইমেইল পাঠান</h3><a href={`mailto:${data.site.email}`}>{data.site.email}</a><p>আপনার প্রশ্ন বা ফিডব্যাক পাঠান</p></article><article><span className="contact-symbol">⌖</span><h3>আমাদের অবস্থান</h3><p>{data.site.address}</p><a href={data.site.mapUrl} target="_blank" rel="noreferrer">ম্যাপে দেখুন ↗</a></article></div></section>
<section className="section branches-section scroll-reveal"><div className="wrap"><div className="section-heading"><div><div className="section-kicker">{h.branches.kicker}</div><h2>{h.branches.title}</h2></div><Link className="text-link" href="/branch">সব শাখা দেখুন ↗</Link></div><div className="branch-grid">{data.branches.map(b=><article className="branch-card" key={b.name}><div className="branch-top"><span className="branch-icon">⌖</span><span className="branch-tag">{b.tag}</span></div><h3>{b.name}</h3><p>{b.address}</p><div className="branch-contact"><a href={`mailto:${b.email}`}>{b.email}</a><a href={`tel:${b.phone.replaceAll(' ','')}`}>{b.phone} ({b.phoneNote})</a></div><a href={b.url}>শাখার তথ্য →</a></article>)}</div></div></section>
<section className="contact-cta scroll-reveal"><div className="wrap contact-inner"><div><div className="section-kicker">{h.cta.kicker}</div><h2>{h.cta.title}</h2><p>{h.cta.description}</p></div><div className="contact-actions"><a className="button button-white" href={`tel:${data.site.phone.replaceAll(' ','')}`}>☎ {h.cta.phoneLabel}</a><Link className="button button-outline-white" href="/contact">{h.cta.contactLabel} ↗</Link></div></div></section></>}
