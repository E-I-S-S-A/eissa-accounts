import { useForm } from "react-hook-form";
import useUserHook from "../../hooks/useUserHook";
import { User } from "../../entities/User";
import { useSearchParams } from "react-router-dom";

type FormData = {
    email: string;
    password: string;
};

const useSigninHook = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
        setError,
    } = useForm<FormData>({ mode: "all" });
    const { signin } = useUserHook();
    const [searchParams] = useSearchParams();
    const ALL_PRODUCTS_URL = process.env.REACT_APP_ALL_PRODUCTS || "";

    const onSubmit = async (data: FormData) => {
        try {
            const user: User = {
                email: data.email,
                password: data.password,
            };
            const signinResult = await signin(user);
            if (signinResult) {
                const nextUrl = searchParams.get("next");
                if (nextUrl) {
                    window.location.replace(nextUrl);
                } else {
                    window.location.replace(ALL_PRODUCTS_URL);
                }
            }
        } catch (error) {
            if (error instanceof Error)
                setError("password", {
                    message: error.message,
                });
        }
    };

    return {
        handleSubmit,
        onSubmit,
        register,
        errors,
        touchedFields,
    };
};

export default useSigninHook;
