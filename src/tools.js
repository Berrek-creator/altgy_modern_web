// принимает дату в формате 2023-12-11T16:32:04 и переводит её в dd.mm.yyyy hh:mm:ss
export function pretty_date(date_time) {
    if (date_time) {
        date_time = date_time.replace("T", " ")
        let d_t = date_time.split(" ")
        let d = d_t[0].split('-')
    
        return d[2] + "." + d[1] + "." + d[0] + " " + d_t[1]
    }
    return ""
}

// переводит html коды в символы
export function c_unescape(str) {
    if (!str) {
        return ""
    }
    const symbols = {
        "&amp;" : "&",
        "&lt;" : "<",
        "&gt;" : ">",
        "&quot;" : "\"",
        "&apos;" : "'",
        "&#8220;" : "“",
        "&#8221;" : "”",
        "&#8211;" : "–"
    }
    let newStr = str
    for (const symbol in symbols) {
        if (str.indexOf(symbol) >= 0) {
            newStr = newStr.replaceAll(symbol, symbols[symbol])
        }
    }
    //console.log(newStr)
    return newStr;
}

export function draft_fetch(method, data = "", id = "", bearerToken = "") {    
    // исходный путь к постам
    let path = "https://xn--80afw1b6b.xn--p1ai/wp-json/wp/v2/posts/"

    
    // загловки
    let headers = {
        "Content-type" : "application/json",
        "Authorization" : 'Bearer ' + bearerToken
    }

    let request_body = {
        method: method,
        mode: "cors",
        headers: headers,
    }

    // если это POST, то нужны данные о записе
    if (method === "POST") {
        request_body.body = data
    }

    // Для запросов этого рода нужен id поста
    if (["POST", "DELETE"].includes(method)) {
        path += id
    }

    // если id и не DELETE или GET, то это PUT (то есть обновление)
    if (id && !method.includes("DELETE", "GET") ) {
        method = "PUT"
    }

    console.log("Method:", method)

    return fetch(path, request_body).then((response) => {
        return response.json()
    })
}