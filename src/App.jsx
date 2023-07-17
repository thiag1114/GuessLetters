// CSS
import { useState } from 'react';
import styles from './App.module.css'

// Words
import { wordsList } from './data/words'

// Components
import StartGame from './components/StartGame'
import Game from './components/Game'
import GameOver from './components/GameOver'

const pages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]

function App() {

  const [pageActual, setPageActual] = useState(pages[0].name)

  const [picketCategory, setPickedCategory] = useState("")
  const [pickedWord, setPicketWord] = useState("")
  const [letters, setLetters] = useState([])

  const [letterGuessed, setLetterGuessed] = useState([])
  const [letterWrong, setLetterWrong] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickedWordAndCategory = () => {
    const categories = Object.keys(wordsList)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    const words = wordsList[category]
    const word = words[Math.floor(Math.random() * words.length)]

    const separateWord = word.toUpperCase().split("")

    setLetters(separateWord)
    setPickedCategory(category)
    setPicketWord(word)
  }

  const clearWordAndCategory = () => {
    setPickedCategory("");
    setPicketWord("");
    setLetters([]);
    setLetterGuessed([]);
    setLetterWrong([]);
  }

  const startGame = () => {
    clearWordAndCategory();
    pickedWordAndCategory();
  }

  return (
    <div className={styles.container}>
      {pageActual === "start" && <StartGame pages={pages} setPageActual={setPageActual} startGame={startGame} />}
      {pageActual === "game" &&
        <Game pages={pages}
          setPageActual={setPageActual}
          score={score}
          setScore={setScore}
          picketCategory={picketCategory}
          pickedWord={pickedWord}
          letters={letters}
          guesses={guesses}
          setGuesses={setGuesses}
          letterGuessed={letterGuessed}
          setLetterGuessed={setLetterGuessed}
          letterWrong={letterWrong}
          setLetterWrong={setLetterWrong}
          startGame={startGame}
        />}
      {pageActual === "end" &&
        <GameOver pages={pages}
          setPageActual={setPageActual}
          score={score}
          setScore={setScore}
          setGuesses={setGuesses}
        />}
    </div>
  )
}

export default App