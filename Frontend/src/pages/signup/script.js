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

    api.post("user/create", {
            name: e.target[0].value,
            phone: e.target[1].value,
            email: e.target[2].value,
            password: e.target[3].value,
            confirmPassword: e.target[4].value,
    })
    .then((response) => {
        console.log(response)
        Storage.save("@user", JSON.stringify(jwtDecode(response.data.data.jwt)))
        Storage.save("@token", response.data.data.auth_token)
    })
    .then(() => {
        window.location.replace('/Frontend/src/pages/services')
    })
    .catch((error) => {
        console.log(error)
    })
})