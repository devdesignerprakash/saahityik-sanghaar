

import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const http= axios.create({
    baseURL:`${process.env.BACKEND_URL}`
})

http.interceptors.request.use((config)=>{
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    if(token){
        config.headers['Authorization'] = `Bearer ${token.trim()}`
    }
    return config
})

http.interceptors.response.use((response)=>{
    if(response.status===200){


    }

})
http.interceptors.




