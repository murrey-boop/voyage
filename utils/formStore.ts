
import { create } from 'zustand';

interface DocumentStore {
  documents: File[];
  setDocuments: (files: File[]) => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  setDocuments: (files) => set({ documents: files }),
}));
