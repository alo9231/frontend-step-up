'use client';

import { useState } from "react";
import { useMemoStore } from "@/src/store/useMemoStore";
import { Button } from "../ui/Button";

export const MemoInput = () => {
    const [text, setText] = useState('');
    const addMemo = useMemoStore((state) => state.addMemo); // 스토어에서 함수 가져오기

    const handleSave = () => {
        
        if(!text.trim()) return; // 빈 값 방지

        console.log('저장 버튼 클릭됨! 입력된 내용:', text); // 👈 확인용 로그
        addMemo(text); // 스토어에 저장
        setText(''); // 입력창 비우기
     };

     const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        
        // 100자가 넘어가면 그 즉시 잘라버려서 101자가 되는 것을 방지
        if (value.length <= 100) {
            setText(value);
        } else {
            setText(value.slice(0, 100));
        }
     }

     return(
        <div className="mt-6 p-6 border-2 border-gray-400 rounded-lg bg-white shadow-md w-full max-w-md mx-auto text-center">
            <strong className="text-gray-500 mb-4">간단한 메모앱 입니다.</strong>
            <p className="text-center text-gray-500 mb-4 text-sm">최대 100자까지 메모할 수 있습니다.</p>
                        
            <div className="w-full">
                 <textarea 
                    className="w-full h-24 p-2 border rounded resize-none focus:outline-teal-500"
                    value={text}
                    onChange={handleChange} // 핸들러 사용                  
                    maxLength={100} // 👈 시스템적으로 100자까지만 입력되게 제한
                />
                {/* 입력창 바로 밑, 왼쪽 정렬 카운트 */}
                <div className="flex justify-start mt-1 ml-1 items-center gap-1">
                    <div className="text-base font-black tracking-wider"> {/* text-base(약 16px)와 font-black(가장 두꺼움) 적용 */}
                        <span className={text.length >= 100 ? 'text-red-500' : 'text-teal-500'}>
                            {text.length}
                        </span>
                        <span className="text-gray-400"> / 100</span>
                    </div>
                </div>
            </div>

            {/* 저장 버튼 */}
            <div className="flex justify-end">
                <Button onClick={handleSave} variant="primary">저장</Button>
            </div>
        </div>
     )
}