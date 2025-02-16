'use client'

import { navLinks } from '@/constants'
import React, { createContext, useContext, useState } from 'react'

type SectionName = (typeof navLinks)[number]['name']

type ActiveSectionContextType = {
  activeSection: SectionName
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>
}

const ActiveSectionContext = createContext<ActiveSectionContextType | null>(
  null
)

const ActiveSectionContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [activeSection, setActiveSection] = useState<SectionName>('Home')

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  )
}

const useActiveSectionContext = () => {
  const context = useContext(ActiveSectionContext)

  if (context === null) {
    throw new Error(
      'useActiveSectionContext must be used within an ActiveSectionContextProvider'
    )
  }

  return context
}

export { ActiveSectionContextProvider, useActiveSectionContext }
