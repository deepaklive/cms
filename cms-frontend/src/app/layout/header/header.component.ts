import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges {

  isAuthenticated:boolean=false;

  constructor(
    public authService:AuthService,
    public router:Router
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
  
  onLogout(){
    this.authService.clearToken();
    this.authService.clearToken();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.router.navigate(['/']);
  }
}
