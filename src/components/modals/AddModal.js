import React, { useRef, useCallback } from "react"
import Modal from "./Modal"
import { AiOutlineClose } from "react-icons/ai"

function AddModal({ isOpen, closeModal, inputPlaceholder, callback }) {
  const labelRef = useRef()

  const handleAdd = useCallback(() => {
    callback(labelRef.current.value)
    labelRef.current.value = ""
    closeModal()
  }, [callback, closeModal])

  return (
    <Modal isOpen={isOpen}>
      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-90">
        <div className="bg-darkBlue rounded-xl px-5 py-5 pt-11 flex flex-col items-start gap-3 shadow-md relative">
          <button onClick={closeModal} className="text-white absolute top-3 left-3 px-1">
            <AiOutlineClose color="white" />
          </button>
          <div className="flex gap-5 justify-center items-center">
            <input
              ref={labelRef}
              type="text"
              placeholder={inputPlaceholder}
              className="bg-transparent border-0 border-b placeholder-gray-300 placeholder-opacity-70 outline-none text-white"
            />
            <button onClick={handleAdd} className="self-center bg-lightBlue text-white rounded-md px-3 py-1">
              add
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AddModal
