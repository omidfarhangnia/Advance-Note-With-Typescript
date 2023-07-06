export type Note = {
    id: string;
} & NoteData;

export type RawNote = {
    id: string,
} & RawNoteData

export type RawNoteData = {
    title: string,
    tagsId: string[],
    body: string,
}

export type NoteData = {
    title: string,
    tags: Tag[],
    body: string,
}

export type Tag = {
    id: string;
    label: string;
}