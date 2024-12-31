const useUserHook = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const isEmailExists = async (email: string) => {
        try {
            const result = await fetch(`${API_BASE_URL}/accounts/email-exists?email=${email}`);
            
            if (!result.ok) {
                throw new Error(`HTTP error! status: ${result.status}`);
            }
            
            const isExists = await result.text(); // Parse the JSON response
            console.log(isExists); // Log the parsed JSON
        } catch (error) {
            console.error("Error checking email existence:", error);
        }
    };
    

    return {
        isEmailExists,
    };
};

export default useUserHook;
