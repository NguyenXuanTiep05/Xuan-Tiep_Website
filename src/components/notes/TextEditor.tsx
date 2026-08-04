"use client";
import { useState } from "react";

import "@/assets/TextEditor.css";
import { Markdown } from "@/lib/Markdown";

const TextEditor = () => {
    const [text, setText] = useState<string>("");

    return (
        <div className="relative w-full h-full flex flex-row">
            <textarea
                className=" inset-0 w-[50%] max-w-[50%] h-full px-6 py-12 placeholder:text-center resize-x scrollbar-none border-r border-(--border)"
                id="normalText"
                autoCorrect="off"
                value={text}
                autoFocus
                placeholder="Here you can write 'markdown' syntax"
                onChange={(e) => {
                    setText(e.target.value);
                }}
                onKeyDown={(e) => Markdown.HandleKeyDown(e, [setText])}
            ></textarea>
            <div
                className=" inset-0 flex-1 h-full px-6 py-12 z-10 wrap-break-word overflow-y-scroll scrollbar-none"
                id="markdownText"
                dangerouslySetInnerHTML={{ __html: Markdown.FormatText(text) }}
            ></div>
        </div>
    );
};

export default TextEditor;
