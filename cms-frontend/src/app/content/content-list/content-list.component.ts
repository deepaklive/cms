import { Component, Input, OnInit } from '@angular/core';
import { ContentModel } from 'src/app/shared/models';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {
  @Input() contents: ContentModel[] | undefined ;

  constructor(){

  }

  ngOnInit(): void {
    
  }

}
