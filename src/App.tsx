import logo from './logo.svg'
import './App.css'
import { filterWords, defaultState, Words } from './filter-words'
import React from 'react'

function App() {
  const [lettersInPosition, setLettersInPosition] = React.useState<
    Words['lettersInPosition']
  >(defaultState.lettersInPosition)
  const [lettersNotInPosition, setLettersNotInPosition] = React.useState<
    Words['lettersNotInPosition']
  >(defaultState.lettersNotInPosition)

  const [blacklist, setBlacklist] = React.useState(defaultState.blacklist)

  const words = React.useMemo(
    () =>
      filterWords({
        lettersInPosition,
        lettersNotInPosition,
        blacklist,
      }),
    [lettersInPosition, lettersNotInPosition, blacklist]
  )

  React.useEffect(() => {
    const nextInput = document.activeElement?.nextElementSibling as HTMLElement

    nextInput?.focus?.()
  }, [lettersInPosition])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <label>Add letters in positions 1 through 5</label>
        <div className="in-position-wrapper">
          {lettersInPosition.map((x, i) => (
            <input
              key={i}
              id={String(i)}
              autoCapitalize="none"
              onChange={() => {}}
              autoComplete="off"
              className="in-position"
              name="letters"
              onKeyUp={(e) => {
                const target = e.target as HTMLInputElement

                const newLetters: Words['lettersInPosition'] = [
                  ...lettersInPosition,
                ]
                newLetters[Number(target.id)] = ''

                setLettersInPosition(newLetters)

                if (e.key.length > 1 || e.key.length === 0) {
                  return
                }

                newLetters[Number(target.id)] = e.key

                setLettersInPosition(newLetters)
              }}
              value={x}
            />
          ))}
        </div>

        <label>
          Add blacklist letters separated by space which should not be included
        </label>
        <textarea
          name="blacklist"
          id="blacklist"
          rows={1}
          autoCapitalize="none"
          onChange={(e) => {
            setBlacklist(e.target.value)
          }}
          value={blacklist}
        />

        <label>
          Add letters that should not be in position 1 through 5. There can be
          multiple letters in each box separated by space.
        </label>
        <div>
          {lettersNotInPosition.map((x, i) => (
            <textarea
              key={i}
              id={String(i)}
              autoCapitalize="none"
              className="not-in-position"
              onChange={(e) => {
                const newLettersNotInPosition: Words['lettersNotInPosition'] = [
                  ...lettersNotInPosition,
                ]
                newLettersNotInPosition[i] = e.target.value
                setLettersNotInPosition(newLettersNotInPosition)
              }}
              value={x}
            />
          ))}
        </div>

        <section className="word-list">
          <h3>Word Count: {words.length}</h3>
          {words.length > 100 && <h5>Showing Top 100 words from filter:</h5>}
          <p>{words.slice(0, 100).join(', ')}</p>
        </section>
      </header>
    </div>
  )
}

export default App
