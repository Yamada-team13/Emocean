import { GoogleMap, Marker } from "@react-google-maps/api";

// GoogleMapComponentはGoogle Mapとピン（マーカー）を表示するコンポーネント
export default function GoogleMapComponent({
  center,
  markers,
  onMapClick,
  onMarkerClick,
}) {
  // マップのスタイル設定（幅と高さを100%にする）
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }} // 地図の大きさを設定
      zoom={20} // ズームレベルを設定
      center={center} // マップの中心座標を設定（現在地やデフォルトの場所）
      onClick={onMapClick} // 地図クリック時のイベントハンドラー（ピンを追加する）
    >
      {/* markers配列に基づいてピンを描画 */}
      {markers.map((marker, index) => (
        <Marker
          key={index} // マーカーごとの一意のキー
          position={{ lat: marker.lat, lng: marker.lng }} // マーカーの座標を設定
          label={{
            text: marker.emoji, // マーカーに絵文字をラベルとして表示
            fontSize: "32px", // ラベルのフォントサイズを設定
          }}
          // マーカークリックで削除を実行
          onClick={() => onMarkerClick(index)}
        />
      ))}
    </GoogleMap>
  );
}
