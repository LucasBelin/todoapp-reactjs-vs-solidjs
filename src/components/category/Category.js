import React, { useState, useEffect, useCallback } from "react"

import { getNextAccent } from "../../utils"

import { ProgressBar } from ".."

const PROGRESS_BAR_START_PX = 17
const PROGRESS_BAR_END_PX = 170
const PROGRESS_BAR_START_PERCENT = 0

function Category({ category, updateCategory, openCategoryDetails }) {
  const [taskCount, setTaskCount] = useState(category.tasks.length)
  const [taskCompletedCount, setTaskCompletedCount] = useState(category.tasks.filter((task) => task.completed).length)

  const [progressPercent, setProgressPercent] = useState(PROGRESS_BAR_START_PERCENT + "%")
  const [progressBarPos, setProgressBarPos] = useState(PROGRESS_BAR_START_PX + "px")

  const handleOpenCategoryDetails = useCallback(() => {
    openCategoryDetails(category)
  }, [category, openCategoryDetails])

  const getProgressPercentageRounded = useCallback(() => {
    if (category.tasks.length === 0) return ""
    const progress = (taskCompletedCount / taskCount) * 100
    return `(${Math.round(progress)}%)`
  }, [category.tasks, taskCompletedCount, taskCount])

  const getProgressPercentage = useCallback(() => {
    if (category.tasks.length === 0) return "0%"
    return (taskCompletedCount / taskCount) * 100 + "%"
  }, [category.tasks, taskCompletedCount, taskCount])

  const getProgressBarPosition = useCallback(() => {
    if (category.tasks.length === 0) return PROGRESS_BAR_START_PX + "px"
    if (taskCompletedCount === category.tasks.length) return PROGRESS_BAR_END_PX - 1 + "px"
    const progressPx = (taskCompletedCount / taskCount) * (PROGRESS_BAR_END_PX - (PROGRESS_BAR_START_PX - 1)) + (PROGRESS_BAR_START_PX - 1)
    return Math.max(PROGRESS_BAR_START_PX, progressPx)
  }, [category.tasks, taskCompletedCount, taskCount])

  useEffect(() => {
    const completed = category.tasks.filter((task) => task.completed).length
    setTaskCount(category.tasks.length)
    setTaskCompletedCount(completed)
    setProgressPercent(getProgressPercentage())
    setProgressBarPos(getProgressBarPosition())
  }, [category.tasks, getProgressPercentage, getProgressBarPosition])

  const changeAccent = useCallback(
    (e) => {
      e.stopPropagation()
      const nextAccent = getNextAccent(category.accent)
      updateCategory({ id: category.id, name: category.name, accent: nextAccent, tasks: category.tasks })
    },
    [category, updateCategory],
  )

  return (
    <div
      onClick={handleOpenCategoryDetails}
      className="bg-darkBlue transition-all hover:bg-darkBlueHover rounded-xl shadow-lg px-5 py-4  w-48 relative flex-shrink-0"
    >
      <div onClick={changeAccent} style={{ backgroundColor: category.accent }} className="h-3 w-3 rounded-full absolute right-2 top-2"></div>
      <p className="text-fontAlt text-sm mb-1 select-none">
        {taskCount} {taskCount > 1 ? "tasks" : "task"} {getProgressPercentageRounded()}
      </p>
      <h2 className="text-white capitalize truncate mb-5 text-lg select-none">{category.name}</h2>

      <ProgressBar progressBarPos={progressBarPos} progressPercent={progressPercent} accent={category.accent} />
    </div>
  )
}

export default Category
