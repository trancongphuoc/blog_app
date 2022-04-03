import axios from "axios";

export function getUser() {
    let user = window.localStorage.getItem("user");
    if(user != null && user != undefined) {
        console.log(user)
        user = JSON.parse(user);
        return user;
    } else {
        return null;
    }
}