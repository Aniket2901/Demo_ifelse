import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from '../app/dashboard/dashboard';
import { TeamTableComponent } from '../app/team-table/team-table';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Dashboard,TeamTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Myproject';
}
