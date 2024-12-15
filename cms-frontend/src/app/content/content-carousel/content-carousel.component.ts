import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.services';
import { ContentModel } from 'src/app/shared/models';

@Component({
  selector: 'app-content-carousel',
  templateUrl: './content-carousel.component.html',
  styleUrls: ['./content-carousel.component.css']
})
export class ContentCarouselComponent implements OnInit {

  cardGroups: any[] = [];
  contents: any[] = [];
  
    constructor(
      private apiService: ApiService
    ) {  }
  
    ngOnInit() {
      this.apiService.get('content').subscribe((data: any) => {
        this.contents = <ContentModel[]>data;
        this.cardGroups = this.chunk(this.contents, 3);
      },(err)=>{
        console.log(err.error);
      });
    }
  

  chunk(array: any[], size: number): any[] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}