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
