// app/events/EventSelectionClient.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// イベントの型定義
interface Event {
  id: string;
  name: string;
  pageUrl: string;
  schedule: {
    startTime: string;
    endTime: string;
  };
  googleMapsUrl: string;
  maxAttendees: number;
  // currentAttendees: number;
  timeOfDay?: "morning" | "afternoon" | "evening";
  place: string; // 場所情報を追加,
  address: string; // 住所情報を追加
}

// プロップスの型定義
interface EventSelectionClientProps {
  events: Event[];
}

export default function EventSelectionClient({ events }: EventSelectionClientProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  
  // 選択イベントの状態を配列に変更
  const [selectedEvents, setSelectedEvents] = useState<{
    morning: string[];
    afternoon: string[];
    evening: string[];
  }>({
    morning: [],
    afternoon: [],
    evening: []
  });

  // 利用可能な日付を取得（イベントのstartTimeから抽出）
  useEffect(() => {
    const uniqueDates = new Set<string>();
    
    events.forEach(event => {
      // startTimeからYYYY-MM-DD形式の日付を抽出
      const date = new Date(event.schedule.startTime);
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD形式に変換
      uniqueDates.add(dateString);
    });
    
    const dates = Array.from(uniqueDates).sort();
    setAvailableDates(dates);
    
    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  }, [events]);

  // ステップごとのタイトル
  const stepTitles = {
    1: "ステップ1: 朝のイベントを選択（任意）",
    2: "ステップ2: 昼のイベントを選択（任意）",
    3: "ステップ3: 夜のイベントを選択（任意）",
  };

  // 現在のステップと選択した日付に応じたイベントの表示
  const currentEvents = events.filter(event => {
    // イベントの日付を抽出（YYYY-MM-DD形式）
    const eventDate = new Date(event.schedule.startTime).toISOString().split('T')[0];
    console.log(eventDate, event.name);
    
    
    
    // 選択した日付と一致するかチェック
    if (selectedDate && eventDate !== selectedDate) {
      return false;
    }
    
    // 時間帯に応じたフィルタリング
    if (currentStep === 1) return event.timeOfDay === "morning";
    if (currentStep === 2) return event.timeOfDay === "afternoon";
    if (currentStep === 3) return event.timeOfDay === "evening";
    return false;
  });

  // 日付変更ハンドラー
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };

  // 日付のフォーマット関数（YYYY-MM-DD → 年月日の日本語表記）
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  // イベント選択/選択解除の処理
  const toggleEventSelection = (eventId: string) => {
    if (currentStep === 1) {
      // 朝のイベント
      const morningEvents = [...selectedEvents.morning];
      const index = morningEvents.indexOf(eventId);
      
      if (index === -1) {
        // 選択されていない場合は追加
        morningEvents.push(eventId);
      } else {
        // すでに選択されている場合は削除
        morningEvents.splice(index, 1);
      }
      
      setSelectedEvents({ ...selectedEvents, morning: morningEvents });
    } else if (currentStep === 2) {
      // 昼のイベント
      const afternoonEvents = [...selectedEvents.afternoon];
      const index = afternoonEvents.indexOf(eventId);
      
      if (index === -1) {
        afternoonEvents.push(eventId);
      } else {
        afternoonEvents.splice(index, 1);
      }
      
      setSelectedEvents({ ...selectedEvents, afternoon: afternoonEvents });
    } else if (currentStep === 3) {
      // 夜のイベント
      const eveningEvents = [...selectedEvents.evening];
      const index = eveningEvents.indexOf(eventId);
      
      if (index === -1) {
        eveningEvents.push(eventId);
      } else {
        eveningEvents.splice(index, 1);
      }
      
      setSelectedEvents({ ...selectedEvents, evening: eveningEvents });
    }
  };

  // 次のステップへ進む
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // 最終ステップ完了時の処理
      // 少なくとも1つのイベントが選択されているか確認
      if (
        selectedEvents.morning.length === 0 && 
        selectedEvents.afternoon.length === 0 && 
        selectedEvents.evening.length === 0
      ) {
        alert('少なくとも1つのイベントを選択してください。');
        return;
      }

      // 選択されたイベントオブジェクトを取得
      const morningEvents = selectedEvents.morning.map(id => 
        events.find(e => e.id === id)
      ).filter(Boolean) as Event[];
      
      const afternoonEvents = selectedEvents.afternoon.map(id => 
        events.find(e => e.id === id)
      ).filter(Boolean) as Event[];
      
      const eveningEvents = selectedEvents.evening.map(id => 
        events.find(e => e.id === id)
      ).filter(Boolean) as Event[];
      
      // 選択されたイベントをローカルストレージに保存
      const selectedFullEvents = {
        morning: morningEvents,
        afternoon: afternoonEvents,
        evening: eveningEvents,
        date: new Date().toISOString(), // 保存日時
        eventDate: selectedDate // イベント開催日
      };
      
      // すでに保存されているイベントを取得
      const savedEventsStr = localStorage.getItem('myEvents');
      const savedEvents = savedEventsStr ? JSON.parse(savedEventsStr) : [];
      
      // 新しい選択をリストに追加
      savedEvents.push(selectedFullEvents);
      
      // 更新したリストを保存
      localStorage.setItem('myEvents', JSON.stringify(savedEvents));
      
      // マイイベントページへ遷移
      router.push('/my-events');
    }
  };

  // 前のステップに戻る
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 現在のステップの選択済みイベントIDリスト
  const currentSelectedEventIds = 
    currentStep === 1 ? selectedEvents.morning :
    currentStep === 2 ? selectedEvents.afternoon :
    selectedEvents.evening;

  // 時間のフォーマット関数
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <>
      {/* ステッパー */}
      <div className="mb-10">
        <div className="flex items-center justify-center">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === currentStep 
                    ? 'bg-blue-600 text-white' 
                    : step < currentStep 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-700'
                }`}
              >
                {step < currentStep ? '✓' : step}
              </div>
              {step < 3 && (
                <div 
                  className={`h-1 w-16 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">
            {stepTitles[currentStep as keyof typeof stepTitles]}
          </h2>
          <p className="mt-2">
            複数のイベントを選択することができます。優先順位は上から順になります。
          </p>
        </div>
      </div>

      {/* 日付選択 */}
      <div className="mb-8">
        <div className="max-w-md mx-auto">
          <label htmlFor="date-select" className="block text-sm font-medium mb-2">
            日付を選択
          </label>
          <select
            id="date-select"
            value={selectedDate}
            onChange={handleDateChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {availableDates.map(date => (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* イベント一覧 */}
      {currentEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {currentEvents.map((event) => (
            <div 
              key={event.id}
              className={`border rounded-lg overflow-hidden shadow-md cursor-pointer transition-all ${
                currentSelectedEventIds.includes(event.id)
                  ? 'ring-2 ring-blue-500' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => toggleEventSelection(event.id)}
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
                
                <div className="mb-3">
                  <p className="text-sm">
                    {formatDateTime(event.schedule.startTime)} 〜 {formatDateTime(event.schedule.endTime)}
                  </p>
                  <p className="text-sm mt-1">
                    最大参加可能人数: {event.maxAttendees}
                  </p>
                  <p className="text-sm mt-1">
                    場所: {event.place}
                  </p>
                  <p className="text-sm mt-1">
                    住所: {event.address}
                  </p>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Link 
                    href={event.pageUrl}
                    className="text-blue-600 hover:underline text-sm"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()} // クリックイベントの伝播を停止
                  >
                    詳細ページ
                  </Link>
                  <Link 
                    href={event.googleMapsUrl}
                    className="text-blue-600 hover:underline text-sm"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()} // クリックイベントの伝播を停止
                  >
                    マップで見る
                  </Link>
                </div>
              </div>
              
              <div className="p-4 border-t">
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    event.timeOfDay === 'morning' ? 'bg-yellow-100 text-yellow-800' :
                    event.timeOfDay === 'afternoon' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {event.timeOfDay === 'morning' ? '朝' :
                     event.timeOfDay === 'afternoon' ? '昼' : '夜'}
                  </span>
                  
                  
                  {currentSelectedEventIds.includes(event.id) && (
                    <div className="flex items-center">
                      <span className="text-sm mr-1">優先度:</span>
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {currentSelectedEventIds.indexOf(event.id) + 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            選択された日付の{currentStep === 1 ? '朝' : currentStep === 2 ? '昼' : '夜'}のイベントはありません。
          </p>
          <p className="text-gray-600 mt-2">
            別の日付を選択するか、次のステップに進んでください。
          </p>
        </div>
      )}

      {/* ナビゲーションボタン */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded ${
            currentStep === 1 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          前のステップ
        </button>
        
        <button
          onClick={handleNextStep}
          className={`px-4 py-2 rounded ${
            currentStep === 3
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {currentStep === 3 ? '選択を完了する' : '次のステップ'}
        </button>
      </div>

      {/* 選択済みイベントの表示 */}
      {(selectedEvents.morning.length > 0 || 
        selectedEvents.afternoon.length > 0 || 
        selectedEvents.evening.length > 0) && (
        <div className="mt-12 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">選択済みイベント ({formatDate(selectedDate)})</h3>
          
          {/* 朝のイベント */}
          {selectedEvents.morning.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mr-2">朝</span>
                <span className="font-medium">選択イベント ({selectedEvents.morning.length}件)</span>
              </div>
              
              <div className="ml-8 space-y-3">
                {selectedEvents.morning.map((eventId, index) => {
                  const event = events.find(e => e.id === eventId);
                  if (!event) return null;
                  
                  return (
                    <div key={eventId} className="border-b pb-2">
                      <div className="flex items-center">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full mr-2">
                          {index + 1}
                        </span>
                        <span className="font-medium">{event.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-7">
                        {formatDateTime(event.schedule.startTime)} 〜 
                        {formatDateTime(event.schedule.endTime)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* 昼のイベント */}
          {selectedEvents.afternoon.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">昼</span>
                <span className="font-medium">選択イベント ({selectedEvents.afternoon.length}件)</span>
              </div>
              
              <div className="ml-8 space-y-3">
                {selectedEvents.afternoon.map((eventId, index) => {
                  const event = events.find(e => e.id === eventId);
                  if (!event) return null;
                  
                  return (
                    <div key={eventId} className="border-b pb-2">
                      <div className="flex items-center">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full mr-2">
                          {index + 1}
                        </span>
                        <span className="font-medium">{event.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-7">
                        {formatDateTime(event.schedule.startTime)} 〜 
                        {formatDateTime(event.schedule.endTime)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* 夜のイベント */}
          {selectedEvents.evening.length > 0 && (
            <div>
              <div className="flex items-center mb-3">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-2">夜</span>
                <span className="font-medium">選択イベント ({selectedEvents.evening.length}件)</span>
              </div>
              
              <div className="ml-8 space-y-3">
                {selectedEvents.evening.map((eventId, index) => {
                  const event = events.find(e => e.id === eventId);
                  if (!event) return null;
                  
                  return (
                    <div key={eventId} className="border-b pb-2">
                      <div className="flex items-center">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full mr-2">
                          {index + 1}
                        </span>
                        <span className="font-medium">{event.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 ml-7">
                        {formatDateTime(event.schedule.startTime)} 〜 
                        {formatDateTime(event.schedule.endTime)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}