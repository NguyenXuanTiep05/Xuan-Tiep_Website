import TextEditor from "@/components/notes/TextEditor";

const NotesView = () => {
    return (
        <div className="slide-in content-wrapper">
            <div className="w-[50%] h-full">
                <TextEditor />
            </div>
        </div>
    );
};

export default NotesView;
