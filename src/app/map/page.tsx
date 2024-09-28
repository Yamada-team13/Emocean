"use client";

import React, { useEffect, useState } from "react";
import { font } from "@/font/font";
import Link from "next/link";
import { useLoadScript } from "@react-google-maps/api";
import GoogleMapComponent from "@/components/MapComponent"; // Google Mapsコンポーネント
import useCurrentLocation from "@/hooks/useCurrentLocation"; // 現在地取得フックをインポート

interface Marker {
  lat: number;
  lng: number;
  emoji: string;
}

export default function Map() {
  // Google Maps APIを読み込む
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY as string;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey, // 環境変数からAPIキーを取得
  });

  const [markers, setMarkers] = useState<Marker[]>([]); // マーカー情報を保存する状態
  const { location, error } = useCurrentLocation(); // 現在地を取得するカスタムフックを使用

  // 初回レンダリング時にローカルストレージからマーカー情報を読み込む
  useEffect(() => {
    const savedMarkers = localStorage.getItem("markers"); // ローカルストレージに保存されたマーカー情報を取得
    if (savedMarkers) {
      setMarkers(JSON.parse(savedMarkers)); // マーカー情報があれば状態にセット
    }
  }, []);

  // マーカー情報をローカルストレージに保存する関数
  const saveMarkersToLocalStorage = (newMarkers: Marker[]) => {
    localStorage.setItem("markers", JSON.stringify(newMarkers)); // マーカー情報をJSON形式で保存
  };

  // 地図をクリックした際に新しいマーカーを追加する関数
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return; // latLngがない場合は何もしない
    const emoji = prompt("絵文字を選んでください: 😊, 😢, 😡, 😍, 😎", "😊"); // ユーザーに絵文字を入力させる
    const newMarker = {
      lat: event.latLng.lat(), // クリックした場所の緯度
      lng: event.latLng.lng(), // クリックした場所の経度
      emoji: emoji || "😊", // デフォルトで絵文字を設定
    };

    const updatedMarkers = [...markers, newMarker]; // 既存のマーカーに新しいマーカーを追加
    setMarkers(updatedMarkers); // マーカー状態を更新
    saveMarkersToLocalStorage(updatedMarkers); // ローカルストレージに新しいマーカーを保存
  };

  // Google Mapsの読み込みが完了していない場合はローディングメッセージを表示
  if (!isLoaded) return <div>Loading...</div>;
  // 位置情報の取得に失敗した場合はエラーメッセージを表示
  if (error) return <div>{error}</div>;

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
          markers={markers} // マーカー情報を渡す
          center={location || { lat: 35.6762, lng: 139.6503 }} // 現在地を地図の中心に設定。取得できなければ東京をデフォルト
          onMapClick={handleMapClick} // 地図クリック時に新しいマーカーを追加
        />
      </div>
    </div>
  );
}
