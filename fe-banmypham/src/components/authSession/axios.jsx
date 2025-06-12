import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
});

export const useAxiosInterceptors = () => {
    const { setSessionExpired } = useContext(AuthContext);

    useEffect(() => {
        const resInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    // Token hết hạn, báo về context
                    setSessionExpired(true);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(resInterceptor);
        };
    }, [setSessionExpired]);
};

export default instance;
