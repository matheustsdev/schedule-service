import { setRouteName } from "../../../data.js";

console.log("Forgot password script loaded")

function goToSignup() {
    console.log("Go to signup");

    setRouteName("signup")
}

export { goToSignup }