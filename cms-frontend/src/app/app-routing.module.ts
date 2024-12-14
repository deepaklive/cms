import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LoginComponent } from './auth/login/login.component';
import { ContentListComponent } from './content/content-list/content-list.component';
import { EditContentComponent } from './content/edit-content/edit-content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { BlogsComponent } from './blogs/blogs.component';
import { ContentViewComponent } from './content/content-view/content-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'blogs', component: BlogsComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'content/create', component: EditContentComponent, canActivate: [AuthGuard] },
  { path: 'content/edit/:id', component: EditContentComponent, canActivate: [AuthGuard] },
  { path: 'content/:id', component: ContentViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
