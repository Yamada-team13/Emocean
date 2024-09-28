"use client";

import React, { useEffect, useState } from "react";
import { font } from "@/font/font";
import Link from "next/link";
import { useLoadScript } from "@react-google-maps/api";
import GoogleMapComponent from "@/components/MapComponent"; // Google Mapsコンポーネント
import useCurrentLocation from "@/hooks/useCurrentLocation"; // 現在地取得フックをインポート
import UnLoadedPage from "@/components/UnLoadedPage";

type Marker = {
  lat: number;
  lng: number;
  emoji: string;
};

export default function Map() {
  // Google Maps APIを読み込む
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // 環境変数からAPIキーを取得
  });

  const [markers, setMarkers] = useState<Marker[]>([]); // マーカー情報を保存する状態
  const { location, locationError } = useCurrentLocation(); // 現在地を取得するカスタムフックを使用

  // 初回レンダリング時にローカルストレージからマーカー情報を読み込む
  useEffect(() => {
    const savedMarkers = localStorage.getItem("markers"); // ローカルストレージに保存されたマーカー情報を取得
    if (savedMarkers) {
      setMarkers(JSON.parse(savedMarkers)); // マーカー情報があれば状態にセット
    }
  }, []);

  if (!isLoaded) return <UnLoadedPage />;
  // 位置情報の取得に失敗した場合はエラーメッセージを表示
  if (locationError) window.alert("Failed to load location");
  // Google Mapsの読み込みに失敗した場合はエラーメッセージを表示
  if (loadError) window.alert("Failed to load Google Maps");

  return (
    <div>
      <div className="w-full h-[90px] bg-[#ee9ecc] text-slate-100">
        <span className={`${font.className} flex flex-row justify-between`}>
          <Link href="/" className="text-5xl pt-5 pl-7">
            Emocean
          </Link>
          <span className="flex justify-between mt-8 mr-12">
            <Link href="/share" className="text-3xl">
              share
            </Link>
            {/* <div className="text-3xl">login</div> */}
          </span>
        </span>
      </div>

      {/* 地図の表示 */}
      <div className="w-full h-[calc(100vh-90px)]">
        <GoogleMapComponent
          center={location || { lat: 35.6762, lng: 139.6503 }} // 現在地を地図の中心に設定。取得できなければ東京をデフォルト
          markers={markers} // マーカー情報を渡す
          onMapClick={() => {}} // 地図クリック時に新しいマーカーを追加
          onMarkerClick={() => {}}
        />
      </div>
    </div>
  );
}
