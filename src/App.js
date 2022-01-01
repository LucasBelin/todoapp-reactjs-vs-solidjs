import { useState, useEffect } from "react"
import { useLocalStorage, useToggle } from "./custom-hooks"

import { STORAGE_KEY, defaultData } from "./utils"

import { Header, Tasks, Categories, CategoryDetails } from "./containers"

function App() {
  const [data, setData] = useLocalStorage(STORAGE_KEY, defaultData)
  const [pendingTaskCount, setPendingTaskCount] = useState(0)

  const [showCategoryDetails, toggleShowCategoryDetails] = useToggle(false)
  const [currentCategoryDetails, setCurrentCategoryDetails] = useState({ id: 0, name: "", tasks: [] })

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

  function deleteTask(taskId, categoryId) {
    const category = data.find((category) => category.id === categoryId)
    category.tasks = [...category.tasks.filter((task) => task.id !== taskId)]
    setData([...data])
    setCurrentCategoryDetails(category)
  }

  function openCategoryDetails(category) {
    toggleShowCategoryDetails(true)
    setCurrentCategoryDetails(category)
  }

  return (
    <div className="min-h-screen px-3 pt-8 flex flex-col items-start gap-8 overflow-hidden relative bg-lightBlue">
      <Header pendingTaskCount={pendingTaskCount} />
      <Categories data={data} setData={setData} openCategoryDetails={openCategoryDetails} />
      <Tasks data={data} toggleTask={toggleTask} />
      <CategoryDetails
        isOpen={showCategoryDetails}
        close={() => {
          toggleShowCategoryDetails(false)
        }}
        details={currentCategoryDetails}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </div>
  )
}

export default App
