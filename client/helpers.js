// INPUT HELPERS

const inOpenString = text => {
  const allQuotes = []
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "'") allQuotes.push(text[i])
  }
  return !!(allQuotes.length % 2 === 1)
}

const getObjectSuggestions = (objects, word) => {
  const chainedText = word.split('.')
  let finalObjectInChain = objects[chainedText[0]]
  for (let i = 1; i < chainedText.length - 1; i++) {
    if (!finalObjectInChain) return [] // if we end up trying to access something that doesn't exist in memory, don't send suggestions
    finalObjectInChain = finalObjectInChain[chainedText[i]]
  }

  if (word[word.length - 1] === '.') { // we have all the keys available because they've typed out 'object.'
    // note: Object.keys of a string will return string indices, so we have to be sure to check here that we are getting the keys of an object
    return typeof finalObjectInChain === 'object' ? Object.keys(finalObjectInChain) : []
  } else {
    // they have started typing out a final property, so we want to give suggestions that match that property
    const propertyUserIsTyping = chainedText[chainedText.length - 1]
    return Object.keys(finalObjectInChain).filter(key => {
      return key.indexOf(propertyUserIsTyping) !== -1
    })
  }
}

const getMatches = (obj, word) => {
  const suggestions = []
  const names = Object.keys(obj)
  for (let i = 0; i < names.length; i++) {
    if (names[i].indexOf(word) !== -1) {
      suggestions.push(names[i])
    }
  }
  return suggestions
}

export const getLastWord = text => {
  const words = text.split(' ')
  return words[words.length - 1]
}

export const getSuggestions = (keywords, variables, text) => {
  // for now, just base it off of the last word in the text
  // limitation: if user moves cursor to middle of their text...
  const lastWord = getLastWord(text)
  if (inOpenString(text) || !lastWord) return [] // if we're in an open string or they haven't started the new word, don't make suggestions

  // get all keyword matches
  const keywordSuggestions = getMatches(keywords, lastWord)

  // get all variable matches
  let variableSuggestions
  if (lastWord.indexOf('.') !== -1) {
    // user is trying to access a proprety on an object
    variableSuggestions = getObjectSuggestions(variables, lastWord)
  } else {
    // user is not trying to access a property
    variableSuggestions = getMatches(variables, lastWord)
  }

  return [...keywordSuggestions, ...variableSuggestions]
}

// FEEDBACK HELPERS

export const findWordsAndStrings = text => {
  const words = []
  let insideString = false
  let currentWord = ''
  for (let i = 0; i < text.length; i++) { // only worrying about single quotes for now
    if (text[i] === "'") {
      insideString = !insideString
      currentWord += text[i]
    } else if (text[i] === ' ' && !insideString) { // at the end of a word that is not inside a string
      words.push(currentWord)
      currentWord = ''
    } else { // keep adding characters to the current word
      currentWord += text[i]
    }
  }
  // at end of loop, if we still have a currentWord that hasn't been added
  if (currentWord) {
    words.push(currentWord)
  }
  return words
}
