import TextEditor from "@/components/notes/TextEditor";

const NotesView = () => {
    return (
        <div className="slide-in content-wrapper">
            <div className="w-full h-full">
                <TextEditor />
            </div>
        </div>
    );
};

export default NotesView;
