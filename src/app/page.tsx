"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { font } from "@/font/font";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ページが読み込まれた際にフェードインを開始
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className={`w-full h-screen ${isVisible ? "fade-in" : ""}`}>
        <div className="flex items-center justify-center h-full">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-gradient-to-r min-w-[800px]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #ee9ecc 57%, #adf8c6 43%)",
              }}
            />
            <div className="min-w-[800px]">
              <header className="relative z-10 pt-44 text-center text-white">
                <h1 className={`${font.className} text-[80px] font-bold`}>
                  Emocean
                </h1>
                <p className="text-3xl mt-4">
                  今の気持ちをみんなとシェアしよう！
                </p>
              </header>
              <section className="relative z-10 p-20 text-center">
                <div className="text-white flex justify-between w-[90%] mx-auto max-w-[800px] text-[25px]">
                  <Link
                    href="/map"
                    className="bg-sky-300 px-6 py-4 rounded-xl shadow-lg w-[50%] max-w-[300px] mr-10 transform hover:scale-105 transition-transform duration-300"
                  >
                    <div className="">マップを見る</div>
                  </Link>
                  <Link
                    href="/share"
                    className="bg-orange-300 px-6 py-4 rounded-xl shadow-lg w-[50%] max-w-[300px] ml-10 transform hover:scale-105 transition-transform duration-300"
                  >
                    <div>感情をシェア</div>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
