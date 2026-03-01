import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from '../../services/reports.service';
import Park from '../../models/park.model';
import { FormsModule } from '@angular/forms';
import ReportDTO from '../../models/dto/reportDTO.model';
import { ParksService } from '../../services/parks.service';

@Component({
  selector: 'app-add-report',
  imports: [FormsModule],
  templateUrl: './add-report.component.html',
  styleUrl: './add-report.component.css',
})
export class AddReportComponent implements OnInit {
  @Input({ required: true }) parkId!: number;
  @Output() reportAdded = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  form = {
    freeText: '',
    satisfaction: 0,
    picture: null as File | null,
    picturePreview: '',
  };

  public selectedFile: File | null = null;
  isSubmitting = false;
  public reportsList: ReportDTO[] = [];

  constructor(
    private route: ActivatedRoute,
    private _reportsService: ReportsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.parkId = params['id'];
    });
  }
  setRating(value: number) {
    this.form.satisfaction = this.form.satisfaction === value ? 0 : value;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    this.form.picture = file;                 // ← חשוב מאוד!

    // תצוגה מקדימה (אופציונלי אבל מומלץ)
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.form.picturePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
    // if (event.target.files.length > 0) {
    //   this.selectedFile = event.target.files[0];
    // }
  }

  // הסרת תמונה
  removePicture() {
    this.form.picture = null;
    this.form.picturePreview = '';
    const input = document.getElementById('pictureInput') as HTMLInputElement;
    if (input) input.value = '';
  }

  onSubmit() {
    if (this.form.satisfaction >= 0) {

    this.isSubmitting = true;

    const reportDataToSend = {
      freeText: this.form.freeText,
      satisfaction: this.form.satisfaction,
    };

    const fd = new FormData();
    fd.append(
      'Report', new Blob([JSON.stringify({
            freeText: this.form.freeText,
            satisfaction: this.form.satisfaction,
          }),
        ],
        { type: 'application/json' }
      )
    );

    if (this.form.picture) {
      fd.append('image', this.form.picture, this.form.picture.name);
    } else {
      fd.append('image', new Blob([]), 'empty.jpg');
    }

    this._reportsService.addReport(this.parkId, fd).subscribe({
      next: (res) => {
        console.log(res);
        this.isSubmitting = false;
        this.reportAdded.emit();

        window.location.reload();
      },
      error: (err) => {
        this.isSubmitting = false;
        alert(`שגיאה: ${err.status}`);
      },
    });
  }
}
}
