import { Component } from '@angular/core';
import { ApiService } from '../shared/api.services';
import { ContentModel } from '../shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
contents: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.get('content').subscribe((data: any) => {
      this.contents = <ContentModel[]>data;
    },(err)=>{
      console.log(err.error);
    });
  }
}
