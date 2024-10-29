import styles from "./Auth.module.css"
import BrandLogo from "../../assets/svg/brand-logo-curved.svg"
import Signin from "../../components/Signin/Signin";

const Auth = () => {
    return <div className={styles.main_container}>
        <div className={styles.features}>
            <div className={styles.content}>
                <div className={styles.details}>
                    <img src={BrandLogo} alt="EISSA logo" className={styles.brand_logo} />
                    <div className={styles.step_info}>
                        <p className={styles.title}>Signin</p>
                        <p>Use your EISSA account</p>
                    </div>
                </div>
                <div className={styles.action_container}>
                    <Signin />
                </div>
            </div>
            <div className={styles.other_options}>
                {/* <div>language</div> */}
            </div>
        </div>
    </div>
}

export default Auth;