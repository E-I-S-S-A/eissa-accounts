import { useForm } from "react-hook-form";
import { EissaButton, EissaCheckbox, EissaInputField, } from "react-reusable-elements";
import styles from "./Signup.module.css";
import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { REGEXES } from "../../constants/regexes";
import useUserHook from "../../hooks/useUserHook";
import { User } from "../../entities/User";
import useSignupHook from "./Signup.hook";

const Signup = () => {

    const { handleSubmit,
        step,
        register,
        errors,
        onSubmit,
        touchedFields,
        isShowPassword,
        onBackPress,
        isLoading,
        password
    } = useSignupHook();
    const location = useLocation();
    
    return (
        <div className={styles.signup_container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.fields}>
                    {
                        step === 1 &&
                        <>
                            <EissaInputField
                                label="First name"
                                name="firstName"
                                register={register}
                                error={errors?.firstName}
                                rules={{
                                    required: {
                                        message: "First name is required",
                                        value: true,
                                    },
                                }}
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
                    }
                    {
                        step === 2 &&
                        <EissaInputField
                            label="Email"
                            name="email"
                            register={register}
                            error={errors?.email}
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
                            isTouched={touchedFields?.email}
                        />
                    }
                    {
                        step === 3 &&
                        <EissaInputField
                            label="Verify OTP"
                            name="otp"
                            register={register}
                            error={errors?.otp}
                            rules={{
                                required: {
                                    message: "OTP is required",
                                    value: true,
                                },
                            }}
                            isTouched={touchedFields?.otp}
                        />
                    }
                    {
                        step === 4 &&
                        <EissaInputField
                            label="Eissa Id"
                            name="userId"
                            register={register}
                            error={errors?.userId}
                            rules={{
                                required: {
                                    message: "Eissa Id is required",
                                    value: true,
                                },
                            }}
                            isTouched={touchedFields?.userId}
                        />
                    }
                    {
                        step === 5 &&
                        <>
                            <EissaInputField
                                label="Password"
                                type={isShowPassword ? "text" : "password"}
                                name="password"
                                register={register}
                                error={errors?.password}
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
                                isTouched={touchedFields?.password}
                            />
                            <EissaInputField
                                label="Confirm password"
                                type={isShowPassword ? "text" : "password"}
                                name="confirmPassword"
                                register={register}
                                error={errors?.confirmPassword}
                                rules={{
                                    required: {
                                        message: "Confirm your password",
                                        value: true,
                                    },
                                    validate: (value) =>
                                        password === value ||
                                        "Passwords do not match",
                                }}
                                isTouched={touchedFields?.confirmPassword}
                            />
                            <EissaCheckbox label="Show password" name="isShowPassword" register={register} />
                        </>
                    }

                    {step === 1 && (
                        <p className={styles.signin_text}>
                            Already have an account?
                            <Link
                                to={{pathname:ROUTES.auth.signin, search: location.search}}
                                className={styles.link}
                            >
                                Sign In
                            </Link>
                        </p>
                    )}
                </div>
                <div className={styles.buttons}>
                    {step > 1 && (
                        <EissaButton
                            label="Back"
                            type="button"
                            variant="secondary"
                            onClick={onBackPress}
                        />
                    )}
                    <EissaButton
                        label={step < 5 ? "Next" : "Sign Up"}
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                    />
                </div>
            </form>
        </div>
    );
};

export default Signup;
