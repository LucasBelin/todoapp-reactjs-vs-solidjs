import React from "react"

function Separator({ opacity = 1 }) {
  return <div style={{ opacity: opacity }} className="h-px bg-white rounded-full w-full"></div>
}

export default Separator
