import { createSignal } from "solid-js"

export default function useToggle(defaultValue) {
  const [value, setValue] = createSignal(defaultValue)

  function toggleValue(newValue) {
    const val = typeof newValue === "boolean" ? newValue : !value()
    setValue(val)
  }

  return [value, toggleValue]
}
