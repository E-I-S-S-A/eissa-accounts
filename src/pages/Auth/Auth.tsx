import styles from "./Auth.module.css"
import BrandLogo from "../../assets/svg/brand-logo-curved.svg"

const Auth = () => {
    return <div className={styles.main_container}>
        <div className={styles.content}>
            <div className={styles.details}>
                <img src={BrandLogo} alt="EISSA logo" className={styles.brand_logo} />
                <div className={styles.step_info}>
                    <p className={styles.title}>Signin</p>
                    <p>Use your EISSA Account</p>
                </div>
            </div>
            <div className={styles.action_container}>
    jb
            </div>
        </div>
    </div>
}

export default Auth;