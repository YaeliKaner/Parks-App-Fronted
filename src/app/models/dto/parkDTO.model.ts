// import Cities from "../cities.model"
// import UsersDTO from "./usersDTO.model"


// export default class ParkDTO {

//         id! : number
//         name! : string
//         address! : string
//         uploadDate! : Date
//         picturePath! : string
    
//         userDTO! : UsersDTO
//         city! : Cities
//         imageBase64! : string

// }
// export default interface ParkDTO {
//   id: number;
//   name: string;
//   desc: string;
//   address: string;
//   // אם יש עוד שדות – תשאירי אותם
// }
export default interface ParkDTO {
  id: number;
  name: string;
  address: string;
  uploadDate: string;
  city: any;
  userDTO: any;
  picturePath : string;
  imageBase64: string;

  latitude: number | null;   // 👈 להוסיף!
  longitude: number | null;  // 👈 להוסיף!
}
