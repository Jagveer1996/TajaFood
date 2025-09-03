import axios from 'axios';
export const SERVERURL = "http://localhost:8000"

const queryClient = axios.create({
    baseURL : SERVERURL,  
    headers : {
        'Content-Type' : 'application/json'
    }
});

export default queryClient; 