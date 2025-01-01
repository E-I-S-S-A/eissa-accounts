import { HttpStatus } from "../constants/httpStatus";
import { User } from "../entities/User";

const useUserHook = () => {
    const ACCOUNTS_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/accounts`;

    const checkIfEmailExists = async (email: string): Promise<boolean> => {
        const result = await fetch(
            `${ACCOUNTS_BASE_URL}/email-exists?email=${email}`
        );

        if (result.status === HttpStatus.OK) {
            return true;
        } else if (result.status === HttpStatus.NOT_FOUND) {
            return false;
        }

        throw new Error("Failed to check email");
    };

    const checkIfUserIdExists = async (userId: string): Promise<boolean> => {
        const result = await fetch(
            `${ACCOUNTS_BASE_URL}/userId-exists?userId=${userId}`
        );

        if (result.status === HttpStatus.OK) {
            return true;
        } else if (result.status === HttpStatus.NOT_FOUND) {
            return false;
        }

        throw new Error("Failed to check userId");
    };

    const sendOtp = async (email: string): Promise<boolean> => {
        const result = await fetch(`${ACCOUNTS_BASE_URL}/send-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        });

        if (result.status === HttpStatus.CREATED) {
            return true;
        }

        throw new Error("Failed to send OTP");
    };

    const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
        const result = await fetch(`${ACCOUNTS_BASE_URL}/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, otp: otp }),
        });

        if (result.status === HttpStatus.OK) {
            return true;
        } else if (result.status === HttpStatus.GONE) {
            throw new Error("OTP expired");
        } else if (result.status === HttpStatus.UNAUTHORIZED) {
            throw new Error("Invalid OTP");
        }

        throw new Error("Failed to verify OTP");
    };

    const signup = async (user: User): Promise<boolean> => {
        const result = await fetch(`${ACCOUNTS_BASE_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (result.status === HttpStatus.CREATED) {
            return true;
        } else if (result.status === HttpStatus.CONFLICT) {
            throw new Error("User already exists");
        }

        throw new Error("Failed to sign up");
    };

    const signin = async (user: User): Promise<boolean> => {
        const result = await fetch(`${ACCOUNTS_BASE_URL}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        
        if (result.status === HttpStatus.OK) {
            const resultJson = await result.json();
            console.log({result})
            console.log({resultJson})
            return true;
        } else if (result.status === HttpStatus.UNAUTHORIZED) {
            throw new Error("Incorreact email or password");
        }

        throw new Error("Failed to sign up");
    };

    return {
        checkIfEmailExists,
        sendOtp,
        verifyOtp,
        signup,
        checkIfUserIdExists,
        signin
    };
};

export default useUserHook;
