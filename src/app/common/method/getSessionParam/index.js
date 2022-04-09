

export const getSessionParam = (param) => {
    if (!localStorage.getItem("persist:admin")) {
        return null
    }

    try {
        let sessionLogin = JSON.parse(localStorage.getItem("persist:admin"))
        let res = JSON.parse(sessionLogin.user)[param]
        if (res.trim() === "CLUB") {
            return null
        }
        return res
    } catch {
        return null
    }

}