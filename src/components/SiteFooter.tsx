"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  HardDriveDownload,
  Mail,
  Scale,
  ShieldAlert,
  TestTubes,
} from "lucide-react";
import {
  FaDiscord,
  FaFacebookF,
  FaGithub,
  FaTelegram,
} from "react-icons/fa6";

function SocialChannels({ locale }: { locale: "zh" | "en" | "my" }) {
  const reserved = locale === "zh" ? "预留" : locale === "my" ? "မကြာမီ" : "Reserved";
  const title =
    locale === "zh" ? "联系与社区" : locale === "my" ? "ဆက်သွယ်ရန်နှင့် အသိုင်းအဝိုင်း" : "Contact & community";

  return (
    <section className="footer-social" aria-label={title}>
      <p>{title}</p>
      <div>
        <span aria-disabled="true" title={`Facebook · ${reserved}`}>
          <FaFacebookF aria-hidden="true" /> Facebook <small>{reserved}</small>
        </span>
        <span aria-disabled="true" title={`Email · ${reserved}`}>
          <Mail aria-hidden="true" /> Email <small>{reserved}</small>
        </span>
        <span aria-disabled="true" title={`Discord · ${reserved}`}>
          <FaDiscord aria-hidden="true" /> Discord <small>{reserved}</small>
        </span>
        <span aria-disabled="true" title={`Telegram · ${reserved}`}>
          <FaTelegram aria-hidden="true" /> Telegram <small>{reserved}</small>
        </span>
        <a
          href="https://github.com/minnyinyioo/goldfinder"
          target="_blank"
          rel="noreferrer"
          aria-label="Goldfinder GitHub repository"
        >
          <FaGithub aria-hidden="true" /> GitHub
        </a>
      </div>
    </section>
  );
}
export default function SiteFooter() {
  const path = usePathname(),
    en = path.startsWith("/en"),
    my = path.startsWith("/my");
  if (my)
    return (
      <footer>
        <div>
          <Link className="brand" href="/my">
            <TestTubes size={19} />
            <span>ရွှေရှာဖွေ</span>
          </Link>
          <p>
            လက္ခဏာသည် ရွှေသိုက်မဟုတ် · ကြည့်ရှု · နမူနာယူ · စမ်းသပ် ·
            ပြန်လည်စစ်ဆေး
          </p>
        </div>
        <div className="footer-links">
          <Link href="/my/sources">
            <BookOpen size={15} />
            အချက်အလက်နှင့် ဓာတ်ပုံအရင်းအမြစ်
          </Link>
          <Link href="/my/copyright">
            <Scale size={15} />
            မူပိုင်ခွင့်နှင့် Disclaimer
          </Link>
          <Link href="/my/about">
            <ShieldAlert size={15} />
            လုံခြုံရေးနှင့် ဥပဒေ
          </Link>
          <Link href="/my/backup">
            <HardDriveDownload size={15} />
            အော့ဖ်လိုင်း အက်ပ်
          </Link>
        </div>
        <SocialChannels locale="my" />
        <p className="footer-legal">
          ဤပညာပေးစီမံကိန်းသည် ဥပဒေ၊ ဘူမိဗေဒ၊ သတ္တုတူးဖော်ရေး သို့မဟုတ်
          ရင်းနှီးမြှုပ်နှံမှုအကြံဉာဏ် မဟုတ်ပါ။ Third-party material ၏
          အခွင့်အရေးသည် မူရင်း creator/rightsholder ထံတွင်ရှိပြီး item
          တစ်ခုချင်း၏ licence ကို လိုက်နာထားသည်။
        </p>
      </footer>
    );
  return (
    <footer>
      <div>
        <Link className="brand" href={en ? "/en" : "/"}>
          <TestTubes size={19} />
          <span>{en ? "GOLDFINDER" : "探金"}</span>
        </Link>
        <p>
          {en
            ? "Indicators are not deposits · Observe · Sample · Analyse · Review"
            : "迹象不是金矿 · 观察 · 取样 · 检测 · 复核"}
        </p>
      </div>
      <div className="footer-links">
        <Link href={en ? "/en/sources" : "/sources"}>
          <BookOpen size={15} />
          {en ? "References & image credits" : "资料与图片来源"}
        </Link>
        <Link href={en ? "/en/copyright" : "/copyright"}>
          <Scale size={15} />
          {en ? "Copyright & disclaimer" : "版权与免责声明"}
        </Link>
        <Link href={en ? "/en/about" : "/about"}>
          <ShieldAlert size={15} />
          {en ? "Safety" : "安全说明"}
        </Link>
        <Link href={en ? "/en/backup" : "/backup"}>
          <HardDriveDownload size={15} />
          {en ? "Offline app" : "离线应用"}
        </Link>
      </div>
      <SocialChannels locale={en ? "en" : "zh"} />
      <p className="footer-legal">
        {en
          ? "Original editorial structure, interface design, and text produced for this site are protected under applicable law. Third-party material remains subject to the licence stated at its source. This project is not legal, geological, mining, or investment advice."
          : "本站原创的中文整理、信息架构与界面设计受适用法律保护；第三方内容各自遵循其来源页所载许可。本项目不构成法律、地质、采矿或投资建议。"}
      </p>
    </footer>
  );
}
