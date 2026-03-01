import { Component, Input } from '@angular/core';
import ReportDTO from '../../models/dto/reportDTO.model';
import { Router } from '@angular/router';
import { ReportsService } from '../../services/reports.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reports-list',
  imports: [],
  templateUrl: './reports-list.component.html',
  styleUrl: './reports-list.component.css',
})
export class ReportsListComponent {
  @Input() parkId!: number;
  public reportsList: ReportDTO[] = [];

  constructor(
    private router: Router,
    private _reportsService: ReportsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {


    this._reportsService.getReportsByParkId(this.parkId).subscribe({
      next: (res) => {
        this.reportsList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


}
