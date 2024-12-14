import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ContentService } from 'src/app/shared/content.service';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {

  altImage='assets/images/00000069.JPG';

  public Editor = ClassicEditor;
  public config = {
    licenseKey: 'GPL'
    // plugins: [ Essentials, Paragraph, Bold, Italic ],
    // toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter' ]
}

  createContentForm: FormGroup;

  imageFile: File | null = null;
  contentId: string | null;
  contentData: any = null;
  
  submitted = false; 


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private contentService: ContentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.createContentForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      image: ['', Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)],
    });

    // Get contentId from route parameters (if any)
    this.contentId = this.route.snapshot.paramMap.get('id');

    // If contentId exists, it's an edit, so fetch the existing content
    if (this.contentId) {
      this.loadContentData();
    }
  }

  // Method to handle file input change
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  // Method to load content data if editing
  loadContentData(): void {
    this.contentService.getContentbyId(this.contentId).subscribe(
      (data: any) => {
        this.contentData = data;
        // Fill the form with the content data
        this.createContentForm.patchValue({
          title: this.contentData.title,
          body: this.contentData.body,
        });
      },
      (error) => {
        console.error('Error loading content', error);
      }
    );
  }

  onPreview(){

  }

  get f() {
    return this.createContentForm.controls;
  }

  // Method to submit the form
  onSubmit(): void {
    if (this.createContentForm.valid) {
      const formData = new FormData();
      formData.append('title', this.createContentForm.value.title);
      formData.append('body', this.createContentForm.value.body);
      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      this.submitted = true;

      // Send data to the backend
      if (this.contentId) {
        // Edit existing content
        this.contentService.editContent(this.contentId, formData).subscribe(
          (response) => {
            console.log('Content updated successfully', response);
            this.router.navigate(['/blogs']); // Redirect to the content listing page after edit
          },
          (error) => {
            console.error('Error updating content', error);
          }
        );
      } else {
        // Create new content
        this.contentService.createContent(formData).subscribe(
          (response) => {
            console.log('Content created successfully', response);
            this.router.navigate(['/blogs']); // Redirect to the content listing page after create
          },
          (error) => {
            console.error('Error creating content', error);
          }
        );
      }
    } else {
      console.log('Form is invalid or no image selected');
    }
  }

  
}
