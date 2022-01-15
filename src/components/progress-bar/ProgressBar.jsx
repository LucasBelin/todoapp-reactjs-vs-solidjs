function ProgressBar({ progressPercent, progressBarPos, accent }) {
  return (
    <div>
      <div className="relative">
        <div className="overflow-hidden h-2px text-xs flex rounded bg-progress">
          <div
            style={{ width: progressPercent, backgroundColor: accent }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all"
          ></div>
        </div>
      </div>

      <div
        style={{ "background-color": accent, left: progressBarPos, "clip-path": "polygon(50% 0, 100% 100%, 0 100%)" }}
        className="h-2 w-1.5 absolute transform -translate-y-2.4 rotate-180 transition-all"
      ></div>
    </div>
  )
}

export default ProgressBar
