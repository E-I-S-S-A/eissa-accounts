import { useNavigate } from "react-router-dom";
import useUserHook from "../../hooks/useUserHook";
import { ROUTES } from "../../constants/routes";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Account.module.css"
import { User } from "../../entities/User";
import Sidebar from "../../components/Sidebar/Sidebar";
import Greeting from "../../components/Greeting/Greeting";

const Account = () => {
    const { getAndSetUser } = useUserHook();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false)

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

    const openProfileModal = () => {
        setIsVisible(prev => !prev)
    }

    const closeProfileModal = () => {
        setIsVisible(prev => !prev)
    }

    return <div className={styles.main_container}>
        <Navbar onAvatarClick={openProfileModal} />
        <div className={styles.layout}>
            <Sidebar />
            <Greeting userName={user?.firstName || ""} />
        </div>
    </div>
}

export default Account;