import React, { useState, useEffect } from "react"

import { getNextAccent } from "../../utils"

import { ProgressBar } from ".."

const PROGRESS_BAR_START_PX = 17
const PROGRESS_BAR_END_PX = 170
const PROGRESS_BAR_START_PERCENT = 0

function Category({ id, name, accent, tasks, updateCategory, openCategoryDetails }) {
  const [taskCount, setTaskCount] = useState(tasks.length)
  const [taskCompletedCount, setTaskCompletedCount] = useState(tasks.filter((task) => task.completed).length)

  const [progressPercent, setProgressPercent] = useState(PROGRESS_BAR_START_PERCENT + "%")
  const [progressBarPos, setProgressBarPos] = useState(PROGRESS_BAR_START_PX + "px")

  useEffect(() => {
    const completed = tasks.filter((task) => task.completed).length
    setTaskCount(tasks.length)
    setTaskCompletedCount(completed)
    setProgressPercent(getProgressPercentage())
    setProgressBarPos(getProgressBarPosition())
    // eslint-disable-next-line
  }, [tasks])

  function getProgressPercentageRounded() {
    if (tasks.length === 0) return ""
    const progress = (taskCompletedCount / taskCount) * 100
    return `(${Math.round(progress)}%)`
  }

  function getProgressPercentage() {
    if (tasks.length === 0) return "0%"
    return (taskCompletedCount / taskCount) * 100 + "%"
  }

  function getProgressBarPosition() {
    if (tasks.length === 0) return PROGRESS_BAR_START_PX + "px"
    if (taskCompletedCount === tasks.length) return PROGRESS_BAR_END_PX - 1 + "px"
    const val = (taskCompletedCount / taskCount) * (PROGRESS_BAR_END_PX - (PROGRESS_BAR_START_PX - 1)) + (PROGRESS_BAR_START_PX - 1)
    return Math.max(PROGRESS_BAR_START_PX, val)
  }

  function changeAccent(e) {
    e.stopPropagation()
    const nextAccent = getNextAccent(accent)
    updateCategory({ id, name, accent: nextAccent, tasks })
  }

  return (
    <div
      onClick={() => {
        openCategoryDetails({ id, name, tasks })
      }}
      className="bg-darkBlue transition-all hover:bg-darkBlueHover rounded-xl shadow-lg px-5 py-4  w-48 relative flex-shrink-0"
    >
      <div onClick={changeAccent} style={{ backgroundColor: accent }} className="h-3 w-3 rounded-full absolute right-2 top-2"></div>
      <p className="text-fontAlt text-sm mb-1 select-none">
        {taskCount} {taskCount > 1 ? "tasks" : "task"} {getProgressPercentageRounded()}
      </p>
      <h2 className="text-white capitalize truncate mb-5 text-lg select-none">{name}</h2>

      <ProgressBar progressBarPos={progressBarPos} progressPercent={progressPercent} accent={accent} />
    </div>
  )
}
export default Category
