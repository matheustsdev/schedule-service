import { api } from "../../services/api.js"

const form = document.querySelector("form")

form.addEventListener('submit', (e) => {
    e.preventDefault()

    api.post("login/", {
        data: {
            email: e.target[0].value,
            password: e.target[1].value
        }
    }).then((response) => {
            window.location.replace(response.url)
    }).catch((error) => {
    console.log(error)
    })
})