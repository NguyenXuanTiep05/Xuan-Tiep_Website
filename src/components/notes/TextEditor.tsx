"use client";

import { useEffect, useRef } from "react";
import type Vditor from "vditor";
import "vditor/dist/index.css";

type MarkdownFieldProps = {
  value: string;
  onChange: (markdown: string) => void;
  placeholder?: string;
};

export default function MarkdownField({
  value,
  onChange,
  placeholder,
}: MarkdownFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Vditor | null>(null);
  const readyRef = useRef(false);

  const onChangeRef = useRef(onChange);

  useEffect(() => {
    let cancelled = false;
    let instance: Vditor | null = null;

    (async () => {
      const { default: VditorClass } = await import("vditor");
      if (cancelled || !containerRef.current) return;

      instance = new VditorClass(containerRef.current, {
        mode: "ir",
        value,
        placeholder,
        theme: "dark",
        preview: { theme: { current: "dark" } },
        height: "100%",
        minHeight: 300,
        toolbarConfig: { hide: true },
        toolbar: [],
        cache: { enable: false },
        cdn: "/vditor",
        input: (md) => onChangeRef.current(md),
        after: () => {
          readyRef.current = true;
        },
      });

      editorRef.current = instance;
    })();

    return () => {
      cancelled = true;
      readyRef.current = false;
      instance?.destroy();
      editorRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !readyRef.current) return;
    if (editor.getValue().trimEnd() !== value.trimEnd()) {
      editor.setValue(value);
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className={[
        "",
        "[&_.vditor]:border-0 [&_.vditor]:bg-transparent",
        "[&_.vditor-content]:bg-transparent",
        "[&_.vditor-ir]:bg-transparent",
        "[&_.vditor-reset]:p-4! [&_.vditor-reset]:text-white! [&_.vditor-reset]:min-h-[300px] [&_.vditor-reset]:no-scrollbar! [&_.vditor-reset]:focus:bg-transparent",
        "[&_.vditor-reset]:focus:outline-none",
      ].join(" ")}
    />
  );
}
