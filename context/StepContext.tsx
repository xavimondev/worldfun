import { createContext, Dispatch, useContext, useState } from 'react'

type StepState = {
  step: any
  preferences: any
  showPanelMode: () => void
  showPanelDifficulty: () => void
  showPanelCategory: () => void
  hidePanelCategory: () => void
  setPreferences: Dispatch<any>
}

const StepContext = createContext<StepState | undefined>(undefined)

type Props = {
  children: JSX.Element
}

const initialState = {
  mode: true,
  difficulty: false,
  category: false
}

export const StepProvider = ({ children }: Props) => {
  const [step, setStep] = useState<any | undefined>(initialState)
  const [preferences, setPreferences] = useState<any>({})

  const showPanelMode = () => setStep({ ...step, mode: true, difficulty: false })
  const showPanelDifficulty = () => setStep({ ...step, mode: false, difficulty: true })
  const showPanelCategory = () => setStep({ ...step, difficulty: false, category: true })
  const hidePanelCategory = () => setStep({ ...step, difficulty: true, category: false })

  const contextValues = {
    step,
    preferences,
    showPanelMode,
    showPanelDifficulty,
    showPanelCategory,
    hidePanelCategory,
    setPreferences
  }

  return <StepContext.Provider value={contextValues}>{children}</StepContext.Provider>
}

export const useStep = () => {
  const context = useContext(StepContext)
  if (context === undefined) throw new Error('useStep must be used within a StepProvider')

  return context
}
