'use client';

import { useEffect, useState } from 'react'; // useEffect, useState 추가
import { useMemoStore } from "@/src/store/useMemoStore";
import { Button } from '../ui/Button';

export const MemoList = () => {
    const memos = useMemoStore((state) => state.memos);
    const deleteMemo = useMemoStore((state) => state.deleteMemo);

    //클라이언트 렌더링 확인용 상태
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    },[]);

    // 클라이언트가 아닐 때는 아무것도 렌더링하지 않음 (Hydration 에러 방지)
    if (!isClient) return null;
   

    return (
        <div className="w-full max-w-4xl mx-auto mt-10 p-6 bg-[#74b574] border-[12px] border-[#7d5a44] rounded-sm shadow-2xl min-h-[400px] relative">
            <h4 className="text-white text-center mb-8 border border-white/30 inline-block px-4 py-1 mx-auto block w-fit">
                메모를 입력해주세요
            </h4>
            <div className="flex flex-wrap gap-4">
                {memos.map((memo) => (
                    <div key={memo.id}
                         className="w-44 h-44 bg-[#ffffcc] p-3 shadow-lg flex flex-col
                                    transition-transform duration-300 ease-in-out 
                                    hover:scale-105"
                        >
                        {/* 1. 상단 영역: 삭제 버튼을 오른쪽으로 정렬 */}
                        <div className="flex justify-end mb-2">
                            <Button onClick={() => deleteMemo(memo.id)} variant="danger">삭제</Button>
                        </div>

                        {/* 2. 하단 텍스트 영역: 위아래 여백을 유지하며 스크롤 발생 */}
                        <div className="flex-1 overflow-y-auto pr-1 text-gray-800 break-words text-sm leading-snug custom-scrollbar">
                            {memo.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}