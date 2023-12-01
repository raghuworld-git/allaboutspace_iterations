import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeSelection: BehaviorSubject<string> = new BehaviorSubject<string>('dark');

  setTheme(theme: string) {
    this.themeSelection.next(theme);
  }

  themeChanges(): Observable<string> {
    return this.themeSelection.asObservable();
  }
}
