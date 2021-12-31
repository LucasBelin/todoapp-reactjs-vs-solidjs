import React from "react"
import { Category } from "../../components"
import { AiOutlinePlus } from "react-icons/ai"

function Categories({ data }) {
  return (
    <div className="flex flex-col self-stretch">
      <div className="flex justify-between items-center">
        <h2 className="select-none uppercase text-fontAlt font-semibold tracking-wider">Categories</h2>
        <span className="bg-darkBlue hover:bg-darkBlueHover text-fontAlt text-sm rounded-full px-3 py-1 select-none">Add category</span>
      </div>

      {data.length === 0 && (
        <div className="flex gap-2 items-center self-start bg-darkBlue transition-all hover:bg-darkBlueHover rounded-xl shadow-lg px-4 py-2 mt-3">
          <AiOutlinePlus color="white" size={22} />
          <h3 className="text-white">Add a category</h3>
        </div>
      )}

      <div className="overflow-x-scroll h-32 flex gap-4 items-center">
        {data.map((category) => {
          return <Category key={category.id} id={category.id} name={category.name} tasks={[...category.tasks]} accent={category.accent} />
        })}
      </div>
    </div>
  )
}

export default Categories
