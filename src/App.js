import { useState, useEffect } from "react"
import { useLocalStorage } from "./custom-hooks"

import { STORAGE_KEY, defaultData } from "./utils"

import { Header, Tasks, Categories } from "./containers"

function App() {
  const [data, setData] = useLocalStorage(STORAGE_KEY, defaultData)
  const [pendingTaskCount, setPendingTaskCount] = useState(0)

  useEffect(() => {
    setPendingTaskCount(getPendingTaskCount())
    // eslint-disable-next-line
  }, [data])

  function getPendingTaskCount() {
    let count = 0
    data.forEach((category) => {
      category.tasks.forEach((task) => {
        if (!task.completed) count++
      })
    })
    return count
  }

  function toggleTask(taskId, categoryId) {
    const category = data.find((category) => category.id === categoryId)
    const task = category.tasks.find((task) => task.id === taskId)
    task.completed = !task.completed
    setData([...data])
  }

  return (
    <div className="min-h-screen px-3 pt-8 flex flex-col items-start gap-8 overflow-hidden relative bg-lightBlue">
      <Header pendingTaskCount={pendingTaskCount} />
      <Categories data={data} setData={setData} />
      <Tasks data={data} toggleTask={toggleTask} />
    </div>
  )
}

export default App
