import { createEffect, createSignal } from "solid-js"
import { data, setData, addCategory } from "../../stores/store"
import { ProgressBar } from ".."
import { getNextAccent } from "../../utils"

const PROGRESS_BAR_START_PX = 17
const PROGRESS_BAR_END_PX = 170
const PROGRESS_BAR_START_PERCENT = 0

function Category({ category }) {
  const [taskCount, setTaskCount] = createSignal(category.tasks.length)
  const [taskCompletedCount, setTaskCompletedCount] = createSignal(category.tasks.filter((task) => task.completed).length)

  const [progressPercent, setProgressPercent] = createSignal(PROGRESS_BAR_START_PERCENT + "%")
  const [progressBarPos, setProgressBarPos] = createSignal(PROGRESS_BAR_START_PX + "px")

  createEffect(() => {
    const completed = category.tasks.filter((task) => task.completed).length
    setTaskCount(category.tasks.length)
    setTaskCompletedCount(completed)
    setProgressPercent(getProgressPercentage())
    setProgressBarPos(getProgressBarPosition())
  })

  const getProgressPercentageRounded = () => {
    if (category.tasks.length === 0) return ""
    const progress = (taskCompletedCount() / taskCount()) * 100
    return `(${Math.round(progress)}%)`
  }

  const getProgressPercentage = () => {
    if (category.tasks.length === 0) return "0%"
    return (taskCompletedCount() / taskCount()) * 100 + "%"
  }

  const getProgressBarPosition = () => {
    if (category.tasks.length === 0) return PROGRESS_BAR_START_PX + "px"
    if (taskCompletedCount() === category.tasks.length) return PROGRESS_BAR_END_PX - 1 + "px"
    const progressPx = (taskCompletedCount() / taskCount()) * (PROGRESS_BAR_END_PX - (PROGRESS_BAR_START_PX - 1)) + (PROGRESS_BAR_START_PX - 1)
    return Math.max(PROGRESS_BAR_START_PX, progressPx)
  }

  const handleOpenCategoryDetails = () => {}
  const handleChangeAccent = (e) => {
    e.stopPropagation()
    const nextAccent = getNextAccent(category.accent)
    const categoryIdx = data().findIndex((c) => c.id === category.id)
    data()[categoryIdx] = { ...category, accent: nextAccent }
    setData([...data()])
  }

  return (
    <div
      onClick={handleOpenCategoryDetails}
      className="bg-darkBlue transition-all hover:bg-darkBlueHover rounded-xl shadow-lg px-5 py-4  w-48 relative flex-shrink-0"
    >
      <div onClick={handleChangeAccent} style={{ "background-color": category.accent }} className="h-3 w-3 rounded-full absolute right-2 top-2"></div>
      <p className="text-fontAlt text-sm mb-1 select-none">
        {taskCount()} {taskCount() > 1 ? "tasks" : "task"} {getProgressPercentageRounded()}
      </p>
      <h2 className="text-white capitalize truncate mb-5 text-lg select-none">{category.name}</h2>

      <ProgressBar progressBarPos={progressBarPos()} progressPercent={progressPercent()} accent={category.accent} />
    </div>
  )
}

export default Category
