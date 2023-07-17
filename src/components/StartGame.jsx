import styles from './StartGame.module.css'
import { FaGithub } from 'react-icons/fa'
import Astronauts from '../imgs/astronaut_start.png'

function StartGame({ pages, setPageActual, startGame }) {

    const toPlay = () => {
        startGame()
        setPageActual(pages[1].name)
    }

    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <img src={Astronauts} alt="Astronaults Confused and Idea" />
            </div>
            <div className={styles.texts}>
                <h1>Guess Letters</h1>
                <p>Click the button below to start playing</p>
                <button className={styles.btnStart} onClick={toPlay}>Start Game</button>
            </div>
            <div className={styles.footer}>
                <p>Coded by <a href="https://github.com/thiag1114" target='_blank'>Thiago Augusto <FaGithub /></a></p>
            </div>
        </div>
    )
}

export default StartGame