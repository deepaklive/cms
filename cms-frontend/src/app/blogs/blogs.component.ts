import { Component } from '@angular/core';
import { ApiService } from '../shared/api.services';
import { ContentModel } from '../shared/models';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {
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
