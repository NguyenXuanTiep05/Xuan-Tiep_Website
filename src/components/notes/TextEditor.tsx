"use client";
import { useState } from "react";

import "@/assets/TextEditor.css";
import { Markdown } from "@/lib/Markdown";

const TextEditor = () => {
    const [text, setText] = useState<string>("");

    return (
        <div className="relative w-full h-full flex flex-row">
            <div
                className=" inset-0 w-[50%] h-full p-2 z-10 pointer-events-none wrap-break-word"
                id="markdownText"
                dangerouslySetInnerHTML={{ __html: Markdown.FormatText(text) }}
            ></div>
            <textarea
                className=" inset-0 w-[50%] h-full p-2 placeholder:text-center"
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
        </div>
    );
};

export default TextEditor;
