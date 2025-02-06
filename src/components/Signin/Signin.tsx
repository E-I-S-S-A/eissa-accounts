import { EissaButton, EissaInputField } from "react-reusable-elements";
import styles from "./Signin.module.css";
import { REGEXES } from "../../constants/regexes";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import useSigninHook from "./Signin.hook";

const Signin = () => {

    const { handleSubmit, onSubmit, register, errors, touchedFields } = useSigninHook();
    const location = useLocation();

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
                                message: "Password is required",
                                value: true,
                            },
                            pattern: {
                                message: "Password must be 8+ characters with a letter, number, and special character.",
                                value: REGEXES.password,
                            },
                        }}
                    />
                    <div className={styles.create_account_text}>
                        <div>
                            Don't have an account?
                            <Link to={{ pathname: ROUTES.auth.signup, search: location.search }} className={styles.link}>
                                Sign Up
                            </Link>
                        </div>
                        <Link to={{pathname:ROUTES.auth.forgotPassword, search:location.search}} className={styles.link}>
                            Forgot password?
                        </Link>
                    </div>
                </div>
                <EissaButton label="Sign In" type="submit" variant="primary" />
            </form>
        </div>
    );
};

export default Signin;
