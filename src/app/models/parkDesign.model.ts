import ParkDTO from "./dto/parkDTO.model"
import Feature from "./feature.model"
import Park from "./park.model"
import Users from "./user.model"

export default class ParkDesign {

    id? : number
    updateDate? : Date
    remark! : string
    park! : Park
    user? : Users
    feature! : Feature
    ratingsBreakdown! : RatingsBreakdown

}

export enum RatingsBreakdown{
none= "none",
little = "little",
enough ="enough" ,
aLot = "aLot"
}


