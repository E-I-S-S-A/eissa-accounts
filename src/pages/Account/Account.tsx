import { useNavigate } from "react-router-dom";
import useUserHook from "../../hooks/useUserHook";
import { ROUTES } from "../../constants/routes";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Account.module.css"
import { User } from "../../entities/User";
import KeepIcon from "../../assets/products/keep-icon.svg"

const Account = () => {
    const { getAndSetUser } = useUserHook();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        checkIfSignedIn();
    }, [])

    const checkIfSignedIn = async () => {
        try {
            const user = await getAndSetUser();
            if (!user) {
                navigate(ROUTES.auth.root, { replace: true });
            }
            else {
                setUser(user)
            }
        } catch (error) {
            console.log("idha")
            navigate(ROUTES.auth.root, { replace: true });
            console.log(error)
        }
    }

    return <div className={styles.main_container}>
        <Navbar />
        <div className={styles.content}>
            <p className={styles.greeting}>Welcome,
                <strong>
                    {" " + user?.firstName}
                </strong>
                !</p>
            <div className={styles.products}>
                <img src={KeepIcon} alt="Eissa Keep" className={styles.product} />
            </div>
        </div>
    </div>
}

export default Account;