import {api} from "../../services/api.js"

const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    api.post("user/forgotPassword", {
        email: e.target[0].value
    })
    .catch(error => console.log(error))
})

