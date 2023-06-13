import { api } from "../../services/api.js"

const form = document.querySelector("form")

form.addEventListener('submit', (e) => {
    e.preventDefault()

    api.post("signIn/", {
        data: {
            name: e.target[0].value,
            phone: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
            confirmPassword: e.target[4].value,
        }
    }).then((response) => response.data.data window.location.href = "http://127.0.0.1:5500/Frontend/src/pages/scheduleService/scheduleService.html").catch((error) => {
        console.log(error)
    })
})