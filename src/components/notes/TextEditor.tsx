"use client";

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

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
  return (
    <MDXEditor
      className="rounded-(--radius-card) border border-zinc-700 bg-zinc-900 h-full w-full overflow-y-auto no-scrollbar"
      contentEditableClassName="prose prose-invert max-w-none min-h-[300px] p-4 focus:outline-none text-white!"
      markdown={value}
      onChange={onChange}
      placeholder={placeholder}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  );
}
