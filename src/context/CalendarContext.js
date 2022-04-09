import { createContext, useState, useEffect } from 'react'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
const CalendarContext = createContext()

export const CalendarContextProvider = ({ children }) => {
  const [image, setImage] = useState('')
  const [refresh, setRefresh] = useState(true)
  const [checkStatus, setCheckStatus] = useState(true)

  const [SignedIn, setSignedIn] = useState(false)
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true)
      }
      setCheckStatus(false)
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

  if (SignedIn && refresh) {
    fetchImage()
    setRefresh(false)
  }

  const clearImage = (second) => {
    setImage('')
  }

  return (
    <CalendarContext.Provider
      value={{ image, SignedIn, fetchImage, clearImage, checkStatus }}>
      {children}
    </CalendarContext.Provider>
  )
}

export default CalendarContext
