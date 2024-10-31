import { useForm } from "react-hook-form";
import { EissaButton, EissaInputField } from "react-reusable-elements";
import styles from "./Signup.module.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { REGEXES } from "../../constants/regexes";

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
        trigger
    } = useForm<FormData>({ mode: "all" });

    const { step, setStep } = useOutletContext<SignupContext>();

    useEffect(() => {
        return onUnmount();
    }, []);

    const onUnmount = () => {
        setStep(1);
    };

    const onBackPress = () => {
        setStep(prev => prev - 1);
    };

    const onSubmit = async (data: FormData) => {
        const fieldsToValidate: { [key: number]: (keyof FormData)[] } = {
            1: ["firstName"],
            2: ["email"],
            3: ["otp"],
            4: ["password", "confirmPassword"]
        };

        const isValid = await trigger(fieldsToValidate[step]);

        if (isValid) {
            if (step === 4) {
                console.log(data);
            }
            setStep(prev => prev + 1);
        }
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
                            rules={{ required: { message: "First name is required", value: true } }}
                            isTouched={touchedFields?.firstName}
                        />
                        <EissaInputField
                            label="Last name (optional)"
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
                            rules={{
                                required: { message: "Email is required", value: true }, pattern: {
                                    message: "Invalid email",
                                    value: REGEXES.email,
                                },
                            }}
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
                            rules={{ required: { message: "OTP is required", value: true } }}
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
                            rules={{ required: { message: "Password is required", value: true } }}
                            isTouched={touchedFields?.password}
                        />
                        <EissaInputField
                            label="Confirm password"
                            name="confirmPassword"
                            register={register}
                            error={errors?.confirmPassword}
                            rules={{ required: { message: "Confirm your password", value: true } }}
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
