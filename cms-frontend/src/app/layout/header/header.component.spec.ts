import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

import { of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceMock = {
      isAuthenticated$: of(true),
      logout: jasmine.createSpy('logout'),
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should show logout button when authenticated', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.logout-btn')).toBeTruthy();
  });

  it('should call logout method on click', () => {
    const logoutButton = fixture.nativeElement.querySelector('.logout-btn');
    logoutButton.click();
    expect(authService.clearToken).toHaveBeenCalled();
  });
});
