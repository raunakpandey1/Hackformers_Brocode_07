

import axios from "../axios"


export async function check_user_auth() {
    try {
        const userToken = localStorage.getItem("userAuthToken");
        console.log(userToken)
        if(!userToken){
            return false
        }
        const config = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            },
        }
        return await axios.get("/api/private/getuser", config).then(response => {
            return response.data
        }).catch((error) => {
            return false
        })
    } catch (e) {
        console.log(e)
    }
}

