import {
  Component,
  computed,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import Park from '../../models/park.model';
import Users from '../../models/user.model';
import Cities from '../../models/cities.model';
import { ParksService } from '../../services/parks.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CitiesService } from '../../services/cities.service';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-add-park',
  imports: [FormsModule],
  templateUrl: './add-park.component.html',
  styleUrl: './add-park.component.css',
})
export class AddParkComponent {
  public selectedFile: File | null = null;

  public citiesList!: Cities[];
  public filteredCitiesList!: Cities[];

  public selectedCity: any = null;
  public searchText: string = '';
  public showDropdown: boolean = false;

  public isConflict: boolean = false;

  public newPark: Park = {
    name: '',
    desc: '',
    address: '',
    uploadDate: new Date(),
    id: 0,
    picturePath: '',
    user: new Users(),
    city: { id: 0, name: '' },
  };

  public newCity: Cities = {
    id: 0,
    name: '',
  };

  constructor(
    public _parksService: ParksService,
    private router: Router,
    private _citiesService: CitiesService,
  ) {}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  ngOnInit(): void {
    this._citiesService.getCitiesAfterSearch('').subscribe({
      next: (res) => {
        this.citiesList = res;
        this.filteredCitiesList = res;
        console.log(res);
        // this.filteredCities = res;
        // this.citiesList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filterCities() {
    const input = this.searchText?.trim() || '';
    if (!input) {
      this.filteredCitiesList = [...this.citiesList]; // או = this.citiesList אם לא חשוב לך העותק
      return;
    }
    this._citiesService.getCitiesAfterSearch(input).subscribe({
      next: (res) => {
        this.filteredCitiesList = res || [];
      },
      error: (err) => {
        console.error('Error filtering cities:', err);
        this.filteredCitiesList = [];
      },
    });
  }

  selectCity(city: any) {
    this.newPark.city.id = city.id;
    this.showDropdown = false;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  updateCityId() {
    const enteredName = (this.searchText || '').trim();

    if (!enteredName) {
      this.newPark.city.id = 0;
      return;
    }

    const foundCity = this.citiesList.find(
      (c) => c.name.trim().toLowerCase() === enteredName.toLowerCase(),
    );

    this.newPark.city.id = foundCity ? foundCity.id : 0;
  }

  addPark() {
    const parkDataToSend = {
      name: this.newPark.name,
      desc: this.newPark.desc,
      address: this.newPark.address,
      uploadDate: new Date().toISOString().split('T')[0],
      city: {
        id: this.newPark.city.id,
      },
    };

    const fd = new FormData();

    if (this.selectedFile) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
      const parkJson = JSON.stringify(parkDataToSend);
      const parkBlob = new Blob([parkJson], { type: 'application/json' });

      fd.append('Park', parkBlob);

      this._parksService.uploadPark(fd).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/parks-list']);
        },
        error: (err) => {
          if (err.status === 409) {
            this.isConflict = true;
            console.log('לפני הבדיקה:', this.isConflict);
          }
          console.error(err);
        },
      });
    }
  }

  addCity() {
    this._citiesService.addCity(this.newCity).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addNewPark() {
    console.log('לפני הבדיקה:', this.isConflict);
    this.isConflict = false;
    this.newPark = { name: '',
      desc: '',
      address: '',
      uploadDate: new Date(),
      id: 0,
      picturePath: '',
      user: new Users(),
      city: { id: 0, name: '' },};

      window.location.reload();
    }
    
 

  goToParkDetails() {
    console.log('לפני הבדיקה:', this.isConflict);
    this.isConflict = false;
    this._parksService
      .getParkByNameAndCity(this.newPark.name, this.newPark.city.id)
      .subscribe({
        next: (res) => {
          if (res && res.id) {
            this.router.navigate(['/park-details', res.id]);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
