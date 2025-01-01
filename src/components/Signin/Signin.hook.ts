import { useForm } from "react-hook-form";


type FormData = {
    email: string;
    password: string;
};

const useSigninHook = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<FormData>({ mode: "all" });

    const onSubmit = (data: FormData) => {
        console.log(data);
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
