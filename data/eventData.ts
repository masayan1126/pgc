// app/data/events.ts

import { Event } from '../types/event';

// ダミーイベントデータ（定数）
export const events: Event[] = [
  // 5月1日のイベント
  // 朝のイベント

  {
    id: "evening-0504-3",
    name: "夜の梅田スカイビル見学",
    pageUrl: "https://example.com/events/umeda-sky-night",
    schedule: {
      startTime: "2025-05-04T19:30:00",
      endTime: "2025-05-04T21:30:00",
    },
    googleMapsUrl: "https://maps.google.com/?saddr=current+location&daddr=34.7052,135.4867&dirflg=r",
    maxAttendees: 25,
    timeOfDay: "evening",
    place: "梅田スカイビル",
    address: "〒531-6023 大阪府大阪市北区大淀中1丁目1-88",
  },
  {
    id: "evening-0504-4",
    name: "ナイトフードマーケット in 天王寺",
    pageUrl: "https://example.com/events/night-food-tennoji",
    schedule: {
      startTime: "2025-05-04T18:00:00",
      endTime: "2025-05-04T21:00:00",
    },
    googleMapsUrl: "https://maps.google.com/?saddr=current+location&daddr=34.6516,135.5160&dirflg=r",
    maxAttendees: 50,
    timeOfDay: "evening",
    place: "天王寺",
    address: "〒531-6023 大阪府大阪市北区大淀中1丁目1-88",
    
  },
  {
    id: "evening-0504-5",
    name: "夜の伝統芸能鑑賞 at 松竹座",
    pageUrl: "https://example.com/events/traditional-performance-shochikuza",
    schedule: {
      startTime: "2025-05-04T18:30:00",
      endTime: "2025-05-04T21:00:00",
    },
    googleMapsUrl: "https://maps.google.com/?saddr=current+location&daddr=34.6696,135.5034&dirflg=r",
    maxAttendees: 100,
    timeOfDay: "evening",
    place: "松竹座",
    address: "〒542-0074 大阪府大阪市中央区難波千日前11-6",
  },
  {
    id: "morning-0505-1",
    name: "デッキそのままバトル ～イーブイゲットだぜ～ in ポケモンセンター／オープン",
    pageUrl: "https://players.pokemon-card.com/event/detail/661429/1/10896/20250511/1402594",
    schedule: {
      startTime: "2025-05-11T10:00:00",
      endTime: "2025-05-11T14:40:00",
    },
    googleMapsUrl: "https://maps.google.com/?saddr=current+location&daddr=34.6516,135.5160&dirflg=r",
    maxAttendees: 24,
    timeOfDay: "morning",
    place: "ポケモンカードステーション・ポケモンセンターオーサカ",
    address: "〒530-8202 大阪府大阪市北区梅田3-1-1　大丸梅田店　13階",
  },
  {
    id: "morning-0505-2",
    name: "デッキそのままバトル　オープン",
    pageUrl: "https://players.pokemon-card.com/event/detail/695702/1/20857/20250511/1447437",
    schedule: {
      startTime: "2025-05-11T11:00:00",
      endTime: "2025-05-11T12:00:00",
    },
    googleMapsUrl: "https://maps.google.com/?saddr=current+location&daddr=34.6926,135.4933&dirflg=r",
    maxAttendees: 32,
    timeOfDay: "morning",
    place: "ポケモンセンター",
    address: "〒530-8202 大阪府大阪市北区梅田3-1-1　大丸梅田店　13階",
  },
  {
    id: "morning-0505-3",
    name: "ポケモンカードジム　トレーナーズリーグ（オープンリーグ）",
    pageUrl: "https://players.pokemon-card.com/event/detail/696030/1/18427/20250511/1441503",
    schedule: {
      startTime: "2025-05-11T13:00:00",
      endTime: "2025-05-11T16:00:00",
    },
    googleMapsUrl: "https://maps.google.com/?saddr=current+location&daddr=34.6873,135.5262&dirflg=r",
    maxAttendees: 30,
    timeOfDay: "afternoon",
    place: "ポケモンセンター",
    address: "〒530-8202 大阪府大阪市北区梅田3-1-1　大丸梅田店　13階",
  },
]