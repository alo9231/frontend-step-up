export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h2 className="text-4xl font-bold text-teal-600 mb-4">Frontend Step-Up</h2>
      <p className="text-gray-600">여기는 메인 페이지입니다. 메뉴를 통해 이동하세요!</p>
      <a href="/memo" className="mt-6 text-blue-500 underline">메모장 보러가기</a>
    </div>
  );
}