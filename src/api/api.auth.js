import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useAxios = () => {
    const {token} = useAuth();

    const instanceAPI = axios.create({
        baseURL: 'https://privilegecare-deploy-gqmt.onrender.com'
    })

    instanceAPI.interceptors.request.use(
        config => {
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        },
        error => Promise.reject(error)
    )
    return instanceAPI;
}

export default useAxios;