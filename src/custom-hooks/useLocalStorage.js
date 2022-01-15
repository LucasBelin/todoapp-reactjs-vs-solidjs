import { createSignal, createEffect } from "solid-js"

function getSavedValue(key, initialValue) {
  const savedValue = JSON.parse(localStorage.getItem(key))
  if (savedValue) return savedValue

  if (initialValue instanceof Function) return initialValue()
  return initialValue
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = createSignal(getSavedValue(key, initialValue))

  createEffect(() => {
    localStorage.setItem(key, JSON.stringify(value()))
  }, [key, value])

  return [value, setValue]
}
