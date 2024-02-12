import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderAuthComponent } from '../../../shared/components/header-auth/header-auth.component';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

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

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  public verified = signal<boolean>(false);

  public routeActivate = inject(ActivatedRoute);

  ngOnInit(): void {
    this.routeActivate.params.subscribe((code) => {
      // TODO: Hacer llamado a el back con codigo de verificacion
      if (code) this.verified.set(true);
      if (!this.verified()) {
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
