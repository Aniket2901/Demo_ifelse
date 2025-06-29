import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration,ChartType } from 'chart.js';
// import { TeamTable } from '../team-table/team-table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,NgChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
 public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true, max: 100 }
    }
  };

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Low Risk',
        data: [20, 30, 15, 18, 22, 25, 24, 26, 27, 28, 30, 20],
        backgroundColor: '#5b21b6'
      },
      {
        label: 'Medium Risk',
        data: [15, 25, 10, 12, 18, 20, 21, 23, 22, 24, 25, 18],
        backgroundColor: '#7c3aed'
      },
      {
        label: 'High Risk',
        data: [20, 25, 15, 18, 20, 28, 26, 25, 27, 30, 35, 22],
        backgroundColor: '#ddd6fe'
      }
    ]
  };
}
