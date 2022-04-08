import { createContext, useState, useEffect } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
const CalendarContext = createContext()

export const CalendarContextProvider = ({ children }) => {
  const [image, setImage] = useState('')

  const [SignedIn, setSignedIn] = useState(false)
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true)
      } else setSignedIn(false)
    })
  })
  const fetchImage = () => {
    let randomValue = Math.floor(Math.random() * 999)
    console.log('Fetching')
    fetch(`https://picsum.photos/id/${randomValue}/info`)
      .then((res) => res.json())
      .then(({ download_url }) => {
        setImage(download_url)
      })
  }

  const clearImage = (second) => {
    setImage('')
  }

  return (
    <CalendarContext.Provider
      value={{ image, SignedIn, fetchImage, clearImage }}>
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarContext
