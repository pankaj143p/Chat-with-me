const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")

async function userDetails(request,response){
    try {
        // Try to get token from cookies first, then from Authorization header
        let token = request.cookies.token || ""
        
        // If no token in cookies, check Authorization header
        if(!token){
            const authHeader = request.headers.authorization
            if(authHeader && authHeader.startsWith('Bearer ')){
                token = authHeader.substring(7) // Remove 'Bearer ' prefix
            }
        }

        const user = await getUserDetailsFromToken(token)

        return response.status(200).json({
            message : "user details",
            data : user
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}

module.exports = userDetails