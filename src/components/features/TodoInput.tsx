// 할 일 추가 : 엔터 키를 누르거나 버튼을 클릭하면 할 일이 추가되는 구조
'use client';

import { useState } from "react";
import { useTodoStore } from "@/src/store/useTodoStore";
import { Button } from "../ui/Button";


export const TodoInput = () => {
    const [text, setText] = useState('');
    const addTodo = useTodoStore((state) => state.addTodo);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text);
        setText('');
    };

    return(
        <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md mx-auto mb-8">
            <input 
                type="text" 
                className="flex-1 p-2 border-2 border-gray-200 rounded-md focus:outline-teal-500 text-gray-700"
                placeholder="할 일을 입력하세요"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" variant="primary">추가</Button>
        </form>
    )
}