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
            title: "Welcome Back",
            description: "Enter your email and password to access your account."
        });
    }


    const handleDetails = () => {
        switch (step) {
            case 1:
                setHeader({
                    title: "Create your account",
                    description: "Step 1 of 4: Enter your name."
                });
                break;
            case 2:
                setHeader({
                    title: "Enter Your Email",
                    description: "Step 2 of 4: Set up your contact information"
                });
                break;
            case 3:
                setHeader({
                    title: "Verify Your Email",
                    description: "Step 3 of 4: Enter the OTP sent to your email."
                }); 
                break;
            case 4:
                setHeader({
                    title: "Secure Your Account",
                    description: "Step 4 of 4:  Create a password and confirm."
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