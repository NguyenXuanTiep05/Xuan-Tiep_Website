export class Markdown {
    static specialCharacters: Record<string, string> = {
        "<br/>": "/break111s",
    };

    static FormatText = (text: string) => {
        text = this.StrongText(text);
        text = this.FormatSpecialChars(text, this.specialCharacters);
        return text;
    };

    static HandleKeyDown = (
        e: React.KeyboardEvent<HTMLTextAreaElement>,
        [text, setText]: [string, (value: string) => void],
    ) => {
        const textarea = e.currentTarget;
        if (e.key === "Enter") {
            e.preventDefault();
            textarea.value += this.specialCharacters["<br/>"];
            setText(text + this.specialCharacters["<br/>"]);
        } else if (e.ctrlKey && e.key === "Backspace") {
            const textarea = e.currentTarget;
            const cursorPos = textarea.selectionStart;
            const beforeCursor = text.slice(0, cursorPos);

            const markers = Object.values(this.specialCharacters);
            const matchedMarker = markers.find((marker) =>
                beforeCursor.endsWith(marker),
            );

            if (matchedMarker) {
                e.preventDefault();
                const newText =
                    text.slice(0, cursorPos - matchedMarker.length) +
                    text.slice(cursorPos);
                setText(newText);

                requestAnimationFrame(() => {
                    textarea.selectionStart = textarea.selectionEnd =
                        cursorPos - matchedMarker.length;
                });
            }
        }
    };

    static FindKeyByValue = (
        record: Record<string, string>,
        value: string,
    ): boolean => {
        return Object.entries(record).some(([key, val]) => val === value);
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

    static StrongText = (text: string): string => {
        return text.replace(/\*\*(.+?)\*\*/g, (match, innerText) => {
            return `<strong>${innerText}</strong>`;
        });
    };
}
