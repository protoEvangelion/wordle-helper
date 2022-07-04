import { words } from './words'
import { isEqual } from 'lodash'

/* Program */

export type Words = {
  lettersInPosition: [string, string, string, string, string]
  lettersNotInPosition: [string, string, string, string, string]
  blacklist: string
}

export const filterWords = ({
  lettersInPosition,
  lettersNotInPosition,
  blacklist,
}: Words) =>
  words.filter((word) => {
    if (
      isEqual(
        {
          lettersInPosition,
          lettersNotInPosition,
          blacklist,
        },
        defaultState
      )
    ) {
      return true
    }

    return (
      filterIncluded(lettersNotInPosition, word) &&
      filterBlacklist(blacklist, word) &&
      filterLettersInPosition(lettersInPosition, word) &&
      filterLettersNotInPosition(lettersNotInPosition, word)
    )
  })

const filterIncluded = (
  lettersNotInPosition: Words['lettersNotInPosition'],
  word: string
) => {
  const included = lettersNotInPosition.reduce((included, currentLetters) => {
    let newIncluded: string = included

    currentLetters.split(' ').forEach((letter) => {
      if (!included.includes('letter')) {
        newIncluded = included.concat(` ${letter}`)
      }
    })

    return newIncluded
  }, '')

  return (
    isEqual(lettersNotInPosition, defaultState.lettersNotInPosition) ||
    included
      .trim()
      .split(' ')
      .every((x) => x.length === 1 && word.includes(x))
  )
}

const filterBlacklist = (blacklist: string, word: string) =>
  isEqual(blacklist, defaultState.blacklist) ||
  !blacklist
    .trim()
    .split(' ')
    .some((x) => x.length === 1 && word.includes(x))

const filterLettersInPosition = (
  lettersInPosition: Words['lettersInPosition'],
  word: string
) =>
  isEqual(lettersInPosition, defaultState.lettersInPosition) ||
  word
    .split('')
    .every((x, i) => (lettersInPosition[i] ? x === lettersInPosition[i] : true))

const filterLettersNotInPosition = (
  lettersNotInPosition: Words['lettersNotInPosition'],
  word: string
) =>
  isEqual(lettersNotInPosition, defaultState.lettersNotInPosition) ||
  !lettersNotInPosition.some((letters, i) =>
    letters.length
      ? letters.split(' ').some((letter) => word[i] === letter)
      : false
  )

export const defaultState: Words = {
  lettersInPosition: ['', '', '', '', ''],
  lettersNotInPosition: ['', '', '', '', ''],
  blacklist: '',
}
