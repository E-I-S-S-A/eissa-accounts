const useUserHook = () => {
    const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const isEmailExists = () => {
        console.log({ REACT_APP_API_BASE_URL });
    };

    return {
        isEmailExists,
    };
};

export default useUserHook;
