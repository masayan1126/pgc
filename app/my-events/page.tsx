// app/my-events/page.tsx
// メインページコンポーネント（Server Component）

import MyEvents from "@/features/Event/MyEvents";

export default function MyEventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-10">マイイベント</h1>
      <p className="text-center mb-8">
        あなたが選択したイベントの一覧です。
      </p>
      
      <MyEvents />
      
      
    </div>
  );
}