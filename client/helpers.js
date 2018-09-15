// INPUT HELPERS

const inOpenString = text => {
  const allQuotes = []
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "'") allQuotes.push(text[i])
  }
  return !!(allQuotes.length % 2 === 1)
}

export const getSuggestions = (keywords, variables, text) => {
  if (inOpenString(text)) return [] // if we're in an open string, don't make suggestions

  const keywordNames = Object.keys(keywords)
  const variableNames = Object.keys(variables)
  // how to deal with obj.foo2.foo3?
  // convert objects in variables to the format obj.foo1, obj.foo2? then store them in an array?
  // but we don't want all the suggestions to pop up right away -- only if they've typed obj do we see the rest of the suggestions
  const allTerms = [...keywordNames, ...variableNames]

  // for now, just base it off of the last word in the text
  // limitation: if user moves cursor to middle of their text...
  const words = text.split(' ')
  const lastWord = words[words.length - 1] // maybe check here to see if there is a period, and if there is, check for the objects that have properties?
  if (!lastWord) return [] // so we don't give suggestions if they haven't started typing out a new word yet

  const suggestions = []
  for (let i = 0; i < allTerms.length; i++) {
    if (allTerms[i].indexOf(lastWord) !== -1) {
      suggestions.push(allTerms[i])
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
