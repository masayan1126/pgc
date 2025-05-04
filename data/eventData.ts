// app/data/events.ts

import { Event } from '../types/event';

// ダミーイベントデータ（定数）
export const events: Event[] = [

  {
    id: "1",
    name: "デッキそのままバトル ～イーブイゲットだぜ～ in ポケモンセンター／オープン",
    pageUrl: "https://players.pokemon-card.com/event/detail/661429/1/10896/20250511/1402594",
    schedule: {
      startTime: "2025-05-11T10:00:00",
      endTime: "2025-05-11T14:40:00",
    },
    googleMapsUrl: "https://www.google.com/maps/dir//%E3%80%92530-8202+%E5%A4%A7%E9%98%AA%E5%BA%9C%E5%A4%A7%E9%98%AA%E5%B8%82%E5%8C%97%E5%8C%BA%E6%A2%85%E7%94%B03-1-1%E3%80%80%E5%A4%A7%E4%B8%B8%E6%A2%85%E7%94%B0%E5%BA%97%E3%80%8013%E9%9A%8E/@34.7018022,135.4139927,20997m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
    maxAttendees: 24,
    timeOfDay: "morning",
    place: "ポケモンカードステーション・ポケモンセンターオーサカ",
    address: "〒530-8202 大阪府大阪市北区梅田3-1-1　大丸梅田店　13階",
  },
  {
    id: "2",
    name: "デッキそのままバトル　オープン",
    pageUrl: "https://players.pokemon-card.com/event/detail/695702/1/20857/20250511/1447437",
    schedule: {
      startTime: "2025-05-11T11:00:00",
      endTime: "2025-05-11T12:00:00",
    },
    googleMapsUrl: "https://www.google.com/maps/dir//34.816622,135.563828/@34.816622,135.563828,16z",
    maxAttendees: 32,
    timeOfDay: "morning",
    place: "トレカGO!GO!",
    address: "〒567-0888 大阪府茨木市駅前１丁目３番９号　生田ビル301号",
  },
  {
    id: "3",
    name: "ポケモンカードジム　トレーナーズリーグ（オープンリーグ）",
    pageUrl: "https://players.pokemon-card.com/event/detail/696030/1/18427/20250511/1441503",
    schedule: {
      startTime: "2025-05-11T13:00:00",
      endTime: "2025-05-11T16:00:00",
    },
    googleMapsUrl: "https://www.google.com/maps/dir//34.662985,135.504746/@34.662985,135.504746,16z",
    maxAttendees: 32,
    timeOfDay: "afternoon",
    place: "Bee本舗バトルタワー店",
    address: "〒556-0011 大阪府大阪市浪速区難波中2-1-20",
  },
  {
    id: "4",
    name: "ポケモンカードジム　ジムバトル",
    pageUrl: "https://players.pokemon-card.com/event/detail/696288/1/12120/20250511/1452494",
    schedule: {
      startTime: "2025-05-11T15:00:00",
      endTime: "",
    },
    googleMapsUrl: "https://www.google.com/maps/dir//34.700119,135.559166/@34.700119,135.559166,16z",
    maxAttendees: 32,
    timeOfDay: "afternoon",
    place: "あっぷる 今福店",
    address: "〒536-0002 大阪府大阪市城東区今福東1-11-27",
  },
  {
    id: "5",
    name: "ポケモンカードジム　ジムバトル",
    pageUrl: "https://players.pokemon-card.com/event/detail/696609/1/10920/20250511/1441640",
    schedule: {
      startTime: "2025-05-11T17:00:00",
      endTime: "",
    },
    googleMapsUrl: "https://www.google.com/maps/dir//34.661696,135.505052/@34.661696,135.505052,16z",
    maxAttendees: 32,
    timeOfDay: "evening",
    place: "カードラボ　なんば店",
    address: "〒556-0005 大阪府大阪市浪速区日本橋3-8-16‐1階",
  },
  {
    id: "6",
    name: "ポケモンカードジム　ジムバトル",
    pageUrl: "https://players.pokemon-card.com/event/detail/696704/1/14773/20250511/1427484",
    schedule: {
      startTime: "2025-05-11T17:30:00",
      endTime: "",
    },
    googleMapsUrl: "https://www.google.com/maps/dir//34.65727,135.501331/@34.65727,135.501331,16z",
    maxAttendees: 64,
    timeOfDay: "evening",
    place: "ドラゴンスター日本橋3号店",
    address: "〒556-0012 大阪府大阪市浪速区敷津東2-1-5",
  },
  {
    id: "7",
    name: "ポケモンカードジム　ジムバトル",
    pageUrl: "https://players.pokemon-card.com/event/detail/696787/1/20970/20250511/1449851",
    schedule: {
      startTime: "2025-05-11T18:00:00",
      endTime: "2025-05-11T20:00:00",
    },
    googleMapsUrl: "https://www.google.com/maps/dir//34.706963,135.499077/@34.706963,135.499077,1312m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
    maxAttendees: 32,
    timeOfDay: "evening",
    place: "トレカショップ竜のしっぽ　梅田NU茶屋町店",
    address: "〒530-0013 大阪府大阪市北区茶屋町10番12号　NU茶屋町4F",
  },
  {
    id: "8",
    name: "ポケモンカードジム　ジムバトル",
    pageUrl: "https://players.pokemon-card.com/event/detail/696794/1/10894/20250511/1426676",
    schedule: {
      startTime: "2025-05-11T18:00:00",
      endTime: "2025-05-11T21:00:00",
    },
    googleMapsUrl: "https://www.google.com/maps/dir//34.705231,135.495758/@34.705231,135.495758,16z",
    maxAttendees: 32,
    timeOfDay: "evening",
    place: "トレカショップ竜のしっぽ　大阪梅田店",
    address: "〒530-0012 大阪府大阪市北区芝田2-3-23　メイプルビル芝田2階",
  },
  {
    id: "9",
    name: "ポケモンカードジム　ジムバトル",
    pageUrl: "https://players.pokemon-card.com/event/detail/696848/1/12649/20250511/1439281",
    schedule: {
      startTime: "2025-05-11T19:00:00",
      endTime: "2025-05-11T21:00:00",
    },
    googleMapsUrl: "https://www.google.com/maps/dir//34.720213,135.48206/@34.720213,135.48206,16z",
    maxAttendees: 32,
    timeOfDay: "evening",
    place: "竜星の嵐 十三店",
    address: "〒532-0024 大阪府大阪市淀川区十三本町1丁目5-11アクシア十三本町3F",
  },
]