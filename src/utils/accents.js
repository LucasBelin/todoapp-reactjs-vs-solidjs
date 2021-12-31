const accents = ["#A300F0", "#3577E1", "#24F000", "#F08800", "#F00000", "#F000F0", "#00ECF0"]

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
