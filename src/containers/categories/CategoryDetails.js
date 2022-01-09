import React, { useCallback } from "react"

import { TaskDetails, AddModal, DeleteCategoryModal } from "../../components"
import { useToggle } from "../../custom-hooks"

import { MdDelete } from "react-icons/md"
import { AiFillPlusCircle } from "react-icons/ai"

function CategoryDetails({ isOpen, closeDetails, details, deleteCategory, addTask, toggleTask, deleteTask }) {
  const [addTaskModalIsOpen, toggleAddTaskModalIsOpen] = useToggle(false)
  const [deleteCategoryModalIsOpen, toggleDeleteCategoryModalIsOpen] = useToggle(false)

  const handleOpenAddTaskModal = useCallback(() => {
    toggleAddTaskModalIsOpen(true)
  }, [toggleAddTaskModalIsOpen])

  const handleCloseAddTaskModal = useCallback(() => {
    toggleAddTaskModalIsOpen(false)
  }, [toggleAddTaskModalIsOpen])

  const handleOpenAddCategoryModal = useCallback(() => {
    toggleDeleteCategoryModalIsOpen(true)
  }, [toggleDeleteCategoryModalIsOpen])

  const handleCloseDeleteCategoryModal = useCallback(() => {
    toggleDeleteCategoryModalIsOpen(false)
  }, [toggleDeleteCategoryModalIsOpen])

  const handleDeleteCategory = useCallback(() => {
    toggleDeleteCategoryModalIsOpen(false)
    deleteCategory(details.id)
    closeDetails()
  }, [details, toggleDeleteCategoryModalIsOpen, deleteCategory, closeDetails])

  function addTaskToCategory(taskLabel) {
    addTask(taskLabel, details.id)
  }

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

      <div className="my-8 flex items-center justify-center gap-4">
        <AiFillPlusCircle onClick={handleOpenAddTaskModal} color="#ffffff" size={22} />
        <h1 className="uppercase text-white text-xl font-medium"> {details.name} </h1>
        <MdDelete onClick={handleOpenAddCategoryModal} color="#ef4444" size={22} />
      </div>

      <div className="w-full flex flex-col gap-2 overflow-y-scroll flex-1">
        {details.tasks.map((task, idx) => {
          return <TaskDetails key={task.id} task={task} separator={idx < details.tasks.length - 1} toggleTask={toggleTask} deleteTask={deleteTask} />
        })}
      </div>

      <AddModal
        isOpen={addTaskModalIsOpen}
        closeModal={handleCloseAddTaskModal}
        inputPlaceholder="Task description"
        callback={addTaskToCategory}
        categoryId={details.id}
      />

      <DeleteCategoryModal isOpen={deleteCategoryModalIsOpen} closeModal={handleCloseDeleteCategoryModal} deleteCategory={handleDeleteCategory} />
    </div>
  )
}

export default CategoryDetails
