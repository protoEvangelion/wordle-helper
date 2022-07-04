import { orderBy } from 'lodash'

type Weight = { [letter: string]: number }

export const sortWordsByLetterFrequency = (words: string[]) =>
  orderBy(
    words.map<[string, number]>((word) => [
      word,
      word
        .split('')
        .reduce(
          (weight, letter, i) => (weight += lettersFrequency[i][letter] || 0),
          0
        ),
    ]),
    1,
    'desc'
  ).map((x) => x[0])

export const lettersFrequency: Weight[] = [
  {
    s: 6,
    c: 5,
    b: 4,
    t: 3,
    p: 2,
    a: 1,
  },
  {
    a: 6,
    o: 5,
    r: 4,
    e: 3,
    i: 2,
    l: 1,
  },
  {
    a: 6,
    i: 5,
    o: 4,
    e: 3,
    u: 2,
    r: 1,
  },
  {
    e: 6,
    n: 5,
    s: 4,
    a: 3,
    l: 2,
    i: 1,
  },
  {
    e: 6,
    y: 5,
    t: 4,
    r: 3,
    l: 2,
    h: 1,
  },
]
