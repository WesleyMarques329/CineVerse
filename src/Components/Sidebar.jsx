import styles from './Sidebar.module.css'

const Sidebar = () => {
  return (
    <nav className={styles.navBar}>
        <ul className={styles.navItem}>
            <li className={styles.navLink}><a >Home</a></li>
            <li className={styles.navLink}><a>MovieWish</a></li>
            <li className={styles.navLink}><a>Filmes</a></li>
            <li className={styles.navLink}><a>Mais procurados</a></li>
        </ul>
    </nav>
  )
}

export default Sidebar