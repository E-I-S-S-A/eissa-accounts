import { useForm } from "react-hook-form";
import { EissaButton, EissaInputField } from "react-reusable-elements";
import styles from "./Signup.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    otp: string;
    password: string;
    confirmPassword: string;
};

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<FormData>({ mode: "all" });

    const [step, setStep] = useState<number>(1);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({ step: step.toString() });
    }, [step])

    const onSubmit = (data: FormData) => {
        if (step === 4) {
            console.log(data);
        }

        const nextStep = step + 1;
        setStep(nextStep);
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
                </div>
                <EissaButton
                    label={step < 4 ? "Next" : "Submit"}
                    type="submit"
                    variant="primary"
                />
            </form>
        </div>
    );
};

export default Signup;
