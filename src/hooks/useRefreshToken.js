import {useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import {AuthContext} from '../context/auth-context';

const useRefreshToken = () => {
    const [token, setToken] = useState(null);
    const dispatch = useDispatch();
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.refreshToken()
          .then(accessToken => setToken(accessToken))
          .catch(err => console.log(err));
      }, [authContext.refreshToken]);

    const refreshAccessToken = async () => token;
    return refreshAccessToken;
}

export default useRefreshToken;