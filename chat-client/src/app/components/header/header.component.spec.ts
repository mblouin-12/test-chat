import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { HeaderComponent } from './header.component';
import { Observable, of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const spyThemeService = jasmine.createSpyObj('ThemeService', ['setDarkMode']);

  class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
      return of({'Hello world chat': lang});
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HeaderComponent,
        { provide: ThemeService, useValue: spyThemeService },
        TranslateService
      ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: FakeLoader
          }
        })
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialized with dark mode', () => {
    expect(component.theme_control.value).toBeTruthy();
  });

  it('should set dark mode to false when toggle off dark mode', () => {
    component.theme_control.setValue(false);
    expect(spyThemeService.setDarkMode).toHaveBeenCalledWith(false);
  });

  it('should initialized with english language', () => {
    expect(component.current_language).toEqual('en');
  });

  // it('should initialized with english language', () => {
  //   fixture.nativeElement.querySelector('mat-select').set
  //   expect(component.current_language).toEqual('fr');
  //   expect(fixture.nativeElement.querySelector('span').textContent).toEqual('Hello world chat (fr)');
  // });
});
