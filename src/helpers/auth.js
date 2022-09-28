export const getFromLocalStorage = (key) => {
  const auth = localStorage.getItem(key)
  if (auth) { return JSON.parse(auth) }
  return null
}

export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value)) 
}

export const removeFromLocalStorage = (key) => {
  if(localStorage.getItem(key))
    localStorage.removeItem(key)
}