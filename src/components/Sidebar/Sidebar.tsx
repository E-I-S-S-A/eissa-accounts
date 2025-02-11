import styles from "./Sidebar.module.css"

const Sidebar = () => {
    return <ul className={styles.container}>
        <li className={styles.option}>Products</li>
        <li className={styles.option}>General</li>
        <li className={styles.option}>About</li>
    </ul>
}

export default Sidebar;