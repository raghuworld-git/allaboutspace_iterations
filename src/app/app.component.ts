import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../common/components/layout/layout.component';
import { ThemesToggleComponent } from '../common/components/themes-toggle/themes-toggle.component';
import { ThemeService } from '../utilities/service/theme.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    LayoutComponent,
    ThemesToggleComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2
  ) {}

  private themeServiceSubscription$!: Subscription;

  ngOnInit(): void {
    
    this.themeServiceSubscription$ = this.themeService
      .themeChanges()
      .subscribe((theme) => {
        if (theme.oldValue) {
          this.renderer.setAttribute(
            document.body,
            'data-bs-theme',
            theme.oldValue
          );
        }
        this.renderer.setAttribute(
          document.body,
          'data-bs-theme',
          theme.newValue
        );
      });
  }

  ngOnDestroy(): void {
    this.themeServiceSubscription$?.unsubscribe();
  }
}
