import Cities from "./cities.model"

export default class Users {
    id! : number
    name! : string
    password! : string
    confirmPassword! : string
    birthDate! : Date
    city! : Cities
    phone! : string
    email! : string
    personalStatus! : PersonalStatus
    picturePath! : string

}

export enum PersonalStatus{
married = "married",
single = "single",
}


