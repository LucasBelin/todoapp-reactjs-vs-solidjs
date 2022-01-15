import { getAccent } from "./accents"

export const defaultData = [
  {
    id: 0,
    name: "Getting started",
    accent: getAccent(0),
    tasks: [
      {
        id: 0,
        categoryId: 0,
        completed: false,
        date: new Date().toDateString(),
        label: "Create a category and add tasks",
      },
    ],
  },
]
