import { useForm } from "react-hook-form";
import { EissaButton, EissaInputField } from "react-reusable-elements";
import styles from "./Signin.module.css";
import { REGEXES } from "../../constants/regexes";

type FormData = {
    email: string;
    password: string;
};

const Signin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<FormData>({ mode: "all" });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className={styles.signin_container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.fields}>
                    <EissaInputField
                        label="Email"
                        name="email"
                        register={register}
                        error={errors?.email}
                        isTouched={touchedFields?.email}
                        rules={{
                            required: {
                                message: "Email is required",
                                value: true,
                            },
                            pattern: {
                                message: "Invalid email",
                                value: REGEXES.email,
                            },
                        }}
                    />
                    <EissaInputField
                        label="Password"
                        name="password"
                        register={register}
                        error={errors?.password}
                        isTouched={touchedFields?.password}
                        rules={{
                            required: {
                                message: "Email is required",
                                value: true,
                            },
                            pattern: {
                                message: "Password must be 8+ characters with a letter, number, and special character.",
                                value: REGEXES.password,
                            },
                        }}
                    />
                </div>
                <EissaButton label="Submit" type="submit" variant="primary" />
            </form>
        </div>
    );
};

export default Signin;
