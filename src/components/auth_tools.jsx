// принимает токен для проверки и проверяет, действителен ли он
export async function is_bearer_valid(bearerToken) {
    let res = false
    
    // если токена нет, то и делать ничего не надо
    if (!bearerToken) {        
        return res
    }
    // если токен есть, то проверяем, что все норм
    let path = "https://xn--80afw1b6b.xn--p1ai/wp-json/jwt-auth/v1/token/validate"
    await fetch(path, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type" : "application/json",
            "Authorization" : 'Bearer ' + bearerToken
        },
    }).then((response) => {
        return response.json()
    }).then((data) => {
        if (data.data?.status === 200) {
            //console.log("Status checked")
            res = true
        } else {
            res = false
        }
    })

    //console.log("Exec done", res)
    return res
}