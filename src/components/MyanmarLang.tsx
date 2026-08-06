"use client";

import { useEffect } from "react";

export default function MyanmarLang({
  fontClassName,
}: {
  fontClassName: string;
}) {
  useEffect(() => {
    document.documentElement.lang = "my";
    document.body.classList.add(fontClassName);

    return () => {
      document.body.classList.remove(fontClassName);
      document.documentElement.lang = "zh-CN";
    };
  }, [fontClassName]);

  return null;
}
