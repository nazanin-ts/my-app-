const countWords = (text) => {
  if (!text) {
    return 0
  }

  const trimmedText = text.trim()
  const wordsArray = trimmedText.split(" ")
  const filteredWords = []

  for (let i = 0; i < wordsArray.length; i++) {
    const word = wordsArray[i]
    if (word !== "") {
      filteredWords.push(word)
    }
  }

  return filteredWords.length
}

export default countWords