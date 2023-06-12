import { Render } from "../../classes/Render.js"
import { api } from "../../services/api.js"

Render.header()

const login = await api.get("/login").then((response) => response.data.data
).catch((error) => {
    console.log(error)
})

const mainElement = document.querySelector("main")

Render.inner(mainElement, login.map(() => `
    <img class="logo" src="../../assets/imgs/Logo_maior.png">
    <h1>Login</h1>
    <form>
        <div class="form__item">
            <label for="email">E-mail:</label>
            <input type="email"  requerid
            id="email" name="user_email" class="login__container"  
            placeholder="Digite seu e-mail" 
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
        </div>
        <div class="form__item">
            <label for="senha">Senha:</label>
            <input type="password" requerid
            id="senha" name="user_password" class="login__container"
            placeholder="Digite sua senha"
            pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}">
        </div>

        <div class="form__item">
            <input type="submit" requerid
            id="submit" name="login" class="login__container"
            value="Login">
        </div>
    </form>`)
)

