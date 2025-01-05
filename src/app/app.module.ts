import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllIsvListComponent } from './components/all-isv-list/all-isv-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BestIsvListComponent } from './components/best-isv-list/best-isv-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { IsvListService } from './components/services/isv-list.service';
import { MatSelectModule } from '@angular/material/select';
import { IsvDetailPageComponent } from './components/isv-detail-page/isv-detail-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  // Define routes here
  { path: 'best-isv', component: BestIsvListComponent },
  { path: 'isv-list', component: AllIsvListComponent },
  { path: 'isv-detail/:id', component: IsvDetailPageComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AllIsvListComponent,
    BestIsvListComponent,
    IsvDetailPageComponent,
    DashboardComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    MatChipsModule,
    MatCardModule,
    MatListModule,
    MatProgressBarModule,
    FormsModule,
  ],
  providers: [IsvListService],
  bootstrap: [AppComponent],
})
export class AppModule {}
