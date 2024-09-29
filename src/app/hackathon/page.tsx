"use client";
import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import GoogleMapComponent from "@/components/MapComponent"; // Google Mapsコンポーネント
import { font } from "@/font/font";
import Link from "next/link";
import UnLoadedPage from "@/components/UnLoadedPage";
import { supabase } from "@/utils/supabase/supabaseClient";

type typeofMarker = {
  lat: number;
  id: string;
  lng: number;
  emoji: string;
};

export default function Map() {
  const [markers, setMarkers] = useState<typeofMarker[]>([]); // マーカー情報を保存する状態

  // マーカーを取得する関数
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("marker").select("*");
        if (error) {
          console.error(
            "データベースからのデータのフェッチに失敗しました",
            error
          );
        } else {
          setMarkers(data || []); // データがない場合は空配列をセット
        }
      } catch (e) {
        console.error("データの取得に失敗しました", e);
      }
    };
    fetchData();
  }, []);

  // Google Maps APIを読み込む
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // 環境変数からAPIキーを取得
  });

  // 地図をクリックした際に新しいマーカーを追加する関数
  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng && isLoaded) {
      const emoji = prompt("絵文字を選んでください: 😊, 😢, 😡, 😍, 😎", "😊"); // ユーザーに絵文字を入力させる
      const newMarker = {
        id: new Date().getTime().toString(),
        lat: event.latLng.lat(), // クリックした場所の緯度
        lng: event.latLng.lng(), // クリックした場所の経度
        emoji: emoji || "😊", // デフォルトで絵文字を設定
      };
      try {
        const { error } = await supabase.from("marker").insert(newMarker); // 非同期でデータ挿入
        if (error) {
          console.error("データベースへの投稿に失敗しました", error);
        } else {
          setMarkers((prevMarkers) => [...prevMarkers, newMarker]); // 新しいマーカーを状態に追加
        }
      } catch (e) {
        console.error("データベースへの投稿に失敗しました", e);
      }
    } else {
      window.alert("位置情報が正しく取得できませんでした");
    }
  };

  if (!isLoaded) return <UnLoadedPage />; // Google Maps APIが読み込まれるまでローディング表示
  // Google Mapsの読み込みに失敗した場合はエラーメッセージを表示
  if (loadError) window.alert("Failed to load Google Maps");

  return (
    <div>
      {/* ヘッダーの表示 */}
      <div className="w-full h-[90px] bg-[#ee9ecc] text-slate-100">
        <span className={`${font.className} flex flex-row justify-between`}>
          <Link href="/" className="text-5xl pt-5 pl-7">
            Emocean
          </Link>
          <span className="flex justify-between mt-8 mr-8">
            <Link href="/map" className="text-3xl">
              map
            </Link>
            <Link href="/share" className="ml-7 text-3xl">
              share
            </Link>
          </span>
        </span>
      </div>

      {/* 地図の表示 */}
      <div className="w-full h-[calc(100vh-90px)]">
        <GoogleMapComponent
          center={{ lat: 35.71014091012368, lng: 139.81063842773438 }} // 現在地を地図の中心に設定。取得できなければ東京をデフォルト
          markers={markers} // マーカー情報を渡す
          onMapClick={handleMapClick} // 地図クリック時に新しいマーカーを追加
          onMarkerClick={() => {}} // マーカークリック時の処理（ここでは未実装）
        />
      </div>
    </div>
  );
}
