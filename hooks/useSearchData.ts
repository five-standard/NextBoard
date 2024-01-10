import { create } from "zustand";

interface infoType {
  data: string;
}

interface hookType {
  data: string;
  setData: (data: string) => void;
}

const useSearchData = create<hookType>((set) => ({
  data: "",
  setData: (data: string) => set({ data }),
}));

export default useSearchData;
