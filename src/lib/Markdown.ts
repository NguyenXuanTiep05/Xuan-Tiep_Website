export class Markdown {
    static _SpecialChars: Record<string, string> = {
        "<br/>": "/1!@#1/",
    };

    static FormatText = (text: string) => {
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
        if (e.key === "Enter") {
            e.preventDefault();
            newText = this.InsertAtIndex(
                text,
                cursorPos,
                this._SpecialChars["<br/>"],
            );
        } else if (e.key === "Backspace") {
            const beforeCursor = text.slice(0, cursorPos);
            if (beforeCursor.slice(-2) !== "1/") {
                return;
            }
            const start = beforeCursor.lastIndexOf("/1");
            const end =
                start === -1 ? -1 : beforeCursor.indexOf("1/", start + 2) + 2;
            console.log(beforeCursor);
            console.log(`${start} , ${end}`);

            if (
                this.FindKeyByValue(this._SpecialChars, text.slice(start, end))
            ) {
                console.log("founded");
                e.preventDefault();
                newText = text.substring(0, start) + text.substring(end);
            }
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

    static TextEmphasis = (text: string): string => {
        text = this.StrongText(text);
        text = this.ItalicText(text);
        text = this.ItalicText(text);
        text = this.BlockQuote(text);

        return text;
    };

    static Headings = (text: string): string => {
        text = this.Heading4(text);
        text = this.Heading3(text);
        text = this.Heading2(text);
        text = this.Heading1(text);

        return text;
    };

    static StrongText = (text: string): string => {
        return text.replace(/\*\*(.+?)\*\*/g, (match, innerText) => {
            return `<strong>${innerText}</strong>`;
        });
    };

    static ItalicText = (text: string): string => {
        return text.replace(/\*(.+?)\*/g, (match, innerText) => {
            return `<i>${innerText}</i>`;
        });
    };
    static ItalicBoldText = (text: string): string => {
        return text.replace(/\*\*\*(.+?)\*\*\*/g, (match, innerText) => {
            return `<strong><i>${innerText}</i></strong>`;
        });
    };

    static Heading1 = (text: string): string => {
        return text.replace(
            new RegExp(`# (.+?)${this._SpecialChars["<br/>"]}`, "g"),
            (match, innerText) => {
                return `<h1 class="text-4xl">${innerText}</h1>`;
            },
        );
    };
    static Heading2 = (text: string): string => {
        return text.replace(
            new RegExp(`## (.+?)${this._SpecialChars["<br/>"]}`, "g"),
            (match, innerText) => {
                return `<h2 class="text-3xl">${innerText}</h2>`;
            },
        );
    };
    static Heading3 = (text: string): string => {
        return text.replace(
            new RegExp(`### (.+?)${this._SpecialChars["<br/>"]}`, "g"),
            (match, innerText) => {
                return `<h3 class="text-2xl">${innerText}</h3>`;
            },
        );
    };
    static Heading4 = (text: string): string => {
        return text.replace(
            new RegExp(`#### (.+?)${this._SpecialChars["<br/>"]}`, "g"),
            (match, innerText) => {
                return `<h4 class="text-xl">${innerText}</h4>`;
            },
        );
    };

    static BlockQuote = (text: string): string => {
        return text.replace(
            new RegExp(`> (.+?)${this._SpecialChars["<br/>"]}`, "g"),
            (match, innerText) => {
                return `<blockquote class="italic font-semibold tracking-tight text-heading">"${innerText}"</blockquote>`;
            },
        );
    };
}
