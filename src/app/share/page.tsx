"use client";
import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { font } from "@/font/font";
import Link from "next/link";

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const [markers, setMarkers] = useState([]);

  //地図をクリックした際にピンを追加
  const handleMapClick = (event) => {
    const emoji = prompt("好きな絵文字を入力してください: ", "😊");
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      emoji: emoji || "😊", // ユーザーが入力した絵文字をピンに紐付ける
    };
    setMarkers((current) => [...current, newMarker]);
  };

  //GoogleMapsのロードが完了していない場合に表示するローディングメッセージ
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      {/* ヘッダー */}
      <div className="w-full h-[90px] bg-[#ee9ecc] text-slate-100">
        <span className={`${font.className} flex flex-row justify-between`}>
          <Link href="/" className="text-5xl pt-5 pl-7">
            Emocean
          </Link>
          <span className="flex justify-between mt-8 mr-12">
            <Link href="/map" className="text-3xl">
              map
            </Link>
            {/* <div className="text-3xl">login</div> */}
          </span>
        </span>
      </div>

      {/* 地図表示 */}
      <div className="w-full h-[calc(100vh-90px)]">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          zoom={10}
          center={{ lat: 35.6762, lng: 139.6503 }} // 東京の中心座標
          onClick={handleMapClick} // 地図をクリックした際のイベント
        >
          {/* マーカーを描画 */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              label={{
                text: marker.emoji,
                fontSize: "32px",
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}
