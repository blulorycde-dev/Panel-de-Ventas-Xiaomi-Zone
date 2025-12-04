export interface NoteDraft {
  id: string;
}

export function useNotes() {
  return {
    currentNote: null as NoteDraft | null,
    startNewNote: () => {},
    clearNote: () => {}
  };
}
