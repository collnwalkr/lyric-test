import ls from "local-storage"

const alreadyInLocalStorage = () => {
  const keys = Object.keys(localStorage)
  let archive = {},
    i = keys.length
  while (i--) archive[keys[i]] = ls.get(keys[i])

  return archive
}

export { alreadyInLocalStorage }
