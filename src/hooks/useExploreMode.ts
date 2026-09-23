import { useCallback, useState } from 'react'

export function useExploreMode(initial = false) {
  const [isExploring, setIsExploring] = useState(initial)

  const enterExplore = useCallback(() => setIsExploring(true), [])
  const exitExplore = useCallback(() => setIsExploring(false), [])
  const toggleExplore = useCallback(
    () => setIsExploring((prev) => !prev),
    [],
  )

  return { isExploring, enterExplore, exitExplore, toggleExplore }
}
