import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ChatService } from './services/chat/chat.service';
import { ThemeService } from './services/theme/theme.service';
import { UserService } from './services/user/user.service';

class FakeChatService {
  disconnect() {}
}

class FakeUserService {
  isConnected() {
    return true;
  }
}


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      providers: [
        { provide: ChatService, useClass: FakeChatService },
        { provide: UserService, useClass: FakeUserService },
        ThemeService,
        OverlayContainer
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Chat Lucca'`, () => {
    expect(component.title).toBe('Chat Lucca');
  });

  it(`should have dark theme when set`, () => {
    component.themeService.setDarkMode(true);
    expect(component.overlay.getContainerElement().classList).toContain('darkMode');
  });

  it(`should have light theme when set`, () => {
    component.themeService.setDarkMode(false);
    expect(component.overlay.getContainerElement().classList).not.toContain('darkMode');
  });

});
