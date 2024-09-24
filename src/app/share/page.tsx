import { font } from "@/font/font";
import Link from "next/link";

export default function Map() {
  return (
    <div>
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
      <h1>share</h1>
    </div>
  );
}
