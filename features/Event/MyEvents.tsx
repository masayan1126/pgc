// app/my-events/MyEventsClient.tsx
"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

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
  currentAttendees: number;
  timeOfDay?: "morning" | "afternoon" | "evening";
  place: string;
  address: string;
  eventDate: string;
}

// 保存されたイベントセットの型定義
interface SavedEventSet {
  morning: Event[];
  afternoon: Event[];
  evening: Event[];
  date: string; // 保存日時
  eventDate: string; // イベント開催日
}

export default function MyEventsClient() {
  const [savedEventSets, setSavedEventSets] = useState<SavedEventSet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const morningPrimaryEvent = savedEventSets.length > 0 ? savedEventSets[0].morning[0] : null
  const afternoonPrimaryEvent = savedEventSets.length > 0 ? savedEventSets[0].afternoon[0] : null
  const eveningPrimaryEvent = savedEventSets.length > 0 ? savedEventSets[0].evening[0] : null


  


  useEffect(() => {
    // コンポーネントがマウントされた時にローカルストレージからデータを取得
    const loadSavedEvents = () => {
      try {
        const savedEventsStr = localStorage.getItem('myEvents');
        if (savedEventsStr) {
          const savedEvents = JSON.parse(savedEventsStr);
          setSavedEventSets(savedEvents);
        }
      } catch (error) {
        console.error('イベントデータの読み込みに失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedEvents();
  }, []);

  // イベントセットの削除
  const handleDeleteEventSet = (index: number) => {
    if (window.confirm('このイベントセットを削除しますか？')) {
      const updatedEventSets = [...savedEventSets];
      updatedEventSets.splice(index, 1);
      setSavedEventSets(updatedEventSets);
      localStorage.setItem('myEvents', JSON.stringify(updatedEventSets));
    }
  };

  // 時間のフォーマット関数
  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // 日付のフォーマット関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date);
  };

  // 保存日時のフォーマット
  const formatSavedDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (isLoading) {
    return <div className="text-center py-10">読み込み中...</div>;
  }

  if (savedEventSets.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="mb-4">保存されたイベントはありません。</p>
        <Link href="/events" className="text-blue-600 hover:underline">
          イベントを選択する
        </Link>
      </div>
    );
  }

  return (
    <div>
      {savedEventSets.map((eventSet, index) => (
        <div key={index} className="mb-10 border rounded-lg overflow-hidden shadow-md">
          <div className="bg-gray-100 p-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">
                イベントセット #{index + 1}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                開催日: {formatDate(eventSet.eventDate)}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-600 mr-2">
                保存日時: {formatSavedDate(eventSet.date)}
              </span>
              <button
                onClick={() => handleDeleteEventSet(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                削除
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* 朝のイベント */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mr-2">朝</span>
                {eventSet.morning.length > 0 ? (
                  <span className="font-medium">選択イベント ({eventSet.morning.length}件)</span>
                ) : (
                  <span className="text-gray-500 italic">予定なし</span>
                )}
              </div>

              {eventSet.morning.length > 0 && (
                <div className="ml-8 space-y-4">
                  {eventSet.morning.map((event, eventIndex) => (
                    <div key={event.id} className="border-b pb-3">
                      <div className="flex items-center mb-1">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full mr-2">
                          {eventIndex + 1}
                        </span>
                        <h3 className="font-medium">{event.name}</h3>
                      </div>
                      <div className="ml-7 mb-2">
                        <p className="text-sm">
                          {formatTime(event.schedule.startTime)} 〜 {formatTime(event.schedule.endTime)}
                        </p>
                        <p className="text-sm mt-1">
                          最大参加可能人数: {event.currentAttendees} / {event.maxAttendees}
                        </p>
                      </div>
                      <div className="ml-7 flex space-x-3">
                        <Link href={event.pageUrl} target="_blank" className="text-blue-600 hover:underline text-sm">
                          詳細ページ
                        </Link>
                        <Link href={event.googleMapsUrl} target="_blank" className="text-blue-600 hover:underline text-sm">
                          マップで見る
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 昼のイベント */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">昼</span>
                {eventSet.afternoon.length > 0 ? (
                  <span className="font-medium">選択イベント ({eventSet.afternoon.length}件)</span>
                ) : (
                  <span className="text-gray-500 italic">予定なし</span>
                )}
              </div>

              {eventSet.afternoon.length > 0 && (
                <div className="ml-8 space-y-4">
                  {eventSet.afternoon.map((event, eventIndex) => (
                    <div key={event.id} className="border-b pb-3">
                      <div className="flex items-center mb-1">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full mr-2">
                          {eventIndex + 1}
                        </span>
                        <h3 className="font-medium">{event.name}</h3>
                      </div>
                      <div className="ml-7 mb-2">
                        <p className="text-sm">
                          {formatTime(event.schedule.startTime)} 〜 {formatTime(event.schedule.endTime)}
                        </p>
                        <p className="text-sm mt-1">
                          最大参加可能人数: {event.maxAttendees}
                        </p>
                      </div>
                      <div className="ml-7 flex space-x-3">
                        <Link href={event.pageUrl} target="_blank" className="text-blue-600 hover:underline text-sm">
                          詳細ページ
                        </Link>
                        <Link href={event.googleMapsUrl} target="_blank" className="text-blue-600 hover:underline text-sm">
                          マップで見る
                        </Link>
                        <Link href={`https://www.google.com/maps/dir/?api=1&origin=${morningPrimaryEvent?.address ? morningPrimaryEvent.address : ''}&destination=${afternoonPrimaryEvent?.address ? afternoonPrimaryEvent.address : ''}`} target="_blank" className="text-blue-600 hover:underline text-sm">
                          朝のイベントの優先度1から昼のイベントの優先度1までのルートを確認する
                        </Link>
                        
                        {/* <p className="text-sm hover:cursor-pointer"></p> */}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 夜のイベント */}
            <div>
              <div className="flex items-center mb-3">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-2">夜</span>
                {eventSet.evening.length > 0 ? (
                  <span className="font-medium">選択イベント ({eventSet.evening.length}件)</span>
                ) : (
                  <span className="text-gray-500 italic">予定なし</span>
                )}
              </div>

              {eventSet.evening.length > 0 && (
                <div className="ml-8 space-y-4">
                  {eventSet.evening.map((event, eventIndex) => (
                    <div key={event.id} className="border-b pb-3">
                      <div className="flex items-center mb-1">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full mr-2">
                          {eventIndex + 1}
                        </span>
                        <h3 className="font-medium">{event.name}</h3>
                      </div>
                      <div className="ml-7 mb-2">
                        <p className="text-sm">
                          {formatTime(event.schedule.startTime)} 〜 {formatTime(event.schedule.endTime)}
                        </p>
                        <p className="text-sm mt-1">
                          最大参加可能人数: {event.maxAttendees}
                        </p>
                      </div>
                      <div className="ml-7 flex space-x-3">
                        <Link href={event.pageUrl} target="_blank" className="text-blue-600 hover:underline text-sm">
                          詳細ページ
                        </Link>
                        <Link href={event.googleMapsUrl} target="_blank" className="text-blue-600 hover:underline text-sm">
                          マップで見る
                        </Link>
                        {/* 会員登録を必須にする */}
                        <Link href={
                          `https://www.google.com/maps/dir/?api=1&origin=${morningPrimaryEvent?.address ? morningPrimaryEvent.address : ''}&destination=${
                            afternoonPrimaryEvent?.address ? afternoonPrimaryEvent.address : ''
                          }&waypoints=${eveningPrimaryEvent?.address ? eveningPrimaryEvent.address : ''}`
                        } target="_blank" className="text-blue-600 hover:underline text-sm">
                          朝のイベントの優先度1から昼のイベントの優先度1を経由して夜のイベントの優先度1までのルートを確認する
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}