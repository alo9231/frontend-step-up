import { create } from 'zustand';
import { Memo } from '../types/memo';
import { persist } from 'zustand/middleware';

interface MemoState {
    memos: Memo[];
    addMemo: (content: string) => void;
    deleteMemo: (id: number) => void;
}

export const useMemoStore = create<MemoState>() (
   persist(
        (set) => ({
            memos: [],   
        
            addMemo: (content: string) =>
                set((state) => ({
                    memos: [
                        ...state.memos,
                        { id: Date.now(), content }, // 고유 ID로 현재 시간 사용
                    ],
                })),
            
            deleteMemo: (id: number) =>
                set((state) => ({
                    memos: state.memos.filter((memo) => memo.id !== id),
                })), 
        }),
        {
            name : 'memo-storage', // 로컬 스토리지에 저장될 키 이름
        }
   )   
);