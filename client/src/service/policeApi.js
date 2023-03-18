import axios from "../axios"

export async function check_police_auth() {
    try {
        const userToken = localStorage.getItem("policeAuthToken");
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
        return await axios.get("/api/private/getpolice", config).then(response => {
            return response.data
        }).catch((error) => {
            return false
        })
    } catch (e) {
        console.log(e)
    }
}