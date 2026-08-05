export class Markdown {
    static _SpecialChars: Record<string, string> = {
        "<br/>": "\n",
        "<tab/>": "\t",
    };

    static _references: Record<string, string[]> = {};

    static FormatText = (text: string) => {
        text = this.ReferencesMatch(text);
        text = this.TextFormatting(text);
        text = this.TextBlocks(text);
        text = this.TextEmphasis(text);
        text = this.Headings(text);
        text = this.FormatSpecialChars(text, this._SpecialChars);
        return text;
    };

    static HandleKeyDown = (
        e: React.KeyboardEvent<HTMLTextAreaElement>,
        [setTextS]: [(value: string) => void],
    ) => {
        const textarea = e.currentTarget;
        const text = textarea.value;
        let newText = text;
        const cursorPos = textarea.selectionStart;
        let newCursorPos = cursorPos;

        if (e.key === "Tab") {
            e.preventDefault();
            const insertText = this._SpecialChars["<tab/>"];
            newText = this.InsertAtIndex(text, cursorPos, insertText);
            newCursorPos = cursorPos + insertText.length;
            setTextS(newText);

            requestAnimationFrame(() => {
                textarea.selectionStart = newCursorPos;
                textarea.selectionEnd = newCursorPos;
            });
            return;
        }

        setTextS(newText);
    };

    static FindKeyByValue = (
        record: Record<string, string>,
        value: string,
    ): boolean => {
        return Object.entries(record).some(([_, val]) => val === value);
    };

    static InsertAtIndex = (
        str: string,
        index: number,
        textToInsert: string,
    ): string => {
        return str.slice(0, index) + textToInsert + str.slice(index);
    };

    static FormatSpecialChars = (
        text: string,
        replacements: Record<string, string>,
    ): string => {
        let result = text;
        for (const [key, marker] of Object.entries(replacements)) {
            result = result.replaceAll(marker, key);
        }
        return result;
    };

    static TextFormatting = (text: string): string => {
        text = this.HorizontalLine(text);
        return text;
    };

    static TextBlocks = (text: string): string => {
        text = this.BlockQuote(text);
        text = this.Paragraph(text);
        text = this.Picture(text);
        text = this.Link(text);

        text = this.CheckBox(text);
        text = this.UnorderedList(text);
        text = this.OrderedList(text);

        return text;
    };

    static TextEmphasis = (text: string): string => {
        text = this.StrongText(text);
        text = this.ItalicText(text);
        text = this.ItalicText(text);
        text = this.StrikeThrough(text);
        text = this.InlineCode(text);

        return text;
    };

    static Headings = (text: string): string => {
        text = this.Heading4(text);
        text = this.Heading3(text);
        text = this.Heading2(text);
        text = this.Heading1(text);

        return text;
    };
    static HorizontalLine = (text: string): string => {
        return text.replace(/^(?:-{3,}|\*{3,}|_{3,})\n/gm, (match) => {
            return `<hr class="hr"/>`;
        });
    };

    static StrongText = (text: string): string => {
        return text.replace(/\*\*([^*]+?)\*\*/gm, (match, innerText) => {
            return `<strong>${innerText}</strong>`;
        });
    };

    static ItalicText = (text: string): string => {
        return text.replace(/\*([^*]+?)\*/gm, (match, innerText) => {
            return `<i>${innerText}</i>`;
        });
    };
    static ItalicBoldText = (text: string): string => {
        return text.replace(/\*\*\*([^*]+?)\*\*\*/gm, (match, innerText) => {
            return `<strong><i>${innerText}</i></strong>`;
        });
    };
    static StrikeThrough = (text: string): string => {
        return text.replace(/~~([^~]+?)~~/gm, (match, innerText) => {
            return `<span class="line-through">${innerText}</span>`;
        });
    };
    static InlineCode = (text: string): string => {
        return text.replace(/\`([^\`]+?)\`/gm, (match, innerText) => {
            return `<code class="code">${innerText}</code>`;
        });
    };

    static Heading1 = (text: string): string => {
        return text.replace(/^#\s(.+?)$\n?/gm, (match, innerText) => {
            return `<h1 class="text-4xl">${innerText}</h1>`;
        });
    };
    static Heading2 = (text: string): string => {
        return text.replace(/^##\s(.+?)$\n?/gm, (match, innerText) => {
            return `<h2 class="text-3xl">${innerText}</h2>`;
        });
    };
    static Heading3 = (text: string): string => {
        return text.replace(/^###\s(.+?)$\n?/gm, (match, innerText) => {
            return `<h3 class="text-2xl">${innerText}</h3>`;
        });
    };
    static Heading4 = (text: string): string => {
        return text.replace(/^####\s(.+?)$\n?/gm, (match, innerText) => {
            return `<h4 class="text-xl">${innerText}</h4>`;
        });
    };

    static BlockQuote = (text: string): string => {
        return text.replace(/^>>?\s(.+?)$\n?/gm, (match, innerText) => {
            return `<blockquote class="italic font-semibold tracking-tight text-heading">"${innerText}"</blockquote>`;
        });
    };
    static Paragraph = (text: string): string => {
        return text.replace(
            /^```(\w+)?\n?([\s\S]+?)\n```/gm,
            (match, lang, innerText) => {
                const language = lang || "text";
                const code = lang == null ? "paragraph" : "code";
                return `\n<pre  class="language-${language} ${code} "><code>${innerText.trim()}</code></pre>`;
            },
        );
    };

    static Link = (text: string): string => {
        text = text.replace(
            /\[([^\]]+)\]\(([^\)]\S+)(?:\s+"([^"]*)")?\)?/g,
            (match, label, link, hover) => {
                return `<a class="links" href="${link}" title="${hover ?? ""}">${label}</a>`;
            },
        );
        text = text.replace(
            /\[([^\]]+)\]\[([^\]]+)\]/g, // <- was [^\)]+, fixed to [^\]]+
            (match, label, id) => {
                const url = this._references[id]?.[0] ?? "";
                const title = this._references[id]?.[1] ?? "";
                return `<a class="links" href="${url}" title="${title}">${label}</a>`;
            },
        );
        return text;
    };
    static Picture = (text: string): string => {
        text = text.replace(
            /\!\[([^\]]+)\]\(([^\)]+)\)/g,
            (match, label, link) => {
                return `<img src="${link}" alt="${label}"></img>`;
            },
        );
        text = text.replace(
            /\!\[([^\]]+)\]\[([^\]]+)\]/g,
            (match, label, id) => {
                return `<img src="${this._references[id]?.[0] ?? ""}" title="${this._references[id]?.[1] ?? ""}" alt="${label}"></img>`;
            },
        );

        return text;
    };

    static CheckBox = (text: string): string => {
        return text.replace(
            /\[([ xX])\]\s(.+)$/gm,
            (match, isChecked, innerText) => {
                const checked =
                    isChecked.toLowerCase() === "x" ? "checked" : "";
                return `<input type="checkbox" ${checked} onclick="return false;"/> ${innerText}`;
            },
        );
    };

    static ReferencesMatch = (text: string): string => {
        text = text.replace(
            /\[([^\]]+)\]:\s+(\S+)(?:\s+"([^"]*)")?\n?/g,
            (match, id, link, title) => {
                this._references[id] = [link, title ?? null];
                return "";
            },
        );
        return text;
    };

    static UnorderedList = (text: string): string => {
        return text.replace(/^(?:[ \t]*[-*+] .+\n?)+/gm, (block) => {
            return this.BuildNestedList(block, /^[-*+] /);
        });
    };

    static OrderedList = (text: string): string => {
        return text.replace(/^(?:[ \t]*\d+\. .+\n?)+/gm, (block) => {
            return this.BuildNestedList(block, /^\d+\. /);
        });
    };

    static BuildNestedList = (block: string, markerRegex: RegExp): string => {
        const lines = block.replace(/\n$/, "").split("\n");
        const isOrdered = markerRegex.source.includes("\\d");
        const tag = isOrdered ? "ol" : "ul";
        const listClass = isOrdered
            ? "list-decimal list-inside space-y-1 mb-4"
            : "list-disc list-inside space-y-1 mb-4";

        let html = "";
        const stack: number[] = []; // tracks indent levels currently open

        for (const line of lines) {
            const indentMatch = line.match(/^[ \t]*/);
            const indent = indentMatch ? indentMatch[0].length : 0;
            const content = line
                .replace(/^[ \t]*/, "")
                .replace(markerRegex, "")
                .trim();

            while (stack.length && indent < stack[stack.length - 1]) {
                html += `</li></${tag}>`;
                stack.pop();
            }

            if (!stack.length || indent > stack[stack.length - 1]) {
                html += `<${tag} class="${listClass} ${stack.length ? "ml-4" : ""}">`;
                stack.push(indent);
            } else {
                html += `</li>`;
            }

            html += `<li>${content}`;
        }

        html += `</li>` + `</${tag}>`.repeat(stack.length);
        return html;
    };
}
