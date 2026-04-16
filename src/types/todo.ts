export interface Todo {
    id : number;
    text: string;
    completed: boolean;
}

export interface TodoState {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, newText: string) => void; // 수정 함수
}
