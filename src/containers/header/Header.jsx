import { createMemo } from "solid-js"
import { data } from "../../stores/store"
import { Separator } from "../../components"

function Header() {
  const pendingTaskCount = createMemo(() => {
    let count = 0
    data().forEach((category) => {
      category.tasks.forEach((task) => {
        if (!task.completed) count++
      })
    })
    return count
  })

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <h1 className="text-2xl select-none text-white font-bold self-center text-center">
        You have <span className="text-pink select-none">{pendingTaskCount}</span> pending {pendingTaskCount > 1 ? "tasks" : "task"}
      </h1>
      <Separator />
    </div>
  )
}

export default Header
