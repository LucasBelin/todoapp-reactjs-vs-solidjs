import React from "react"

function Modal({ isOpen, children }) {
  if (!isOpen) return null

  return <div className="z-50">{children}</div>
}

export default Modal
