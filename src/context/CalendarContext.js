import { createContext, useState } from 'react'

const CalendarContext = createContext()

export const CalendarContextProvider = ({ children }) => {
  const [image, setImage] = useState('')

  let randomValue = Math.floor(Math.random() * 999)
  fetch(`https://picsum.photos/id/${randomValue}/info`)
    .then((res) => res.json())
    .then(({ download_url }) => {
      setImage(download_url)
    })

  return (
    <CalendarContext.Provider value={{ image }}>
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarContext
