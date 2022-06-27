import logo from './logo.svg'
import './App.css'
import { filterWords, defaultState } from './filter-words'
import React from 'react'

function App() {
  const [lettersInPosition, setLettersInPosition] = React.useState(
    defaultState.lettersInPosition
  )
  const [lettersNotInPosition, setLettersNotInPosition] = React.useState(
    defaultState.lettersNotInPosition
  )

  const [blacklist, setBlacklist] = React.useState(defaultState.blacklist)
  const [included, setIncluded] = React.useState(defaultState.included)

  const words = React.useMemo(() => {
    console.log(blacklist)
    return filterWords({
      lettersInPosition,
      lettersNotInPosition,
      blacklist,
      included,
    })
  }, [lettersInPosition, lettersNotInPosition, blacklist, included])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <label>Add letters in positions 1 through 5</label>
        <div className="in-position-wrapper">
          {lettersInPosition.map((x, i) => (
            <input
              key={i}
              id={i}
              onChange={() => {}}
              autoComplete="off"
              className="in-position"
              name="letters"
              onKeyUp={(e) => {
                const newLetters = [...lettersInPosition]
                newLetters[e.target.id] = ''

                setLettersInPosition(newLetters)

                if (e.key.length > 1 || e.key.length === 0) {
                  return
                }

                newLetters[e.target.id] = e.key

                setLettersInPosition(newLetters)
              }}
              value={x}
            />
          ))}
        </div>

        <label>Add included letters separated by space</label>
        <textarea
          name="included"
          id="included"
          rows="3"
          onChange={(e) => {
            setIncluded(e.target.value)
          }}
          value={included}
        />

        <label>
          Add blacklist letters separated by space which should not be included
        </label>
        <textarea
          name="blacklist"
          id="blacklist"
          rows="3"
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
              id={i}
              className="not-in-position"
              onChange={(e) => {
                const newLettersNotInPosition = [...lettersNotInPosition]
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
