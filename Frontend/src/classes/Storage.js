export class Storage{
    static user = localStorage.getItem("@user")

    static save(name, data){
        localStorage.setItem(name, JSON.stringify(data))
    }

    static get(name) {
        return JSON.parse(localStorage.getItem(name))
    }
}