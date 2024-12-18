import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from './material.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ContentCarouselComponent } from './content/content-carousel/content-carousel.component';
import { ContentListComponent } from './content/content-list/content-list.component';
import { ContentPreviewComponent } from './content/content-preview/content-preview.component';
import { ContentViewComponent } from './content/content-view/content-view.component';
import { EditContentComponent } from './content/edit-content/edit-content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BlogsComponent } from './blogs/blogs.component';
import { TimeagoModule } from 'ngx-timeago';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    
    ContentCarouselComponent,
    ContentListComponent,
    ContentPreviewComponent,
    ContentViewComponent,
    EditContentComponent,
    DashboardComponent,
    BlogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CKEditorModule,
    TimeagoModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
