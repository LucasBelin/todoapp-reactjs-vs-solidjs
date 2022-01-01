import React from "react"
import CheckMark from "./CheckMark"
import { Separator } from ".."
import { getAccent } from "../../utils"
import { MdDelete } from "react-icons/md"

function TaskDetails({ task, separator, toggleTask, deleteTask }) {
  return (
    <div className="bg-transparent flex flex-col gap-4 mb-6">
      <div className="flex flex-col gap-2">
        <h5 className="text-white text-xs font-light">{task.date}</h5>
        <div
          onClick={() => {
            toggleTask(task.id, task.categoryId)
          }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <CheckMark checked={task.completed} accent={getAccent(1)} />
          <h3 className={`text-white text-md flex-1 truncate pr-1 ${task.completed && "line-through"}`}>{task.label}</h3>
          <MdDelete
            color="#ef4444"
            size={20}
            onClick={(e) => {
              e.stopPropagation()
              deleteTask(task.id)
            }}
          />
        </div>
      </div>
      {separator && <Separator opacity={0.6} />}
    </div>
  )
}

export default TaskDetails
