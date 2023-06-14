import { api } from "../../services/api.js"
import { Storage } from "../../classes/Storage.js"
import jwtDecode from 'https://cdn.jsdelivr.net/npm/jwt-decode@3.1.2/+esm'

const token = Storage.get("@token")

if(token) {
    window.location.replace('/Frontend/src/pages/services')
}

const form = document.querySelector("form")

form.addEventListener('submit', (e) => {
    e.preventDefault()

    api.post("auth", {
        email: e.target[0].value,
        password: e.target[1].value
    })
    .then((response) => {
        Storage.save("@token", response.data.auth_token)
        Storage.save("@user", JSON.stringify(jwtDecode(response.data.jwt)))
    })
    .then(() => {
        window.location.replace('/Frontend/src/pages/services')
    })
    .catch((error) => {
    console.log(error)
    })
})
