export function markMessageAsComplete(index: number, set: Set<number>, update: (s: Set<number>) => void) {
  const updated = new Set(set)
  updated.add(index)
  update(updated)
}
