import styles from "./Auth.module.css"
import BrandLogo from "../../assets/svg/brand-logo-curved.svg"
import Signin from "../../components/Signin/Signin";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROUTES } from "../../constants/routes";

const Auth = () => {

    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [header, setHeader] = useState({
        title: "Default Title",
        description: "Default Description"
    });

    const [step, setStep] = useState<number>(1);

    useEffect(() => {
        handleLocation()
    }, [step, location])

    const handleLocation = () => {
        const isSignup = location.pathname.includes(ROUTES.auth.signup);

        if (isSignup) {
            handleDetails();
            return;
        }

        setHeader({
            title: "Signin",
            description: "Use your Eissa account"
        });
    }


    const handleDetails = () => {
        switch (step) {
            case 1:
                setHeader({
                    title: "Signup - Step 1",
                    description: "Enter your personal information"
                });
                break;
            case 2:
                setHeader({
                    title: "Signup - Step 2",
                    description: "Enter your contact details"
                });
                break;
            case 3:
                setHeader({
                    title: "Signup - Step 3",
                    description: "Create a password"
                });
                break;
            case 4:
                setHeader({
                    title: "Signup - Complete",
                    description: "Review and submit your details"
                });
                break;
            default:
                setHeader({
                    title: "",
                    description: ""
                });
        }
    }

    return <div className={styles.main_container}>
        <div className={styles.features}>
            <div className={styles.content}>
                <div className={styles.details}>
                    <img src={BrandLogo} alt="EISSA logo" className={styles.brand_logo} />
                    <div className={styles.step_info}>
                        <p className={styles.title}>{header.title}</p>
                        <p>{header.description}</p>
                    </div>
                </div>
                <div className={styles.action_container}>
                    <Outlet context={{ step, setStep }} />
                </div>
            </div>
            {/* <div className={styles.other_options}>
                <div>language</div>
            </div> */}
        </div>
    </div>
}

export default Auth;