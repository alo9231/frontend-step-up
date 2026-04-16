import { create } from 'zustand';
import { TodoState } from '../types/todo';
import { persist } from 'zustand/middleware';
import { TodoList } from '../components/features/TodoList';

export const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({

            todos: [],

            // 할 일 추가
            addTodo: (text: string) =>
                set((state) => ({
                    todos: [
                        ...state.todos,
                        { id: Date.now(), text, completed: false },
                    ], 
                })),
            // 완료 상태 토글 (완료 <-> 미완료)
            toggleTodo: (id: number) =>
                set((state) => ({
                    todos: state.todos.map((todo) => 
                        todo.id === id ? { ...todo, completed: !todo.completed } : todo
                    ),
                })),
            
            // 할 일 삭제
            deleteTodo: (id: number) =>
                set((state) => ({
                    todos: state.todos.filter((todo) => todo.id !== id),
                })),   
            
            // 할 일 수정
            updateTodo: (id: number, newText : string) =>
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id ? {...todo, text: newText} : todo
                    ),
                })),          
        }),
        {
            name: 'todo-storage', // 로컬 스토리지에 저장될 키 이름
        }
    )
);
