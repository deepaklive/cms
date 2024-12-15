import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated:boolean=false;

  constructor(
    public authService:AuthService,
    public router:Router
  ){}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authState) => {
      this.isAuthenticated = authState;
    });
  }
  
  onLogout(){
    this.authService.clearToken();
    this.authService.clearToken();
    this.router.navigate(['/']);
  }
}
