"use client";
import { useState } from "react";

import { Markdown } from "@/lib/Markdown";

const TextEditor = () => {
    const [text, setText] = useState<string>("");

    return (
        <div className="relative w-full h-full flex flex-row">
            <div
                className="absolute inset-0 w-full h-full p-2 z-10 pointer-events-none wrap-break-word  text-transparent"
                id="markdownText"
                dangerouslySetInnerHTML={{ __html: Markdown.FormatText(text) }}
            ></div>
            <textarea
                className="absolute inset-0 w-full h-full p-2"
                id="normalText"
                autoCorrect="off"
                onChange={(e) => {
                    setText(e.target.value);
                }}
                onKeyDown={(e) => Markdown.HandleKeyDown(e, [text, setText])}
            ></textarea>
        </div>
    );
};

export default TextEditor;
