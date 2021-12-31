import React from "react"
import { AiOutlineCheck } from "react-icons/ai"

function CheckMark({ checked, accent }) {
  return (
    <div style={{ borderColor: accent }} className="w-5 h-5 border-2 rounded-full bg-transparent flex items-center justify-center">
      <div style={{ backgroundColor: accent, borderColor: accent }} className={`rounded-full border transition-all ${!checked && "opacity-0"}`}>
        <AiOutlineCheck size={16} color="white" />
      </div>
    </div>
  )
}

export default CheckMark
