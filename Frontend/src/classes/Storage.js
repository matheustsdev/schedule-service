export class Storage{
    static user = localStorage.getItem("@user")

    static save(name, data){
        localStorage.setItem(name, data)
    }

    static get(name) {
        return localStorage.getItem(name)
    }
}