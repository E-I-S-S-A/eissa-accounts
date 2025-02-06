import { User } from "../../entities/User";
import { useForm } from "react-hook-form";
import useUserHook from "../../hooks/useUserHook";
import { useEffect, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";

type FormData = {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    otp: string;
    password: string;
    confirmPassword: string;
    isShowPassword: boolean;
};

interface SignupContext {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const useSignupHook = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, touchedFields },
        trigger,
        setError,
    } = useForm<FormData>({ mode: "all" });
    const {
        checkIfEmailExists,
        sendOtp,
        verifyOtp,
        signup,
        checkIfUserIdExists,
    } = useUserHook();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const ALL_PRODUCTS_URL = process.env.REACT_APP_ALL_PRODUCTS || "";
    const password = watch("password");
    const isShowPassword = watch("isShowPassword");

    const { step, setStep } = useOutletContext<SignupContext>();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        return onUnmount();
    }, []);

    const onUnmount = () => {
        setStep(1);
    };

    const onBackPress = () => {
        setStep((prev) => prev - 1);
    };

    const onSubmit = async (data: FormData) => {
        const fieldsToValidate: { [key: number]: (keyof FormData)[] } = {
            1: ["firstName"],
            2: ["email"],
            3: ["otp"],
            4: ["userId"],
            5: ["password", "confirmPassword"],
        };

        const isValid = await trigger(fieldsToValidate[step]);

        if (isValid) {
            switch (step) {
                case 1:
                    setStep((prev) => prev + 1);
                    break;
                case 2:
                    checkEmailAndSendOtp(data);
                    break;
                case 3:
                    verifyUserOtp(data);
                    break;
                case 4:
                    checkUserIdAvailability(data);
                    break;
                case 5:
                    createAccount(data);
                    break;
                default:
                    break;
            }
        }
    };

    const checkEmailAndSendOtp = async (data: FormData) => {
        setIsLoading(true);
        try {
            const isEmailExists = await checkIfEmailExists(data.email);
            if (isEmailExists) {
                setError("email", {
                    message: "Email already exists",
                });

                return;
            }

            const isOtpSent = await sendOtp(data.email);
            if (isOtpSent) {
                setStep((prev) => prev + 1);
            }
            setIsLoading(false);
        } catch (error) {
            if (error instanceof Error)
                setError("email", {
                    message: error.message,
                });
            setIsLoading(false);
        }
    };

    const verifyUserOtp = async (data: FormData): Promise<void> => {
        setIsLoading(true);
        try {
            const result = await verifyOtp(data.email, data.otp);
            if (result) {
                setStep((prev) => prev + 1);
            }
            setIsLoading(false);
        } catch (error) {
            if (error instanceof Error)
                setError("otp", {
                    message: error.message,
                });
            setIsLoading(false);
        }
    };

    const checkUserIdAvailability = async (data: FormData) => {
        setIsLoading(true);
        try {
            const isExists = await checkIfUserIdExists(data.userId);
            if (!isExists) {
                setStep((prev) => prev + 1);
            } else {
                setError("userId", {
                    message: "Eissa ID already exists",
                });
            }
            setIsLoading(false);
        } catch (error) {
            if (error instanceof Error)
                setError("userId", {
                    message: error.message,
                });
            setIsLoading(false);
        }
    };

    const createAccount = async (data: FormData) => {
        setIsLoading(true);
        try {
            const user: User = {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.confirmPassword,
                userId: data.userId,
            };

            const createResult = await signup(user);
            if (createResult) {
                const nextUrl = searchParams.get("next");
                if (nextUrl) {
                    window.location.replace(nextUrl);
                } else {
                    window.location.replace(ALL_PRODUCTS_URL);
                }
            }
            setIsLoading(false);
        } catch (error) {
            if (error instanceof Error)
                setError("userId", {
                    message: error.message,
                });
            setIsLoading(false);
        }
    };

    return {
        handleSubmit,
        step,
        register,
        errors,
        onSubmit,
        touchedFields,
        isShowPassword,
        onBackPress,
        isLoading,
        password,
    };
};

export default useSignupHook;
