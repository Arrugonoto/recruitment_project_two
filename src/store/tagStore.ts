import { create } from 'zustand';
import type { Tag } from '../lib/types/tag';

type State = {
   page: number;
   totalResults: number;
   resultsPerPage: number;
   tags: Tag[];
};

type Action = {
   setPage: (page: number) => void;
   setTags: (tags: State['tags']) => void;
   setResultsPerPage: (resultsPerPage: number) => void;
   setTotalResults: (totalResults: number) => void;
};

export const useTagStore = create<State & Action>(set => ({
   page: 1,
   resultsPerPage: 30,
   totalResults: 0,
   tags: [],
   setTags: (data: Tag[]) => set(() => ({ tags: [...data] })),
   setPage: pageNumber => set(() => ({ page: pageNumber })),
   setResultsPerPage: numOfResults =>
      set(() => ({ resultsPerPage: numOfResults })),
   setTotalResults: numOfTotal => set(() => ({ totalResults: numOfTotal })),
}));
