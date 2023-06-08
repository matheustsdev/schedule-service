import { routes } from "./routes.js";
import { Render } from "./src/classes/Render.js";
import { getRouteName } from "./data.js";
//import "./src/pages/forgotPassword/script.js"

async function main() {
    const root = document.getElementById("root");

    if (!root) throw new Error("Root element not found")

    const signup = await fetch(routes[getRouteName()])

    const signupHTML = await signup.text()

    // Render the project
    Render.inner(root, signupHTML);

   //Render.addScriptTag(document.body, signupHTML)
}

addEventListener("DOMContentLoaded", main)

