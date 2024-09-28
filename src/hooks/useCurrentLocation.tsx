import { useState, useEffect } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface LocationError {
  message: string;
}

// 現在地を取得するカスタムフック。位置情報が利用可能なら現在地を取得する
export default function useCurrentLocation() {
  const [location, setLocation] = useState<Location | null>(null); // 現在地を格納する状態
  const [error, setError] = useState<string | null>(null); // エラーメッセージを格納する状態

  // 初回レンダリング時に実行する処理
  useEffect(() => {
    // ブラウザがGeolocation APIをサポートしているか確認
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser"); // サポートしていない場合はエラーメッセージを設定
      return;
    }

    // 現在地の取得に成功した場合の処理
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords; // 緯度・経度を取得
      setLocation({ lat: latitude, lng: longitude }); // 取得した位置を状態にセット
    };

    // 現在地の取得に失敗した場合の処理
    const handleError = (err: GeolocationPositionError) => {
      setError(`Failed to retrieve location: ${err.message}`); // エラーメッセージを設定
    };

    // 現在地を取得
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []); // 初回レンダリング時のみ実行

  return { location, error }; // 現在地とエラー情報を返す
}
