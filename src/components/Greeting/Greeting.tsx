import styles from "./Greeting.module.css"
import KeepIcon from "../../assets/products/keep-icon.svg"

type GreetingProps = {
    userName: string
}

const Greeting = (props: GreetingProps) => {
    const { userName } = props;
    return <div className={styles.content}>
        <p className={styles.greeting}>Welcome,
            <strong>
                {" " + (userName || "")}
            </strong>
            !</p>
        <div className={styles.products}>
            <img src={KeepIcon} alt="Eissa Keep" className={styles.product} />
        </div>
    </div>
}

export default Greeting;