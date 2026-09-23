import { useCallback, useState } from 'react'
import type { ComputerSectionId } from '../data'

export function useWorkspaceUi() {
  const [isExploring, setIsExploring] = useState(false)
  const [isMonitorFocused, setIsMonitorFocused] = useState(false)
  const [activeSection, setActiveSection] =
    useState<ComputerSectionId>('home')

  const enterExplore = useCallback(() => setIsExploring(true), [])

  const exitExplore = useCallback(() => {
    setIsExploring(false)
    setIsMonitorFocused(false)
  }, [])

  const focusMonitor = useCallback(() => {
    setIsExploring(true)
    setIsMonitorFocused(true)
  }, [])

  const blurMonitor = useCallback(() => {
    setIsMonitorFocused(false)
  }, [])

  const openSection = useCallback((section: ComputerSectionId) => {
    setActiveSection(section)
    setIsExploring(true)
    setIsMonitorFocused(true)
  }, [])

  return {
    isExploring,
    isMonitorFocused,
    activeSection,
    setActiveSection,
    enterExplore,
    exitExplore,
    focusMonitor,
    blurMonitor,
    openSection,
  }
}
