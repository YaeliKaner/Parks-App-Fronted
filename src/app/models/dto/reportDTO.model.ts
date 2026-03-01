import Cities from '../cities.model';
import ParkDTO from './parkDTO.model';
import UsersDTO from './usersDTO.model';

export default class ReportDTO {
  id!: number;
  reportingDate!: Date;
  freeText!: string;
  satisfaction!: number;
  picturePath!: string;
  imageBase64!: string;

  userDTO!: UsersDTO;
  parkDTO!: ParkDTO;
}
