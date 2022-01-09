import React, { useCallback } from "react"

import { Category, ModalAdd } from "../../components"
import { useToggle } from "../../custom-hooks"
import { getAccent } from "../../utils"

import { AiOutlinePlus } from "react-icons/ai"
import { v4 as uuid } from "uuid"

function Categories({ data, setData, openCategoryDetails }) {
  const [modalAddCategoryIsOpen, toggleModalAddCategoryIsOpen] = useToggle(false)

  const handleCloseModal = useCallback(() => {
    toggleModalAddCategoryIsOpen(false)
  }, [toggleModalAddCategoryIsOpen])

  const handleUpdateCategory = useCallback(
    (category) => {
      const categoryIdx = data.findIndex((cat) => cat.id === category.id)
      data[categoryIdx] = category
      setData([...data])
    },
    [data, setData],
  )

  const handleAddCategory = useCallback(
    (name) => {
      if (name.length === 0) return
      const newCategory = { id: uuid(), name: name, accent: getAccent(data.length), tasks: [] }
      data.push(newCategory)
      setData([...data])
      toggleModalAddCategoryIsOpen(false)
    },
    [data, setData, toggleModalAddCategoryIsOpen],
  )

  return (
    <div className="flex flex-col self-stretch">
      <div className="flex justify-between items-center">
        <h2 className="select-none uppercase text-fontAlt font-semibold tracking-wider">Categories</h2>
        <span
          onClick={() => toggleModalAddCategoryIsOpen(true)}
          className="bg-darkBlue hover:bg-darkBlueHover text-fontAlt text-sm rounded-full px-3 py-1 select-none"
        >
          Add category
        </span>
      </div>

      {data.length === 0 && (
        <div
          onClick={() => toggleModalAddCategoryIsOpen(true)}
          className="flex gap-2 items-center self-start bg-darkBlue transition-all hover:bg-darkBlueHover rounded-xl shadow-lg px-4 py-2 mt-3"
        >
          <AiOutlinePlus color="white" size={22} />
          <h3 className="text-white">Add a category</h3>
        </div>
      )}

      <div className="overflow-x-scroll h-32 flex gap-4 items-center">
        {data.map((category) => {
          return (
            <Category
              key={category.id}
              category={{ ...category, tasks: [...category.tasks] }}
              accent={category.accent}
              updateCategory={handleUpdateCategory}
              openCategoryDetails={openCategoryDetails}
            />
          )
        })}
      </div>

      <ModalAdd isOpen={modalAddCategoryIsOpen} closeModal={handleCloseModal} inputPlaceholder="Category name" callback={handleAddCategory} />
    </div>
  )
}

export default Categories
