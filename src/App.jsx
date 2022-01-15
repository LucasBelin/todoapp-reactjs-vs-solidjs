import { Header, Categories, Tasks, CategoryDetails } from "./containers"

function App() {
  return (
    <div class="h-screen px-3 pt-8 flex flex-col items-start gap-8 overflow-hidden relative bg-lightBlue">
      <Header />
      <Categories />
      <Tasks />
      <CategoryDetails />
    </div>
  )
}

export default App
