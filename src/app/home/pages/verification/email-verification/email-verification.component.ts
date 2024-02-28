import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderAuthComponent } from '../../../shared/components/header-auth/header-auth.component';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { AuthService } from '../../../services';
import { catchError, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderAuthComponent, LottieComponent],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css',
})
export default class EmailVerificationComponent implements OnInit {
  options: AnimationOptions = {
    path: '../../../assets/lottie/verificationEmail.json',
  };

  animationCreated(animationItem: AnimationItem): void {}
  verified = signal<boolean>(false);

  public verifiComputed = computed(() => this.verified());
  private authService = inject(AuthService);

  public routeActivate = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.routeActivate.params
      .pipe(
        switchMap(({ code }) => {
          if (code) {
            return this.authService
              .getToken()
              .pipe(
                switchMap(({ token }) =>
                  this.authService.confirmUser(code, token)
                )
              );
          } else {
            return throwError(() => Error('Codigo Fallido'));
          }
        }),
        tap((data) => {
          this.verified.set(data.confirmed);
        }),
        catchError((error) => {
          console.error('Error:', error);
          return throwError(() => Error(error));
        })
      )
      .subscribe(() => {
        if (!this.verifiComputed()) {
          this.updateAnimation();
        }
      });
  }

  updateAnimation(): void {
    this.options = {
      ...this.options,
      path: '../../../assets/lottie/verificationFail.json',
    };
  }
}
