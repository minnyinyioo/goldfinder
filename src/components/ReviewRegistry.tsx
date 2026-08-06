"use client";
import Link from "next/link";
import {
  BadgeCheck,
  BookOpenCheck,
  ClipboardCheck,
  Languages,
  Printer,
  ShieldAlert,
  UserRoundSearch,
} from "lucide-react";
import "./review-registry.css";

type Lang = "zh" | "en" | "my";
export default function ReviewRegistry({ lang }: { lang: Lang }) {
  const c = copy[lang],
    base = lang === "zh" ? "" : `/${lang}`;
  const rows = [
    [
      BookOpenCheck,
      c.editorial,
      c.complete,
      "Goldfinder editorial team",
      "2026-08-06",
      "v3.43.0",
    ],
    [UserRoundSearch, c.geology, c.pending, c.unassigned, "—", "—"],
    [Languages, c.language, c.pending, c.unassigned, "—", "—"],
    [ShieldAlert, c.local, c.pending, c.unassigned, "—", "—"],
  ] as const;
  return (
    <main className="review-registry">
      <header>
        <p className="eyebrow">TRANSPARENT REVIEW REGISTER</p>
        <h1>
          <ClipboardCheck />
          {c.title}
        </h1>
        <p>{c.lead}</p>
      </header>
      <section className="review-rule">
        <BadgeCheck />
        <div>
          <h2>{c.rule}</h2>
          <p>{c.ruleText}</p>
        </div>
      </section>
      <section className="review-table" aria-label={c.status}>
        {rows.map(([Icon, name, status, reviewer, date, version]) => (
          <article key={name}>
            <Icon />
            <div>
              <h2>{name}</h2>
              <span
                className={status === c.complete ? "is-complete" : "is-pending"}
              >
                {status}
              </span>
            </div>
            <dl>
              <div>
                <dt>{c.reviewer}</dt>
                <dd>{reviewer}</dd>
              </div>
              <div>
                <dt>{c.date}</dt>
                <dd>{date}</dd>
              </div>
              <div>
                <dt>{c.version}</dt>
                <dd>{version}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
      <section className="review-requirements">
        <h2>{c.required}</h2>
        <ol>
          {c.requirements.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
        <div className="notice">{c.notice}</div>
      </section>
      <section className="review-history">
        <h2>{c.history}</h2>
        <p>
          <b>v3.43.0 · 2026-08-06</b> — {c.h43}
        </p>
        <p>
          <b>v3.41.0 · 2026-08-06</b> — {c.h41}
        </p>
        <p>
          <b>v3.36.0 · 2026-08-06</b> — {c.h36}
        </p>
      </section>
      <div className="review-actions">
        <button onClick={() => window.print()}>
          <Printer />
          {c.print}
        </button>
        <Link href={`${base}/sources`}>{c.sources}</Link>
      </div>
    </main>
  );
}

const copy = {
  zh: {
    title: "专业审阅登记册",
    lead: "公开区分编辑核查、独立地质审阅、缅语术语审校和当地合规核验。空缺状态不会被隐藏，也不会使用虚构姓名填充。",
    rule: "完成状态规则",
    ruleText:
      "只有收到可保存的具名审阅记录，并核对资质、范围、利益冲突、日期和所审版本后，状态才能由“待审”改为“完成”。",
    status: "审阅状态",
    editorial: "公开资料与编辑核查",
    geology: "独立地质准确性审阅",
    language: "专业缅语与地质术语审校",
    local: "当地许可、安全与环境核验",
    complete: "已完成",
    pending: "待审",
    unassigned: "尚未委任真实审阅人",
    reviewer: "审阅人",
    date: "审阅日期",
    version: "审阅版本",
    required: "每份专业审阅必须记录",
    requirements: [
      "审阅人真实姓名及可核验联系方式",
      "专业资质、执业许可或相关学会会员信息",
      "审阅范围及明确未覆盖的内容",
      "与项目、矿权或商业主体的利益冲突声明",
      "逐项修改意见、接受或保留意见及签署日期",
      "被审阅的固定内容版本与后续失效条件",
    ],
    notice:
      "本站当前不能声称已获独立地质师或专业缅语译审认可。该登记册是审阅控制流程，不是专业背书。",
    history: "公开修订摘要",
    h43: "核心知识文章加入逐节 USGS／EPA 依据。",
    h41: "完成键盘焦点、跳转与导航无障碍改进。",
    h36: "建立编辑责任、版本与独立专家待审声明。",
    print: "打印审阅登记",
    sources: "核对全部资料来源",
  },
  en: {
    title: "Professional review register",
    lead: "Separates editorial checking, independent geological review, Burmese terminology review and local compliance verification. Vacancies remain visible and are never filled with invented identities.",
    rule: "Completion rule",
    ruleText:
      "A status changes from Pending to Complete only after a durable named review record is received and credentials, scope, conflicts, date and reviewed version are checked.",
    status: "Review status",
    editorial: "Public-source and editorial verification",
    geology: "Independent geological accuracy review",
    language: "Professional Burmese and geological terminology review",
    local: "Local permit, safety and environmental verification",
    complete: "Complete",
    pending: "Pending",
    unassigned: "No genuine reviewer appointed",
    reviewer: "Reviewer",
    date: "Review date",
    version: "Reviewed version",
    required: "Every professional review must record",
    requirements: [
      "Reviewer’s real name and verifiable contact route",
      "Professional credentials, practising licence or relevant society membership",
      "Review scope and explicit exclusions",
      "Conflicts involving the project, mineral rights or commercial parties",
      "Itemised comments, accepted or reserved findings, and signature date",
      "Fixed reviewed content version and conditions that invalidate the review",
    ],
    notice:
      "The site cannot currently claim endorsement by an independent geologist or professional Burmese language reviewer. This register is a control process, not an endorsement.",
    history: "Public revision summary",
    h43: "Added section-level USGS and EPA evidence to core knowledge articles.",
    h41: "Completed keyboard focus, skip navigation and overlay accessibility work.",
    h36: "Established editorial ownership, versioning and the pending independent-review disclosure.",
    print: "Print review register",
    sources: "Review all primary sources",
  },
  my: {
    title: "ကျွမ်းကျင်သူ စိစစ်မှု မှတ်ပုံတင်",
    lead: "Editorial source check၊ independent geology review၊ မြန်မာဘူမိဗေဒဝေါဟာရ review နှင့် local compliance verification ကို သီးခြားဖော်ပြသည်။ အတု reviewer အမည် မထည့်ပါ။",
    rule: "Complete သတ်မှတ်ချက်",
    ruleText:
      "အမည်ပါ review record ရရှိပြီး credential၊ scope၊ conflict၊ date နှင့် reviewed version ကို စစ်ပြီးမှ Pending မှ Complete သို့ ပြောင်းမည်။",
    status: "Review အခြေအနေ",
    editorial: "Public source နှင့် editorial verification",
    geology: "Independent geological accuracy review",
    language: "Professional မြန်မာဘာသာနှင့် geology terminology review",
    local: "Local permit၊ safety နှင့် environment verification",
    complete: "ပြီးစီး",
    pending: "စောင့်ဆိုင်း",
    unassigned: "Reviewer အစစ် မခန့်ထားရသေး",
    reviewer: "Reviewer",
    date: "Review date",
    version: "Reviewed version",
    required: "Professional review တစ်ခုစီတွင် မဖြစ်မနေမှတ်ရန်",
    requirements: [
      "Reviewer အမည်အစစ်နှင့် စစ်ဆေးနိုင်သော ဆက်သွယ်ရေး",
      "Professional credential၊ practising licence သို့မဟုတ် society membership",
      "Review scope နှင့် မပါဝင်သည့်အချက်များ",
      "Project၊ mineral right သို့မဟုတ် commercial party နှင့် conflict declaration",
      "Itemised comment၊ လက်ခံ/မလက်ခံချက်နှင့် signature date",
      "Reviewed content version နှင့် review ပျက်ပြယ်စေမည့် ပြောင်းလဲမှု",
    ],
    notice:
      "လက်ရှိတွင် independent geologist သို့မဟုတ် professional Burmese reviewer ထောက်ခံချက်ရရှိပြီဟု မဆိုနိုင်ပါ။ ဤ register သည် control process သာဖြစ်သည်။",
    history: "Public revision summary",
    h43: "Core knowledge တွင် section-level USGS/EPA evidence ထည့်ထားသည်။",
    h41: "Keyboard focus၊ skip navigation နှင့် overlay accessibility ပြီးစီးသည်။",
    h36: "Editorial owner၊ version နှင့် pending independent-review disclosure စတင်ထားသည်။",
    print: "Review register print လုပ်ရန်",
    sources: "Primary source အားလုံး စစ်ရန်",
  },
} as const;
