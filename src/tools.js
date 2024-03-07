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
    console.log(newStr)
    return newStr;
}