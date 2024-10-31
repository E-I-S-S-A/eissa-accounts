import { useForm } from "react-hook-form";
import { EissaButton, EissaInputField } from "react-reusable-elements";
import styles from "./Signup.module.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    otp: string;
    password: string;
    confirmPassword: string;
};

interface SignupContext {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<FormData>({ mode: "all" });

    const { step, setStep } = useOutletContext<SignupContext>();

    useEffect(() => {
        return onUnmount();
    }, [])

    const onUnmount = () => {
        setStep(1);
    }

    const onBackPress = () => {
        setStep(prev => prev - 1)
    }

    const onSubmit = (data: FormData) => {
        if (step === 4) {
            console.log(data);
        }

        setStep(prev => prev + 1);
    };

    const Steps = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <EissaInputField
                            label="First name"
                            name="firstName"
                            register={register}
                            error={errors?.firstName}
                            isTouched={touchedFields?.firstName}
                        />
                        <EissaInputField
                            label="Last name"
                            name="lastName"
                            register={register}
                            error={errors?.lastName}
                            isTouched={touchedFields?.lastName}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <EissaInputField
                            label="Email"
                            name="email"
                            register={register}
                            error={errors?.email}
                            isTouched={touchedFields?.email}
                        />
                    </>
                );

            case 3:
                return (
                    <>
                        <EissaInputField
                            label="Verify OTP"
                            name="otp"
                            register={register}
                            error={errors?.otp}
                            isTouched={touchedFields?.otp}
                        />
                    </>
                );

            case 4:
                return (
                    <>
                        <EissaInputField
                            label="Password"
                            name="password"
                            register={register}
                            error={errors?.password}
                            isTouched={touchedFields?.password}
                        />
                        <EissaInputField
                            label="Confirm password"
                            name="confirmPassword"
                            register={register}
                            error={errors?.confirmPassword}
                            isTouched={touchedFields?.confirmPassword}
                        />
                    </>
                );

            default:
                return <></>;
        }
    };

    return (
        <div className={styles.signup_container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.fields}>
                    <Steps />
                    {
                        step === 1 &&
                        <p className={styles.signin_text}>Already have an account?
                            <Link to={ROUTES.auth.signin} className={styles.link}>Sign In</Link>
                        </p>
                    }
                </div>
                <div className={styles.buttons}>

                    {
                        step > 1 &&
                        <EissaButton
                            label="Back"
                            type="button"
                            variant="secondary"
                            onClick={onBackPress}
                        />
                    }
                    <EissaButton
                        label={step < 4 ? "Next" : "Sign Up"}
                        type="submit"
                        variant="primary"
                    />
                </div>
            </form>
        </div>
    );
};

export default Signup;
