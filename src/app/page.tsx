"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { font } from "@/font/font";
import Image from "next/image";
import emoceanPicture from "@/public/emocean.jpeg";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ページが読み込まれた際にフェードインを開始
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className={`w-full ${isVisible ? "fade-in-page" : ""}`}>
        <div className="flex items-center justify-center h-full">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-gradient-to-r min-w-[800px]"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #ee9ecc 50%, #adf8c6 50%)",
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
              <section
                className={`${
                  isVisible ? "fade-in-button" : ""
                } relative z-10 p-20 text-center`}
              >
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
                <div
                  className={`${
                    isVisible ? "fade-in-picture" : ""
                  } flex justify-center w-full mx-auto mt-20`}
                >
                  <Image
                    src={emoceanPicture}
                    alt="Application Image"
                    width={600}
                    height={600}
                  />
                </div>
                <div
                  className={`${
                    isVisible ? "fade-in-picture" : ""
                  } bg-gradient-to-b from-[#ee9ecc] to-[#ee9ecc] p-8 shadow-lg rounded-2xl mt-20 flex flex-col items-center w-[90%] mx-auto max-w-[800px] bg-[#f2f6a8] px-10`}
                >
                  <div>
                    <h1
                      className={`${font.className} text-4xl font-bold text-slate-100 text-center mb-6`}
                    >
                      Emoceanで今の気持ちをシェアしよう！
                    </h1>
                  </div>
                  <div className="text-lg text-slate-100 leading-relaxed space-y-4">
                    <p className="text-2xl font-semibold">操作はとても簡単！</p>
                    <p>
                      自分のいる場所をクリックして{" "}
                      <span className="font-bold">絵文字を入力するだけ</span>！
                    </p>
                    <p>他の人が投稿した絵文字を見ることもできるよ！</p>
                    <p>
                      投稿を消したい場合は、投稿をクリックして{" "}
                      <span className="font-bold">削除ボタン</span> を押してね！
                    </p>
                    <p className="text-2xl font-semibold">
                      みんなでEmoceanを使って、気持ちをシェアしよう！
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
