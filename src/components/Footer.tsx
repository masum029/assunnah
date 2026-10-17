import Link from "next/link";
import data from "@/data/homepage.json";

export default function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer-main">
      <div className="footer-brand-col"><Link className="footer-brand" href="/"><img src={data.site.logo} alt="মাদরাসাতুস সুন্নাহ লোগো" /><strong>{data.site.name}</strong></Link><p>{data.site.footerDescription}</p><div className="social-links">{data.site.socials.map((social) => <a href={social.url} key={social.label} aria-label={social.label} target="_blank" rel="noreferrer">{social.icon}</a>)}</div></div>
      <div className="footer-column"><h3>গুরুত্বপূর্ণ লিংক</h3>{data.footerLinks.map((link) => <a href={link.url} key={link.label}>{link.label} <span>↗</span></a>)}</div>
      <div className="footer-column"><h3>যোগাযোগ</h3><a href={`tel:${data.site.phone.replaceAll(" ", "")}`}>☎ {data.site.phone}</a><a href={`mailto:${data.site.email}`}>✉ {data.site.email}</a><p>{data.site.address}</p><a href={data.site.mapUrl} target="_blank" rel="noreferrer">ম্যাপে দেখুন ↗</a></div>
    </div>
    <div className="footer-bottom"><div className="wrap footer-bottom-inner"><span>© {data.site.copyrightYear} {data.site.name} — সর্বস্বত্ব সংরক্ষিত।</span><div>{data.legalLinks.map((link) => <a href={link.url} key={link.label}>{link.label}</a>)}</div></div></div>
  </footer>;
}
