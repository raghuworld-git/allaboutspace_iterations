import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../utilities/service/theme.service';

@Component({
  selector: 'app-themes-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './themes-toggle.component.html',
  styleUrl: './themes-toggle.component.css'
})
export class ThemesToggleComponent {

  theme: string = 'light';

  constructor(private themeService: ThemeService) { }

  toggleTheme() {
    if (this.theme==='light')  {
      this.theme = 'dark';
    } else  {
      this.theme = 'light';
    }
    this.themeService.setTheme(this.theme)
  }
}
