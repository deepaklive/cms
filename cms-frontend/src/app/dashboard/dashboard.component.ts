import { Component } from '@angular/core';
import { ApiService } from '../shared/api.services';
import { ContentModel } from '../shared/models';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
contents: any[] = [];
username:string | null;
  constructor(
    private apiService: ApiService,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUserName()
    this.apiService.get('content?author='+ this.username).subscribe((data: any) => {
      this.contents = <ContentModel[]>data;
    },(err)=>{
      console.log(err.error);
    });
  }
}
