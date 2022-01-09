import React from "react"
import Modal from "./Modal"

function ModalDeleteCategory({ isOpen, closeModal, deleteCategory }) {
  return (
    <Modal isOpen={isOpen}>
      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-90 rounded-t-3xl">
        <div className="bg-darkBlue rounded-xl px-5 py-3 flex flex-col items-center gap-3 shadow-md">
          <h3 className="text-white text-lg text-center font-semibold">Delete category ?</h3>
          <h4 className="text-white text-md text-center -mt-2">All the tasks will be deleted.</h4>

          <div className="flex gap-6 items-center justify-between w-full">
            <button className="text-white capitalize" onClick={closeModal}>
              no
            </button>
            <button className="text-red-500 font-semibold capitalize" onClick={deleteCategory}>
              yes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDeleteCategory
