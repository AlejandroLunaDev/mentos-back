export default function TopBanner() {
    return (
      <div className="absolute top-0 left-0 z-10 overflow-hidden">
        <div className="relative w-36 h-36">
          <div
            className="absolute top-[86px] -left-[43px] w-[125%] h-[48px] -rotate-45 origin-top-left
                       bg-gradient-secondary
                       flex flex-col items-center justify-center
                       text-white font-bold shadow-md"
          >
            <span className="text-lg font-bold -rotate-5">Top</span>
            <span className="text-[10px] font-semibold -rotate-5">Más solicitado</span>
          </div>
        </div>
      </div>
    );
  }