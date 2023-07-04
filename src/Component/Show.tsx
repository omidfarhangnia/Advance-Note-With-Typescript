import { note } from "./projectTypes";

type showProps = {
  selectedNote: note;
};

export default function Show({ selectedNote }: showProps) {
  return (
    <div>
      {selectedNote.id} / {selectedNote.title} / {selectedNote.body}
    </div>
  );
}
