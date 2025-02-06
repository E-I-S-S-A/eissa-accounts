import { useNavigate } from "react-router-dom";
import useUserHook from "../../hooks/useUserHook";
import { ROUTES } from "../../constants/routes";
import { useEffect } from "react";

const Account = () => {
    const { getUser } = useUserHook();
    const navigate = useNavigate();

    useEffect(() => {
        checkIfSignedIn();
    }, [])

    const checkIfSignedIn = async () => {
        try {
            const user = await getUser();
            if (!user) {
                navigate(ROUTES.auth.root, { replace: true });
            }
        } catch (error) {
            console.log("idha")
            navigate(ROUTES.auth.root, { replace: true });
            console.log(error)
        }
    }

    return <>Acc</>
}

export default Account;