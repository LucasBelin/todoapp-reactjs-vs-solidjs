import React, { useState, useEffect } from "react"
import { useToggle } from "../../custom-hooks"
import { Task } from "../../components"
import { BsChevronDown } from "react-icons/bs"

function Tasks({ data }) {
  const [tasks, setTasks] = useState([])
  const [showCompleted, toggleShowCompleted] = useToggle(true)
  const [sortByMostRecent, toggleSortByMostRecent] = useToggle(true)

  useEffect(() => {
    setTasks(getTasks())
    // eslint-disable-next-line
  }, [data, showCompleted, sortByMostRecent])

  function getTasks() {
    let tasks = []
    data.forEach((category) => {
      tasks.push(...category.tasks)
    })

    if (!showCompleted) {
      tasks = tasks.filter((task) => !task.completed)
    }

    if (sortByMostRecent) {
      tasks.sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
    }

    if (!sortByMostRecent) {
      tasks.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })
    }

    return tasks
  }

  return (
    <div className="flex flex-col gap-4 w-full overflow-y-scroll">
      <div className="flex justify-between">
        <div onClick={toggleSortByMostRecent} className="flex items-center gap-2">
          <h2 className="select-none uppercase text-fontAlt font-semibold tracking-wider">{sortByMostRecent ? "most" : "least"} recent tasks</h2>
          <div style={{ transform: sortByMostRecent ? "rotate(0deg)" : "rotate(180deg)" }} className="transition-all">
            <BsChevronDown color="#9BB3FB" />
          </div>
        </div>
        <span onClick={toggleShowCompleted} className="bg-darkBlue hover:bg-darkBlueHover text-fontAlt text-sm rounded-full px-3 py-1 select-none">
          {showCompleted ? "Show completed" : "Hide completed"}
        </span>
      </div>

      {tasks.length === 0 && (
        <div className="flex gap-2 items-center justify-center bg-darkBlue rounded-xl shadow-lg px-4 py-2">
          <h3 className="text-white">You don't have any tasks</h3>
        </div>
      )}
    </div>
  )
}

export default Tasks
