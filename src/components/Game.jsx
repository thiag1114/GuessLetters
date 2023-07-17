import { useState, useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Game.module.css'
import astronautImage from '../imgs/astronaut_rocket.png'

function Game({ pages, setPageActual, score, setScore, picketCategory, pickedWord, letters, guesses, setGuesses, letterGuessed, setLetterGuessed, letterWrong, setLetterWrong, startGame }) {

  const [letterInput, setLetterInput] = useState("")
  const inputRef = useRef(null)
  const message = () => {
    toast('You reached 1.000 points, PERFECT! 🥳', {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  // Submit the letter
  const handleSubmit = (e) => {
    e.preventDefault()

    if (letterGuessed.includes(letterInput) || letterWrong.includes(letterInput)) {
      setLetterInput("")
      inputRef.current.focus()
      return
    }
    if (letters.includes(letterInput)) {
      setLetterGuessed((prevLetterGuessed) => [...prevLetterGuessed, letterInput]);
    } else {
      setGuesses((prevGuesses) => prevGuesses - 1)
      setLetterWrong((prevLetterWrong) => [...prevLetterWrong, letterInput]);
    }
    setLetterInput("")
    inputRef.current.focus()
  }

  // Check if got the word right
  useEffect(() => {
    const uniqueLetters = [...new Set(pickedWord.toUpperCase())]
    if (uniqueLetters.length === letterGuessed.length) {
      setScore((prevScore) => prevScore += 100)
      startGame()
    }
  }, [letterGuessed, pickedWord])

  // Check if the guess is over
  useEffect(() => {
    if (guesses < 1) {
      setPageActual(pages[2].name)
    }
  }, [guesses])

  // Check if the score is greater than 1000 points
  useEffect(() => {
    if (score === 1000) {
      message()
    }
  }, [score])

  return (
    <div className={styles.container}>
      <ToastContainer
        className={styles.toastContainer}
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <div className={styles.contentContainer}>
        <p>Score: <span>{score}</span></p>
        <h1>Guess the word</h1>
        <p className={styles.paragraphTip}>Tip about the word: <span>{picketCategory}</span></p>
        <p>You still have <span>{guesses}</span> guesses</p>
        <div className={styles.wordContainer}>
          {letters.map((letter, i) => (
            letterGuessed.includes(letter) ? (
              <p key={i} className={styles.letterParagraph}>{letter}</p>
            ) : (
              <p key={i} className={styles.emptyParagraph}></p>
            )
          ))}
        </div>
        <div className={styles.inputContainer}>
          <p>Try to guess the letter of the word:</p>
          <form onSubmit={handleSubmit}>
            <input onChange={(e) => setLetterInput(e.target.value.toUpperCase())}
              type="text" name="letter" maxLength="1" autoComplete='off' required value={letterInput} ref={inputRef} />
            <button className={styles.buttonPlay}>To play!</button>
          </form>
        </div>
        <div className={styles.letterWrongContainer}>
          {letterWrong.length > 0 && (
            <p>Letters already used:</p>
          )}
          {letterWrong.map((letter, i) => (
            <p key={i} className={styles.wrongLetterSquare}>{letter}</p>
          ))}
        </div>
      </div>
      <div className={styles.imgContainer}>
        <img src={astronautImage} alt="Astronaut confused" />
      </div>
    </div>
  )
}

export default Game