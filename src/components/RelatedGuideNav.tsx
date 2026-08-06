import Link from "next/link";
import { ChevronLeft, ChevronRight, Network } from "lucide-react";

type Entry = { id: string; title: string };

export default function RelatedGuideNav({
  entries,
  index,
  base,
  lang,
}: {
  entries: Entry[];
  index: number;
  base: string;
  lang: "zh" | "en" | "my";
}) {
  const previous = entries[index - 1],
    next = entries[index + 1];
  const label =
    lang === "zh"
      ? "继续阅读"
      : lang === "my"
        ? "ဆက်လက်ဖတ်ရှုရန်"
        : "Continue reading";
  return (
    <nav className="related-guides" aria-label={label}>
      <strong>
        <Network size={16} />
        {label}
      </strong>
      <div>
        {previous ? (
          <Link href={`${base}#${previous.id}`}>
            <ChevronLeft size={17} />
            <span>
              <small>
                {lang === "zh"
                  ? "上一篇"
                  : lang === "my"
                    ? "ယခင်ခေါင်းစဉ်"
                    : "Previous"}
              </small>
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`${base}#${next.id}`}>
            <span>
              <small>
                {lang === "zh"
                  ? "下一篇"
                  : lang === "my"
                    ? "နောက်ခေါင်းစဉ်"
                    : "Next"}
              </small>
              {next.title}
            </span>
            <ChevronRight size={17} />
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
