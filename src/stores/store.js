import { useLocalStorage } from "../custom-hooks"
import { STORAGE_KEY, defaultData, getAccent } from "../utils"
import { v4 as uuid } from "uuid"

export const [data, setData] = useLocalStorage(STORAGE_KEY, defaultData)

export const addTask = (label, categoryId) => {
  if (label.length === 0) return
  const category = data().find((category) => category.id === categoryId)
  category.tasks.push({ id: uuid(), categoryId: categoryId, completed: false, date: new Date().toDateString(), label: label })
  setData([...data()])
}

export const toggleTask = (taskId, categoryId) => {
  const category = data().find((category) => category.id === categoryId)
  const task = category.tasks.find((task) => task.id === taskId)
  task.completed = !task.completed
  setData([...data()])
}

export const deleteTask = (taskId, categoryId) => {
  const category = data().find((category) => category.id === categoryId)
  category.tasks = [...category.tasks.filter((task) => task.id !== taskId)]
  setData([...data()])
}

export const addCategory = (name) => {
  if (name.length === 0) return
  const newCategory = { id: uuid(), name: name, accent: getAccent(data.length), tasks: [] }
  data().push(newCategory)
  setData([...data()])
}

export const deleteCategory = (categoryId) => {
  const newData = data().filter((category) => category.id !== categoryId)
  setData([...newData])
}
