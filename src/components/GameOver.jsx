import styles from './GameOver.module.css'
import astronautCrying from '../imgs/astronaut_crying.png'

function GameOver({ pages, setPageActual, score, setScore, setGuesses }) {

  const restartGame = () => {
    setGuesses(3);
    setScore(0);
    setPageActual(pages[0].name)
  }

  return (
    <div className={styles.gameOverContainer}>
      <h1>Game Over</h1>
      <p>Your score was: <span>{score}</span></p>
      <img src={astronautCrying} alt="Astronaut crying" />
      <button className={styles.btnRestart} onClick={restartGame}>Restart Game</button>
    </div>
  )
}

export default GameOver