import { axiosPrivate } from "../axios-private";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
//import useAuth from "./useAuth";
import {AuthContext} from '../context/auth-context';

const useAxiosPrivate = () => {
    const refreshAccessToken = useRefreshToken();
    //const { token } = useAuth();
    const authContext = useContext(AuthContext);
    const token = authContext.user.token;

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refreshAccessToken();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [token, refreshAccessToken])

    return axiosPrivate;
}

export default useAxiosPrivate;