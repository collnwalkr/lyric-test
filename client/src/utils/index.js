import ls from "local-storage"

const alreadyInLocalStorage = () => {
  const keys = Object.keys(localStorage)
  let archive = {},
    i = keys.length
  while (i--) {
    try {
      archive[keys[i]] = ls.get(keys[i])
    } catch (error) {
      console.log("error", error)
    }
  }

  return archive
}

export { alreadyInLocalStorage }
