import Cities from './cities.model';
import Users from './user.model';

export default class Park {
  id!: number;
  name!: string;
  desc!: string;
  address!: string;
  latitude?: number | null;
  longitude?: number | null;
  uploadDate!: Date;
  picturePath!: string;

  user!: Users;
  city!: Cities;
}
