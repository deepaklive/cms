import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/shared/content.service';
import { ContentModel } from 'src/app/shared/models';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.css']
})
export class ContentViewComponent implements OnInit {
  content:ContentModel;

  contentId: string|null;
  
  altImage='assets/images/00000069.JPG';
  
  constructor(
    private contentService: ContentService,
    private router: Router,
      private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.contentId = this.route.snapshot.paramMap.get('id');

    // If contentId exists, it's an edit, so fetch the existing content
    if (this.contentId) {
      this.loadContentData();
    }
  }


  // Method to load content data if editing
  loadContentData(): void {
    this.contentService.getContentbyId(this.contentId).subscribe(
      (data: any) => {
        this.content = <ContentModel>data;
      },
      (error) => {
        console.error('Error loading content', error);
      }
    );
  }
}
