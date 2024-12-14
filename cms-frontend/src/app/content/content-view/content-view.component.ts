import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/shared/content.service';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.css']
})
export class ContentViewComponent implements OnInit {
  @Input() content:any;

  altImage='assets/images/00000069.JPG';
  
  constructor(
    private contentService: ContentService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    if (this.content){
      this.content.body = this.sanitizer.bypassSecurityTrustHtml(this.content.body);
      if (this.content.image){
        //do nothing
      }else{
        this.content.image =this.altImage;
      }
      
    }
  
  }
}
