import { MemoInput } from "@/src/components/features/MemoInput";
import { MemoList } from "@/src/components/features/MemoList";

export default function HomePage(){
  return (
    <section>
      <h2 className="text-center text-3xl font-bold mb-10">포스트잇 추가, 삭제</h2>

      {/* 칠판 영역 */}
      <MemoList />
      
      {/* 입력 영역 */}
      <MemoInput />
    
    </section>
  )
}