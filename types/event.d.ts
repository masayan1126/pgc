
export interface Event {
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
  timeOfDay?: "morning" | "afternoon" | "evening"; // 分類用の追加フィールド
  place: string; // 場所情報を追加,
  address: string; // 住所情報を追加
}