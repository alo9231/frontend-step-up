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
    const [selectedIds, setSelectedIds] = useState<number[]>([]); // 체크박스 : 선택된 항목들을 관리하는 상태   

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

     // 전체 삭제 실행
    const handleAllCheck = () => {
        if(selectedIds.length === todos.length && todos.length !== 0) {           
            setSelectedIds([]);// 이미 다 선택됐다면 전체 해제
        }else{
            setSelectedIds(todos.map(todo => todo.id)); // 아니면 전체 선택
        }
    };
    

    // 개별 체크박스 토글 함수
    const handleCheck = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // 선택 삭제 실행
    const handleDeleteSelected = () => {
        if (selectedIds.length === 0) return alert("삭제할 항목을 선택해주세요!");
        if (confirm("선택한 항목을 삭제할까요?")) {
            selectedIds.forEach(id => deleteTodo(id));
            setSelectedIds([]);
        }
    }

    const handleDeleteAll = () => {
        if (todos.length === 0) return;
        if (confirm("정말 모든 할 일을 삭제하시겠습니까?")) {
            todos.forEach(todo => deleteTodo(todo.id));
            setSelectedIds([]);
        }
    };

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
            {/* 상단 버튼 및 전체 선택 영역 */}
            {todos.length > 0 && (
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    {/* 전체 선택 체크박스 */}
                    <input 
                        type="checkbox" 
                        checked={todos.length > 0 && selectedIds.length === todos.length}
                        onChange={handleAllCheck}
                        className="w-4 h-4 accent-teal-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-400 font-medium">
                        선택됨 <span className="text-teal-500">{selectedIds.length}</span> / {todos.length}
                    </span>
                    <div className="flex gap-2">
                        <Button onClick={handleDeleteSelected} variant="danger" className="text-xs py-1 px-2">선택 삭제</Button>
                        <Button onClick={handleDeleteAll} variant="danger" className="text-xs py-1 px-2">전체 삭제</Button>
                    </div>
                </div>
            )}
            {todos.length === 0 ? (
                <p>할 일이 없습니다. 여유를 즐기세요! ☕</p>
            ) : (
                todos.map((todo) => (
                    <div key={todo.id}
                         className="flex items-start justify-between p-3 bg-white border-b border-gray-100 rounded-lg shadow-sm hover:border-teal-100 transition-color"
                    >
                        {/* --- 왼쪽 체크박스 --- */}
                        <input 
                            type="checkbox" 
                            className="w-5 h-5 mr-3 accent-teal-500 cursor-pointer"
                            checked={selectedIds.includes(todo.id)}
                            onChange={() => handleCheck(todo.id)}
                        />
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