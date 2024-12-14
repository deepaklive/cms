import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/shared/content.service';

@Component({
  selector: 'app-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.css']
})
export class ContentPreviewComponent implements OnInit {
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
  
  viewContent(id: number) {
    this.router.navigate(['/content', id]);  // Navigate to edit page (assuming you have a route for editing content)
  }
  
  deleteContent(id: number) {
    this.contentService.deleteContent(id).subscribe(() => {
      this.snackBar.open('Content deleted successfully', '', { duration: 2000 });
      // TODO - Redirect 
      // this.loadContent();  // Reload content after deletion
    });
  }
  
  editContent(id: number) {
    this.router.navigate(['/content/edit', id]);  // Navigate to edit page (assuming you have a route for editing content)
  }
  }
  