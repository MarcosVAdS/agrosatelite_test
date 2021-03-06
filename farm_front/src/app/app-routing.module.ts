import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FarmComponent } from './farm/farm.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';
import { FarmRegisterComponent } from './farm-register/farm-register.component';
import { OwnerRegisterComponent } from './owner-register/owner-register.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'farm', component: FarmComponent },
  { path: 'farm/details/:id', component: DetailsComponent },
  { path: 'farm/register', component: FarmRegisterComponent },
  { path: 'owner/register', component: OwnerRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
