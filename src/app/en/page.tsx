import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeSupport from "@/components/HomeSupport";
import {
  BookOpenCheck,
  Calculator,
  Camera,
  ClipboardList,
  FileWarning,
  Scale,
  ShieldCheck,
} from "lucide-react";
import "../home.css";
export const metadata: Metadata = {
  title: "Goldfinder Field Toolkit",
  description:
    "Real-photo identification, placer and lode field assessment, grade calculations, and sample records.",
  alternates: {
    canonical: "/en",
    languages: { "zh-CN": "/", en: "/en", my: "/my", "x-default": "/" },
  },
};
const primary = [
  {
    title: "Photo identification",
    text: "Compare soils, sands, quartz and common gold look-alikes with real photographs",
    href: "/en/atlas",
    Icon: Camera,
  },
  {
    title: "Field assessment",
    text: "Turn placer and lode observations into a sampling priority",
    href: "/en/assess",
    Icon: BookOpenCheck,
  },
  {
    title: "Grade calculator",
    text: "Convert sample volume and gold mass to g/m³ and review assay results",
    href: "/en/sampling",
    Icon: Calculator,
  },
  {
    title: "Sample register",
    text: "Keep GPS, photographs, IDs, observations and laboratory results",
    href: "/en/field",
    Icon: ClipboardList,
  },
];
const quick = [
  { label: "Identify", href: "/en/atlas", Icon: Camera },
  { label: "Field score", href: "/en/assess", Icon: BookOpenCheck },
  { label: "Calculate grade", href: "/en/sampling", Icon: Calculator },
  { label: "Sample register", href: "/en/field", Icon: ClipboardList },
  {
    label: "Fraud & look-alikes",
    href: "/en/knowledge#false-gold",
    Icon: FileWarning,
  },
  { label: "Safety & compliance", href: "/en/about", Icon: ShieldCheck },
];
export default function EnglishHome() {
  return (
    <>
      <section className="hero hero-with-photo tool-hero">
        <div>
          <p className="eyebrow">GOLDFINDER · FIELD TOOLKIT</p>
          <h1>
            Read geology, recognise placer gold,{" "}
            <span>assess samples, calculate grade</span>
          </h1>
          <p className="lead">
            Field observations only rank evidence. Gold content requires
            standardised sampling and weighing or appropriate laboratory
            analysis.
          </p>
          <div className="actions">
            <Link className="button" href="/en/assess">
              Start field assessment
            </Link>
            <Link className="button secondary" href="/en/project">
              Open project workspace
            </Link>
          </div>
        </div>
        <figure className="hero-photo">
          <Image
            src="/images/panning.jpg"
            alt="BLM Alaska staff member panning in a stream"
            width={960}
            height={720}
            priority
          />
          <figcaption>Field reference · BLM Alaska · Public Domain</figcaption>
        </figure>
      </section>
      <section className="section tool-section">
        <p className="eyebrow">START HERE</p>
        <h2>Four core tools</h2>
        <div className="tool-grid">
          {primary.map(({ title, text, href, Icon }) => (
            <Link className="tool-card" href={href} key={title}>
              <Icon size={25} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <span>Open →</span>
            </Link>
          ))}
        </div>
        <div className="quick-grid">
          {quick.map(({ label, href, Icon }) => (
            <Link href={href} key={label}>
              <Icon size={18} />
              <b>{label}</b>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">EVIDENCE CHAIN</p>
        <h2>From an indicator to a reviewable result</h2>
        <div className="steps">
          {[
            ["01", "Compare", "Use real references to exclude look-alikes"],
            ["02", "Prioritise", "Select targets that warrant verification"],
            ["03", "Sample", "Fix volume and include controls"],
            ["04", "Review", "Calculate grade, assay and check QA/QC"],
          ].map((x) => (
            <div className="step" key={x[0]}>
              <strong>{x[0]}</strong>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </div>
          ))}
        </div>
        <div className="notice">
          <Scale size={18} /> A colour, photograph, score or single sample
          cannot demonstrate a mineable deposit.
        </div>
      </section>
      <HomeSupport lang="en" />
    </>
  );
}
