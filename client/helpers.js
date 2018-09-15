// INPUT HELPERS

const inOpenString = text => {
  const allQuotes = []
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "'") allQuotes.push(text[i])
  }
  return !!(allQuotes.length % 2 === 1)
}

const getObjectSuggestions = (variables, word) => {
  const chainedText = word.split('.') // array of the properties we are chaining, e.g. ['obj', 'foo2']
  let finalObjectInChain = variables[chainedText[0]]
  for (let i = 1; i < chainedText.length - 1; i++) {
    // note: we don't want to count the last one because they might still be typing and the final property might not be finished
    finalObjectInChain = finalObjectInChain[chainedText[i]]
  }

  if (word[word.length - 1] === '.') { // we have all the options available
    return Object.keys(finalObjectInChain)
  } else if (word.indexOf('.') === -1) {
    // they aren't trying to access properties, yet, so don't give them new suggestions
    return []
  } else {
    // they have started typing out a final property, so we want to give suggestions that match that property
    // this should return the keys that are potential matches for what the user is typing
    const propertyUserIsTyping = chainedText[chainedText.length - 1]
    return Object.keys(finalObjectInChain).filter(key => {
      return key.indexOf(propertyUserIsTyping) !== -1
    })
  }
}

export const getSuggestions = (keywords, variables, text) => {
  if (inOpenString(text)) return [] // if we're in an open string, don't make suggestions

  // for now, just base it off of the last word in the text
  // limitation: if user moves cursor to middle of their text...
  const words = text.split(' ')
  const lastWord = words[words.length - 1] // maybe check here to see if there is a period, and if there is, check for the objects that have properties?
  if (!lastWord) return [] // so we don't give suggestions if they haven't started typing out a new word yet

  const keywordNames = Object.keys(keywords)
  const variableNames = Object.keys(variables)
  const allOptions = [...keywordNames, ...variableNames]
  // how to deal with obj.foo2.foo3?
  // convert objects in variables to the format obj.foo1, obj.foo2? then store them in an array?
  // but we don't want all the suggestions to pop up right away -- only if they've typed obj do we see the rest of the suggestions

  const suggestions = []
  for (let i = 0; i < allOptions.length; i++) {
    if (allOptions[i].indexOf(lastWord) !== -1) {
      suggestions.push(allOptions[i])
    }
  }



  return suggestions
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
