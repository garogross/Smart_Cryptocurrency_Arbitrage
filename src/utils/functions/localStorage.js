

export const getLocalStorageItem = (key) => {
    const result = localStorage.getItem(key)
    return result ? JSON.parse(result) : null
}

export const setLocalStorageItem = (key,data) => localStorage.setItem(key,JSON.stringify(data))