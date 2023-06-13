import { api } from "../../services/api.js"

const form = document.querySelector("form")

form.addEventListener('submit', (e) => {
    e.preventDefault()

    api.post("auth", {
        data: {
            email: e.target[0].value,
            password: e.target[1].value
        }
    }).then((response) => {
        response.window.location.replace('/Frontend/src/pages/mySchedulings')
    }).catch((error) => {
    console.log(error)
    })
})
