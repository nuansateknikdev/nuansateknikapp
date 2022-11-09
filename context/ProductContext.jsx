import { createContext, useContext, Context } from 'react'
import { useState } from 'react'
const productContext = createContext({
  currentCategoryFilter: null,
})

export function ProductProvider({ children }) {
  const [currentCategoryFilter, setCurrentCategoryFilter] = useState(null)
  return (
    <productContext.Provider
      value={{ currentCategoryFilter, setCurrentCategoryFilter }}>
      {children}
    </productContext.Provider>
  )
}

export const useProduct = () => useContext(productContext)
