import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "85vh",
};

const center = {
  lat: 35.68567249971906,
  lng: 139.83573007150645,
};

// 初期ダミーデータ（初回レンダリング時に使用する）
const initialMarkers = [
  { lat: 35.68567249971906, lng: 139.83573007150645 },
  { lat: 35.689487, lng: 139.691706 },
  { lat: 34.052235, lng: -118.243683 },
];

function ShowMap() {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Google Maps API key is not defined in the environment variables."
    );
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);

  // ページ初回ロード時にlocalStorageからデータを読み込む
  useEffect(() => {
    const storedMarkers = localStorage.getItem("markers");
    if (storedMarkers) {
      // localStorageにデータが存在する場合、それを使用
      setMarkers(JSON.parse(storedMarkers));
    } else {
      // localStorageにデータがない場合、初期ダミーデータを使用
      setMarkers(initialMarkers);
      localStorage.setItem("markers", JSON.stringify(initialMarkers));
    }
  }, []);

  // 地図上でクリックされた場所にマーカーを追加
  const handleMapClick = React.useCallback(
    (event: google.maps.MapMouseEvent) => {
      const newMarker = {
        lat: event.latLng?.lat() || 0,
        lng: event.latLng?.lng() || 0,
      };

      const updatedMarkers = [...markers, newMarker];
      setMarkers(updatedMarkers);

      // localStorageに追加されたマーカーデータを保存
      localStorage.setItem("markers", JSON.stringify(updatedMarkers));
    },
    [markers]
  );

  // マーカーを削除する関数
  const handleMarkerDelete = (index: number) => {
    const updatedMarkers = markers.filter((_, i) => i !== index);
    setMarkers(updatedMarkers);

    // localStorageに削除後のマーカーデータを保存
    localStorage.setItem("markers", JSON.stringify(updatedMarkers));
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onClick={handleMapClick} // 地図上のクリックを監視してマーカーを追加
    >
      {/* Child components, such as markers, info windows, etc. */}
      {markers.map((marker, index) => (
        <MarkerF
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          onDblClick={() => handleMarkerDelete(index)} // ダブルクリックでマーカーを削除
        ></MarkerF>
      ))}

      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(ShowMap);
