import { useForm } from "react-hook-form";
import useUserHook from "../../hooks/useUserHook";
import { User } from "../../entities/User";

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

    const onSubmit = async (data: FormData) => {
        try {
            const user: User = {
                email: data.email,
                password: data.password,
            };
            const signinResult = await signin(user);
            if(signinResult){
                alert("Signde in")
            }
        } catch (error) {
            if (error instanceof Error)
                setError("root", {
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
