class Connection{
    //trocar baseURL pela URL da API que conecta ao backend
    constructor(baseURL){
        this.baseURL = baseURL;
    }

    //fazer o CRUD

    saveToken(token){
        localStorage.setItem('token', token)
    }

    validateToken(){
        const token = localStorage.getItem('token');
        if(!token)
            return false
        token = true
    }

    async renewToken() {
        const response = await fetch(`${this.baseURL}/renew-token`, {
          method: 'POST',
          // Add any necessary headers or body for token renewal
        });
        const newToken = await response.json();
        localStorage.setItem('token', newToken);
      }
}