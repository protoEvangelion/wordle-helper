import { words } from './words'
import { isEqual } from 'lodash'

/* Program */

export const filterWords = ({
  lettersInPosition,
  lettersNotInPosition,
  blacklist,
  included,
}) =>
  words.filter((word) => {
    if (
      isEqual(
        {
          lettersInPosition,
          lettersNotInPosition,
          blacklist,
          included,
        },
        defaultState
      )
    ) {
      return true
    }

    return (
      filterIncluded(included, word) &&
      filterBlacklist(blacklist, word) &&
      filterLettersInPosition(lettersInPosition, word) &&
      filterLettersNotInPosition(lettersNotInPosition, word)
    )
  })

const filterIncluded = (included, word) =>
  isEqual(included, defaultState.included) ||
  included
    .trim()
    .split(' ')
    .every((x) => x.length === 1 && word.includes(x))

const filterBlacklist = (blacklist, word) =>
  isEqual(blacklist, defaultState.blacklist) ||
  !blacklist
    .trim()
    .split(' ')
    .some((x) => x.length === 1 && word.includes(x))

const filterLettersInPosition = (lettersInPosition, word) =>
  isEqual(lettersInPosition, defaultState.lettersInPosition) ||
  word
    .split('')
    .every((x, i) => (lettersInPosition[i] ? x === lettersInPosition[i] : true))

const filterLettersNotInPosition = (lettersNotInPosition, word) =>
  isEqual(lettersNotInPosition, defaultState.lettersNotInPosition) ||
  !lettersNotInPosition.some((letters, i) =>
    letters.length
      ? letters.split(' ').some((letter) => word[i] === letter)
      : false
  )

export const defaultState = {
  lettersInPosition: ['', '', '', '', ''],
  lettersNotInPosition: ['', '', '', '', ''],
  blacklist: '',
  included: '',
}
