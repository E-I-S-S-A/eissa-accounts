import styles from "./Navbar.module.css"
import EissaLogo from "./../../assets/svg/brand-logo-curved.svg"
import { EissaAvatar } from "react-reusable-elements";
import { useEffect, useState } from "react";
import useUserHook from "../../hooks/useUserHook";
import { User } from "../../entities/User";



const Navbar = () => {
    const { getAndSetUser } = useUserHook();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try {
            const userRes = await getAndSetUser();
            setUser(userRes)
        } catch (error) {
            console.log(error)
        }
    }


    return <div className={styles.main_conatiner}>
        <div className={styles.brand}>
            <img src={EissaLogo} alt="Eissa Keep" className={styles.brand_logo} />
            <div className={styles.brand_name}>Accounts</div>
        </div>
        <div className={styles.actions}>
            <EissaAvatar height={40} name={user?.firstName} img={user?.avatar} fontSize={20}/>
        </div>
    </div>
}

export default Navbar;