import { Component } from '@angular/core';
import { MainLayout } from '../../layouts/main-layout/main-layout';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dashboard-page',
  imports: [MainLayout, CardModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {}
