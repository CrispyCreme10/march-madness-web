import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppBreakpointService {
  private breakpointObserver = inject(BreakpointObserver);
  private _isSmallScreen = signal<boolean>(false);

  isSmallScreen = this._isSmallScreen.asReadonly();

  constructor() {
    this.registerBreakpointObserver();
  }

  private setSmallScreenStyles() {
    // If the screen size is small or x-small, set the table layout to auto
    document.documentElement.style.setProperty('--table-layout', 'fixed');
  }

  private setLargeScreenStyles() {
    // For larger screens, set the table layout to fixed
    document.documentElement.style.setProperty('--table-layout', 'auto');
  }

  private registerBreakpointObserver() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((result) => {
      console.log('BreakpointObserver result:', result);
      if (result.matches) {
        this.setSmallScreenStyles();
      } else {
        this.setLargeScreenStyles();
      }
    });
  }
}
