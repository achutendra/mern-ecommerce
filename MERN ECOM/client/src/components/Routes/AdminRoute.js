import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute(){
    const [ok,setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async() => {
            const res = await axios.get(`/api/v1/auth/admin-auth`);
            // console.log(`value of ok is here ${res.data.ok}`)
            
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        };
        
        // console.log(`value of auth?.token in private.js ${auth?.token}`)
        if(auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet/> : <Spinner path=""/>
};