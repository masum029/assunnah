import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import data from "@/data/homepage.json";
import feeData from "@/data/fees.json";
import galleryData from "@/data/gallery.json";
import pages from "@/data/pages.json";
import teacherData from "@/data/teachers.json";

type Page = {
  path: string;
  title: string;
  subtitle?: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
  noticeList?: boolean;
  sections: { heading: string; body?: string }[];
};

type FeeItem = {
  category: string;
  name: string;
  frequency: string;
  amount: number | null;
  note: string;
};

type Teacher = {
  id: string;
  name: string;
  role: string;
  subject: string;
  education: string;
  initials: string;
  image?: string;
};

const allPages = pages as Page[];
const feeItems: FeeItem[] = feeData.items;
const teachers: Teacher[] = teacherData.teachers;

export function generateStaticParams() {
  return [
    ...allPages.map((page) => ({ slug: page.path.split("/") })),
    { slug: ["fees"] },
    { slug: ["gallery", "img"] },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const resolvedPath =
    path === "fees"
      ? "fee-chart"
      : path === "gallery/img"
        ? "gallery"
        : path;
  const page = allPages.find(
    (item) => item.path === resolvedPath,
  );
  return page
    ? {
        title: `${page.title} | ${data.site.name}`,
        description: page.intro,
      }
    : {};
}

function PageHeading({ page }: { page: Page }) {
  return (
    <section className="page-banner">
      <div className="wrap">
        <div className="section-kicker">আল-হাইসাম ইন্টারন্যাশনাল একাডেমি</div>
        <h1>{page.title}</h1>
        {page.subtitle && <p>{page.subtitle}</p>}
        <div className="breadcrumbs">
          <Link href="/">হোম</Link> / {page.title}
        </div>
      </div>
    </section>
  );
}

function GoalsPage({ page }: { page: Page }) {
  return (
    <main className="institution-page goals-page">
      <PageHeading page={page} />
      <section className="wrap institution-content">
        {page.intro && <p className="institution-lead">{page.intro}</p>}
        <div className="goal-grid">
          {page.sections.map((section, index) => (
            <article className="goal-card" key={section.heading}>
              <span className="goal-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="goal-symbol" aria-hidden="true">
                {["✦", "◇", "◎", "↗"][index % 4]}
              </span>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
        <aside className="goals-promise">
          <span className="section-kicker">আমাদের অঙ্গীকার</span>
          <p>
            প্রতিটি শিক্ষার্থীর স্বতন্ত্র সম্ভাবনাকে সম্মান করে শেখা, ভালো
            অভ্যাস এবং দায়িত্বশীলতার চর্চায় পাশে থাকা।
          </p>
        </aside>
      </section>
    </main>
  );
}

function SyllabusPage({ page }: { page: Page }) {
  const levels = page.sections.slice(0, 3);
  const subjects = (page.sections[3]?.body ?? "")
    .split(";")
    .map((subject) => subject.trim())
    .filter(Boolean);
  const pathway = page.sections[4];

  return (
    <main className="institution-page syllabus-page">
      <PageHeading page={page} />
      <section className="wrap institution-content">
        {page.intro && <p className="institution-lead">{page.intro}</p>}
        <div className="syllabus-section-heading">
          <span className="section-kicker">ধাপে ধাপে অগ্রগতি</span>
          <h2>শিক্ষার স্তর</h2>
        </div>
        <div className="syllabus-level-grid">
          {levels.map((level, index) => (
            <article className="syllabus-level-card" key={level.heading}>
              <span className="syllabus-level-number">
                ০{index + 1}
              </span>
              <h3>{level.heading}</h3>
              <p>{level.body}</p>
              <span className="syllabus-level-rule" />
            </article>
          ))}
        </div>
        <section className="syllabus-subjects">
          <div className="syllabus-section-heading">
            <span className="section-kicker">জ্ঞান ও জীবনদক্ষতা</span>
            <h2>{page.sections[3]?.heading}</h2>
          </div>
          <div className="subject-list">
            {subjects.map((subject) => (
              <span className="subject-chip" key={subject}>
                <span aria-hidden="true">✓</span>
                {subject}
              </span>
            ))}
          </div>
        </section>
        {pathway && (
          <aside className="syllabus-pathway">
            <span className="pathway-icon" aria-hidden="true">
              ↗
            </span>
            <div>
              <h2>{pathway.heading}</h2>
              <p>{pathway.body}</p>
            </div>
          </aside>
        )}
      </section>
    </main>
  );
}

function TeachersPage({ page }: { page: Page }) {
  return (
    <main className="institution-page teachers-page">
      <PageHeading page={page} />
      <section className="wrap institution-content">
        {page.intro && <p className="institution-lead">{page.intro}</p>}
        {teacherData.sampleData && (
          <aside className="sample-data-note">
            <span aria-hidden="true">i</span>
            <p>
              নমুনা তথ্য: এই তালিকাটি ডেমোর জন্য তৈরি। প্রকাশের আগে
              যাচাইকৃত শিক্ষক পরিচিতি দিয়ে প্রতিস্থাপন করুন।
            </p>
          </aside>
        )}
        <div className="teacher-grid">
          {teachers.map((teacher, index) => (
            <article className="teacher-card" key={teacher.id}>
              <div className={`teacher-avatar teacher-avatar-${index % 4}`}>
                {teacher.image ? (
                  <Image
                    src={teacher.image}
                    alt={`${teacher.name} — ${teacher.role}`}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
                  />
                ) : (
                  <span>{teacher.initials}</span>
                )}
                {!teacher.image && <i aria-hidden="true">✦</i>}
              </div>
              <div className="teacher-card-content">
                <span className="teacher-subject">{teacher.subject}</span>
                <h2>{teacher.name}</h2>
                <p className="teacher-role">{teacher.role}</p>
                <span className="teacher-divider" />
                <p className="teacher-education">{teacher.education}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function AdmissionPage({ page }: { page: Page }) {
  const documents = [
    "শিক্ষার্থীর সাম্প্রতিক ছবি",
    "জন্ম নিবন্ধনের অনুলিপি",
    "পূর্ববর্তী শ্রেণির ফলাফল বা সনদ (প্রযোজ্য ক্ষেত্রে)",
    "অভিভাবকের পরিচয়পত্রের অনুলিপি",
  ];

  return (
    <main className="institution-page admission-page">
      <PageHeading page={page} />
      <section className="wrap institution-content">
        {page.intro && <p className="institution-lead">{page.intro}</p>}
        <div className="admission-download-card">
          <div className="download-form-icon" aria-hidden="true">
            ↓
          </div>
          <div>
            <span className="section-kicker">আবেদন শুরু করুন</span>
            <h2>আবেদন ফরম সংগ্রহ করুন</h2>
            <p>
              ফরমটি ডাউনলোড করে প্রিন্ট করুন, হাতে পূরণ করুন এবং প্রয়োজনীয়
              কাগজপত্রসহ একাডেমিতে জমা দিন।
            </p>
          </div>
          <a
            className="button button-primary admission-download-button"
            href="/admission-application-form.html"
            download
          >
            ফরম ডাউনলোড <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="admission-columns">
          <section className="admission-process">
            <div className="syllabus-section-heading">
              <span className="section-kicker">আবেদন থেকে ভর্তি</span>
              <h2>ভর্তির ধাপসমূহ</h2>
            </div>
            <ol className="admission-steps">
              {page.sections.map((step, index) => (
                <li key={step.heading}>
                  <span className="admission-step-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{step.heading}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <aside className="admission-documents">
            <span className="section-kicker">আগে থেকে প্রস্তুত রাখুন</span>
            <h2>প্রয়োজনীয় কাগজপত্র</h2>
            <ul>
              {documents.map((document) => (
                <li key={document}>
                  <span aria-hidden="true">✓</span>
                  {document}
                </li>
              ))}
            </ul>
            <p>
              শ্রেণি, আসন ও কাগজপত্রের সর্বশেষ তালিকা ভর্তি অফিসে নিশ্চিত
              করুন।
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}

function GalleryPage({ page }: { page: Page }) {
  return (
    <main className="institution-page gallery-page">
      <PageHeading page={page} />
      <section className="wrap institution-content">
        {page.intro && <p className="institution-lead">{page.intro}</p>}
        <div className="gallery-grid">
          {galleryData.items.map((item, index) => (
            <figure className="gallery-card" key={item.id}>
              <a
                className="gallery-image-link"
                href={item.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`${item.title} — পূর্ণ আকারের ছবি দেখুন`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={960}
                  height={640}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  priority={index === 0}
                />
                <span className="gallery-view-icon" aria-hidden="true">
                  ↗
                </span>
              </a>
              <figcaption>
                <span>{item.category}</span>
                <strong>{item.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}

function FeesPage({ page }: { page: Page }) {
  return (
    <main className="institution-page fees-page">
      <PageHeading page={page} />
      <section className="wrap institution-content">
        {page.intro && <p className="institution-lead">{page.intro}</p>}
        <aside className="fees-notice" role="note">
          <span aria-hidden="true">i</span>
          <p>{feeData.notice}</p>
          <a
            className="button button-primary"
            href={`tel:${data.site.phone.replaceAll(" ", "")}`}
          >
            ফি জানতে ফোন করুন
          </a>
        </aside>
        <div className="fees-table-wrap">
          <table className="fees-table">
            <caption>ফি ও সেবার তালিকা</caption>
            <thead>
              <tr>
                <th scope="col">বিভাগ</th>
                <th scope="col">ফি বা সেবা</th>
                <th scope="col">পরিশোধের ধরন</th>
                <th scope="col">পরিমাণ</th>
                <th scope="col">বিস্তারিত</th>
              </tr>
            </thead>
            <tbody>
              {feeItems.map((item) => (
                <tr key={item.name}>
                  <td data-label="বিভাগ">{item.category}</td>
                  <th scope="row" data-label="ফি বা সেবা">
                    {item.name}
                  </th>
                  <td data-label="পরিশোধের ধরন">{item.frequency}</td>
                  <td className="fee-amount" data-label="পরিমাণ">
                    {item.amount === null
                      ? "অফিসে নিশ্চিত করুন"
                      : `৳ ${item.amount.toLocaleString("bn-BD")}`}
                  </td>
                  <td data-label="বিস্তারিত">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <section className="fee-policies">
          <h2>গুরুত্বপূর্ণ তথ্য</h2>
          <ul>
            {feeData.policies.map((policy) => (
              <li key={policy}>{policy}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");
  const resolvedPath =
    path === "fees" ? "fee-chart" : path === "gallery/img" ? "gallery" : path;
  const page = allPages.find((item) => item.path === resolvedPath);
  if (!page) notFound();

  if (path === "goals") return <GoalsPage page={page} />;
  if (path === "syllabus") return <SyllabusPage page={page} />;
  if (path === "teachers") return <TeachersPage page={page} />;
  if (path === "admission-procedure") return <AdmissionPage page={page} />;
  if (resolvedPath === "gallery") return <GalleryPage page={page} />;
  if (resolvedPath === "fee-chart") return <FeesPage page={page} />;

  if (path === "chairman-message") {
    const signature = page.sections[0];
    return (
      <main className="chairman-page">
        <section className="chairman-page-heading">
          <div className="wrap">
            <span className="section-kicker">
              আল-হাইসাম ইন্টারন্যাশনাল একাডেমি
            </span>
            <h1>{page.title}</h1>
            <div className="breadcrumbs">
              <Link href="/">হোম</Link> / {page.title}
            </div>
          </div>
        </section>
        <section className="chairman-message-section">
          <div className="wrap">
            <article className="chairman-message-card">
              <figure className="chairman-portrait">
                {page.image && (
                  <Image
                    src={page.image}
                    alt={page.imageAlt || page.title}
                    width={240}
                    height={240}
                    priority
                  />
                )}
              </figure>
              <div className="chairman-message-copy">
                <span className="chairman-quote-mark" aria-hidden="true">
                  “
                </span>
                {page.intro && <blockquote>{page.intro}</blockquote>}
                <div className="chairman-signature">
                  <strong>{signature?.heading || page.subtitle}</strong>
                  {signature?.body && <span>{signature.body}</span>}
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div className="content-page">
      <PageHeading page={page} />
      <div className="wrap content-layout">
        <article className="page-content">
          {page.image && (
            <img
              className="content-feature-image"
              src={page.image}
              alt={page.imageAlt || page.title}
            />
          )}
          {page.intro && <p className="page-intro">{page.intro}</p>}
          {page.noticeList && (
            <div className="notice-list">
              {data.announcements.map((notice) => (
                <a className="notice-card" href={notice.url} key={notice.id}>
                  <span className="notice-date">{notice.date}</span>
                  <h2>{notice.title}</h2>
                  <span className="read-more">বিস্তারিত পড়ুন ↗</span>
                </a>
              ))}
            </div>
          )}
          {page.sections.map((section) => (
            <section className="content-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body && <p>{section.body}</p>}
            </section>
          ))}
          {path === "contact" && (
            <section className="content-section">
              <h2>আপনার মূল্যবান মন্তব্য</h2>
              <form
                className="contact-form"
                action="mailto:info@madrasatussunnah.org"
                method="post"
                encType="text/plain"
              >
                <label>
                  আপনার সম্পূর্ণ নাম *
                  <input name="name" required placeholder="নাম লিখুন" />
                </label>
                <label>
                  আপনার ফোন *
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="ফোন নম্বর"
                  />
                </label>
                <label>
                  আপনার ইমেইল (ঐচ্ছিক)
                  <input name="email" type="email" placeholder="ইমেইল" />
                </label>
                <label>
                  আপনার মন্তব্য
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="আপনার প্রশ্ন বা মন্তব্য লিখুন"
                  />
                </label>
                <button className="button button-primary" type="submit">
                  মন্তব্য প্রেরণ করুন ↗
                </button>
                <p className="form-note">
                  প্রাথমিক UI form; production submission-এর জন্য backend/API
                  সংযোগ প্রয়োজন।
                </p>
              </form>
            </section>
          )}
          {path === "branch" && (
            <div className="page-link-list">
              <Link href="/branch/dhaka">প্রধান শাখা — ঢাকা ↗</Link>
              <Link href="/branch/cumilla">কুমিল্লা শাখা ↗</Link>
            </div>
          )}
          {path.startsWith("branch/") && (
            <div className="page-link-list">
              <Link href="/branch">সব শাখা দেখুন ↗</Link>
            </div>
          )}
        </article>
        <aside className="page-sidebar">
          <h2>গুরুত্বপূর্ণ লিংক</h2>
          {data.footerLinks.map((link) => (
            <a href={link.url} key={link.url}>
              {link.label}
              <span>↗</span>
            </a>
          ))}
          <div className="sidebar-contact">
            <strong>যোগাযোগ</strong>
            <a href={`tel:${data.site.phone.replaceAll(" ", "")}`}>
              {data.site.phone}
            </a>
            <a href={`mailto:${data.site.email}`}>{data.site.email}</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
