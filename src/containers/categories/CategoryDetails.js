import React, { useCallback } from "react"

import { TaskDetails, ModalAdd, ModalDeleteCategory } from "../../components"
import { useToggle } from "../../custom-hooks"

import { MdDelete } from "react-icons/md"
import { AiFillPlusCircle } from "react-icons/ai"

function CategoryDetails({ isOpen, closeDetails, details, deleteCategory, addTask, toggleTask, deleteTask }) {
  const [modalAddTaskIsOpen, toggleModalAddTaskIsOpen] = useToggle(false)
  const [modalDeleteCategoryIsOpen, toggleModalDeleteCategoryIsOpen] = useToggle(false)

  const handleAddTask = useCallback(
    (taskLabel) => {
      addTask(taskLabel, details.id)
    },
    [details, addTask],
  )

  const handleOpenAddTaskModal = useCallback(() => {
    toggleModalAddTaskIsOpen(true)
  }, [toggleModalAddTaskIsOpen])

  const handleCloseAddTaskModal = useCallback(() => {
    toggleModalAddTaskIsOpen(false)
  }, [toggleModalAddTaskIsOpen])

  const handleOpenAddCategoryModal = useCallback(() => {
    toggleModalDeleteCategoryIsOpen(true)
  }, [toggleModalDeleteCategoryIsOpen])

  const handleCloseDeleteCategoryModal = useCallback(() => {
    toggleModalDeleteCategoryIsOpen(false)
  }, [toggleModalDeleteCategoryIsOpen])

  const handleDeleteCategory = useCallback(() => {
    toggleModalDeleteCategoryIsOpen(false)
    deleteCategory(details.id)
    closeDetails()
  }, [details, toggleModalDeleteCategoryIsOpen, deleteCategory, closeDetails])

  return (
    <div
      className={`${
        isOpen ? "translate-y-0 shadow-custom" : "translate-y-full"
      } transform bottom-0 bg-darkBlue h-86p w-full rounded-t-3xl absolute left-0 z-50 transition-all flex flex-col px-6 pb-1`}
    >
      <div onClick={closeDetails} className="flex flex-col gap-2 items-center mt-3 self-center">
        <div className="bg-white h-px w-12"></div>
        <div className="bg-white h-px w-6"></div>
      </div>

      <div className="my-8 flex items-center justify-center gap-4 truncate">
        <AiFillPlusCircle onClick={handleOpenAddTaskModal} color="#ffffff" size={22} />
        <h1 className="uppercase text-white text-xl font-medium max-w-[20ch] truncate"> {details.name} </h1>
        <MdDelete onClick={handleOpenAddCategoryModal} color="#ef4444" size={22} />
      </div>

      <div className="w-full flex flex-col gap-2 overflow-y-scroll flex-1">
        {details.tasks.map((task, idx) => {
          return <TaskDetails key={task.id} task={task} separator={idx < details.tasks.length - 1} toggleTask={toggleTask} deleteTask={deleteTask} />
        })}
      </div>

      <ModalAdd isOpen={modalAddTaskIsOpen} closeModal={handleCloseAddTaskModal} inputPlaceholder="Task description" callback={handleAddTask} />

      <ModalDeleteCategory isOpen={modalDeleteCategoryIsOpen} closeModal={handleCloseDeleteCategoryModal} deleteCategory={handleDeleteCategory} />
    </div>
  )
}

export default CategoryDetails
