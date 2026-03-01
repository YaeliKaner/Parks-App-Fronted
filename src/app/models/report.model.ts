import Park from "./park.model"
import Users from "./user.model"



export default class Report {

    id! : number
    reportingDate! : Date
    freeText! : string
    satisfaction! : number
    picturePath! : string
    user! : Users
    park! : Park

}