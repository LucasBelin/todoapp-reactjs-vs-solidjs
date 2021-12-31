import React, { useState, useEffect } from "react"

function Category({ id, name, accent, tasks }) {
  const [taskCount, setTaskCount] = useState(tasks.length)
  const [taskCompletedCount, setTaskCompletedCount] = useState(tasks.filter((task) => task.completed).length)

  useEffect(() => {
    const completed = tasks.filter((task) => task.completed).length
    setTaskCount(tasks.length)
    setTaskCompletedCount(completed)
    // eslint-disable-next-line
  }, [tasks])

  function getProgressPercentageRounded() {
    if (tasks.length === 0) return ""
    const progress = (taskCompletedCount / taskCount) * 100
    return `(${Math.round(progress)}%)`
  }

  return (
    <div className="bg-darkBlue transition-all hover:bg-darkBlueHover rounded-xl shadow-lg px-5 py-4  w-48 relative flex-shrink-0">
      <div style={{ backgroundColor: accent }} className="h-3 w-3 rounded-full absolute right-2 top-2"></div>
      <p className="text-fontAlt text-sm mb-1 select-none">
        {taskCount} {taskCount > 1 ? "tasks" : "task"} {getProgressPercentageRounded()}
      </p>
      <h2 className="text-white capitalize truncate mb-5 text-lg select-none">{name}</h2>

      <div className="w-full border border-pink"></div>
    </div>
  )
}
export default Category
