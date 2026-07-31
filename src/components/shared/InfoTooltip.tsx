export default function InfoTooltip({ text }: { text: string }) {
    return (
        <span className="relative inline-flex group">
            <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-gray-400/80 hover:bg-gray-300 text-gray-900 text-[11px] font-bold cursor-help transition-colors duration-150 select-none">
                !
            </span>

            <span
                role="tooltip"
                className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-20"
            >
                <span className="block max-w-55 whitespace-normal text-center bg-gray-800 text-gray-100 text-xs leading-snug px-3 py-2 rounded-lg shadow-lg shadow-black/30 ring-1 ring-white/10">
                    {text}
                </span>
                <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 rotate-45 bg-gray-800 ring-1 ring-white/10" />
            </span>
        </span>
    );
}
