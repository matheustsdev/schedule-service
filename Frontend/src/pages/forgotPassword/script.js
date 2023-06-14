import {api} from "../../services/api.js"

const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e.target[0].value)

    api.post("user/forgotPassword", {
        email: e.target[0].value
    })
    .catch(error => console.log(error))
})

