import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _darkMode: boolean;
  private _darkModeSource = new Subject<boolean>();
  private _darkModeObservable = this._darkModeSource.asObservable();

  constructor() {
  }

  getDarkMode(): boolean {
    return this._darkMode;
  }

  getDarkModeObservable(): Observable<boolean> {
    return this._darkModeObservable;
  }

  setDarkMode(value: boolean) {
    this._darkMode = value;
    this._darkModeSource.next(value);
  }
}
