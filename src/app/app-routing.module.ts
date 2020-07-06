import { UserCreateUpdateComponent } from './components/user-create-update/user-create-update.component';
import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '',   redirectTo: '/users', pathMatch: 'full' },
  { path: 'users' , component: UserComponent },
  { path: 'create' , component: UserCreateUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
