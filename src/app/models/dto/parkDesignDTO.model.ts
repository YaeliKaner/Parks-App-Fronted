import Feature from "../feature.model"
import { RatingsBreakdown } from "../parkDesign.model"
import ParkDTO from "./parkDTO.model"
import UsersDTO from "./usersDTO.model"


export default class ParkDesignDTO {


    id! : number
    updateDate! : Date
    remark! : string
    park! : ParkDTO
    user! : UsersDTO
    feature! : Feature
    ratingsBreakdown! : RatingsBreakdown


}