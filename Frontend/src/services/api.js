
const api = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})

export { api }