import { create } from "zustand";

interface infoType {
  token?: string;
  name?: string;
}

interface hookType {
  info: infoType;
  setInfo: (info: infoType) => void;
  delInfo: () => void;
}

const defaultState = {
  token: undefined,
  name: undefined,
};

const useUserInfo = create<hookType>((set) => ({
  info: defaultState,
  setInfo: (info: infoType) => set({ info }),
  delInfo: () => set({ info: defaultState }),
}));

export default useUserInfo;
