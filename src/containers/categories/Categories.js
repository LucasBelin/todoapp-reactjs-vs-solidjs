import React from "react"

import { Category, AddModal } from "../../components"
import { useToggle } from "../../custom-hooks"
import { getAccent } from "../../utils"

import { AiOutlinePlus } from "react-icons/ai"
import { v4 as uuid } from "uuid"

function Categories({ data, setData, openCategoryDetails }) {
  const [addModalIsOpen, toggleAddModalIsOpen] = useToggle(false)

  function updateCategory(category) {
    const categoryIdx = data.findIndex((cat) => cat.id === category.id)
    data[categoryIdx] = category
    setData([...data])
  }

  function addCategory(name) {
    if (name.length === 0) return
    const newCategory = { id: uuid(), name: name, accent: getAccent(data.length), tasks: [] }
    data.push(newCategory)
    setData([...data])
  }

  return (
    <div className="flex flex-col self-stretch">
      <div className="flex justify-between items-center">
        <h2 className="select-none uppercase text-fontAlt font-semibold tracking-wider">Categories</h2>
        <span
          onClick={() => toggleAddModalIsOpen(true)}
          className="bg-darkBlue hover:bg-darkBlueHover text-fontAlt text-sm rounded-full px-3 py-1 select-none"
        >
          Add category
        </span>
      </div>

      {data.length === 0 && (
        <div
          onClick={() => toggleAddModalIsOpen(true)}
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
              id={category.id}
              name={category.name}
              tasks={[...category.tasks]}
              accent={category.accent}
              updateCategory={updateCategory}
              openCategoryDetails={openCategoryDetails}
            />
          )
        })}
      </div>

      <AddModal isOpen={addModalIsOpen} closeModal={() => toggleAddModalIsOpen(false)} inputPlaceholder="Category name" callback={addCategory} />
    </div>
  )
}

export default Categories
