import { Header, Tasks, Categories } from "./containers"

function App() {
  return (
    <div className="min-h-screen px-3 pt-8 flex flex-col items-start gap-8 overflow-hidden relative bg-lightBlue">
      <Header pendingTaskCount={5} />
      <Categories />
      <Tasks />
    </div>
  )
}

export default App
