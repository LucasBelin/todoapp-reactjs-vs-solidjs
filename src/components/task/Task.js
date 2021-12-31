import CheckMark from "./CheckMark"

function Task({ id, categoryId, label, completed, accent, toggleTask }) {
  return (
    <div
      onClick={() => {
        toggleTask(id, categoryId)
      }}
      className="bg-darkBlue w-full rounded-xl px-2 py-5 flex justify-start items-center gap-3"
    >
      <CheckMark checked={completed} accent={accent} />
      <h2 className={`text-lg text-white truncate px-1 select-none ${completed && "line-through"}`}>{label}</h2>
    </div>
  )
}

export default Task
