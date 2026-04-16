// 목록 및 토글 삭제 : 체크박스를 누르면 취소선이 생기고, TodoInput > Button의 danger 타입을 사용해 삭제함
'use client';

import { useEffect, useState, useRef } from "react";
import { useTodoStore } from "@/src/store/useTodoStore";
import { Button } from "../ui/Button";

export const TodoList = () => {
    const { todos, deleteTodo, updateTodo, toggleTodo } = useTodoStore(); //구조 분해 할당
    const [isClient, setIsClient] = useState(false);
    const [editId, setEditId] = useState<number | null>(null); // 수정 중인 ID (숫자 또는 null)
    const [editText, setEditText] = useState(''); // 수정 중인 텍스트 (문자열)
    const editRef = useRef<HTMLDivElement>(null); // 포커스를 직접 제어하기 위한 ref

    useEffect(() => {
        setIsClient(true);
    }, []); //마운트 시 한 번만 실행되면 되므로 의존성 배열을 []로 비워둠
    
    // 수정 모드가 활성화(editId 변경)될 때마다 포커스 강제 이동
    useEffect(()=> {
        if(editId !== null && editRef.current) {
            editRef.current.focus();

            // 포커스 시 커서를 끝으로 보내는 로직을 useEffect 안으로 이동 (더 안정적임)
            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(editRef.current);
            range.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(range);
        }
    }, [editId]);

    const handleEditStart = (id: number, text: string) => {
        setEditId(id);
        setEditText(text);
    }

    const handleEditSave = (id: number) => {
        if (!editText.trim()) {
            alert("내용을 입력해주세요 😊 ~!"); return;
        }

        updateTodo(id, editText); // 스토어 업데이트 함수 호출  
        setEditId(null);         // 수정 모드 종료
        setEditText('');        // 상태 초기화 : 문자열 상태에는 **null 대신 ''**을 넣어줘야 함
    }

    if (!isClient) return null;

    return (
        <div className="w-full max-w-me mx-auto space-y-3">
            {todos.length === 0 ? (
                <p>할 일이 없습니다. 여유를 즐기세요! ☕</p>
            ) : (
                todos.map((todo) => (
                    <div key={todo.id}
                         className="flex items-start justify-between p-3 bg-white border-b border-gray-100 rounded-lg shadow-sm hover:border-teal-100 transition-color"
                    >
                        <div className="flex items-start gap-3 flex-1 mr-2">
                            {editId === todo.id ? (
                                // 수정 모드일 때
                                 <div
                                    ref={editRef}
                                    contentEditable
                                    suppressContentEditableWarning={true}
                                    className="w-full flex-1 border-b-2 border-teal-500 outline-none py-1 font-medium text-gray-700 break-all whitespace-pre-wrap leading-relaxed"
                                    role="textbox"
                                    tabIndex={0}
                                    // 중요: 초기값만 넣어주고, 이후 타이핑은 브라우저에 맡김
                                    onInput={(e) => {
                                        setEditText(e.currentTarget.innerText);
                                    }}
                                    onKeyDown={(e) => { 
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleEditSave(todo.id);
                                        }
                                    }}
                                    // dangerouslySetInnerHTML 대신 초기 텍스트 노드로 주입 (가장 안정적)
                                >{todo.text}</div>
                            ) : (
                                // 일반 모드일 때 (수정 전)
                                <>                                   
                                    <div className={`py-1 border-b-2 border-transparent font-medium text-gray-700 break-all whitespace-pre-wrap leading-relaxed ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                                        {todo.text}
                                    </div>
                                </>
                            )}                           
                        </div>
                        
                        <div className="flex gap-2 flex-shrink-0 mt-0.5">
                            {editId === todo.id ? (
                                <Button onClick={()=> handleEditSave(todo.id)} variant="primary">저장</Button>
                            ): (
                                <Button onClick={()=> handleEditStart(todo.id, todo.text)} variant="warning">수정</Button>
                            )}
                            <Button onClick={() => deleteTodo(todo.id)} variant="danger">삭제</Button>        
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};