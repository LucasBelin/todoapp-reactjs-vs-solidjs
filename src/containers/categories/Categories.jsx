import { For } from "solid-js"

import { data } from "../../stores/store"
import { Category } from "../../components"

import { RiSystemAddFill } from "solid-icons/ri"

function Categories() {
  return (
    <div className="flex flex-col self-stretch">
      <div className="flex justify-between items-center">
        <h2 className="select-none uppercase text-fontAlt font-semibold tracking-wider">Categories</h2>
        <span className="bg-darkBlue hover:bg-darkBlueHover text-fontAlt text-sm rounded-full px-3 py-1 select-none">Add category</span>
      </div>

      {data().length === 0 && (
        <div className="flex gap-2 items-center self-start bg-darkBlue transition-all hover:bg-darkBlueHover rounded-xl shadow-lg px-4 py-2 mt-3">
          <RiSystemAddFill color="white" size={22} />
          <h3 className="text-white">Add a category</h3>
        </div>
      )}

      <div className="overflow-x-scroll h-32 flex gap-4 items-center">
        <For each={data()}>
          {(category) => (
            <Category
              // category={{ ...category, tasks: [...category.tasks] }}
              category={category}
            />
          )}
        </For>
      </div>
    </div>
  )
}

export default Categories
