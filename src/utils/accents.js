const accents = ["#A300F0", "#3577E1", "#C80000", "#00C800", "#C86400", "#5856c4"]

export function getAccent(idx) {
  //Get random accent
  if (typeof idx !== "number") {
    return accents[Math.floor(Math.random() * accents.length)]
  }
  //Loop around
  if (idx > accents.length - 1) {
    return accents[idx % accents.length]
  }
  return accents[idx]
}

export function getNextAccent(current) {
  const idx = accents.findIndex((accent) => accent === current)
  if (idx === -1) return getAccent()
  return getAccent(idx + 1)
}
