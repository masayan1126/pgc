


import {events} from "@/data/eventData"; // ダミーイベントデータをインポート
import EventSelectionClient from '../../features/Event/EventSelection';

// interface Event {
//   id: string;
//   name: string;
//   pageUrl: string;
//   schedule: {
//     startTime: string;
//     endTime: string;
//   };
//   googleMapsUrl: string;
//   maxAttendees: number;
//   // currentAttendees: number;
//   timeOfDay?: "morning" | "afternoon" | "evening"; // 分類用の追加フィールド
// }

export default function EventsPage() {

  // const ngPlaeceNames = [
  //   // "トレカGO!GO!",
  // トレカ専門店ポップタウン
  // ]


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold">イベント選択</h1>
      <p className='mb-4'>※ジムバトル、シニアのみ対象</p>
      
      <EventSelectionClient events={events} />
    
    </div>

  );
}