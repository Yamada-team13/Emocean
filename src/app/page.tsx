import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-gradient-to-r"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #ee9ecc 50%, #adf8c6 50%)",
              }}
            />
            <header className="relative z-10 pt-44 px-20 text-center text-white">
              <h1 className="text-6xl font-bold">Emotion Mapper</h1>
              <p className="text-2xl mt-4">
                今の気持ちをみんなとシェアしよう！
              </p>
            </header>
            <section className="relative z-10 p-20 text-center">
              <div className="text-white flex justify-between w-[90%] mx-auto max-w-[800px]">
                <Link
                  href="/map"
                  className="bg-sky-300 p-6 rounded-xl shadow-lg w-[50%] max-w-[300px] mr-10 transform hover:scale-105 transition-transform duration-300"
                >
                  <div>マップを見る</div>
                </Link>
                <Link
                  href="/share"
                  className="bg-orange-300 p-6 rounded-xl shadow-lg w-[50%] max-w-[300px] ml-10 transform hover:scale-105 transition-transform duration-300"
                >
                  <div>感情をシェアする</div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
