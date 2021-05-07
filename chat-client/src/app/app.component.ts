import { UserService } from './services/user/user.service';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { ChatService } from './services/chat/chat.service';
import {TranslateService} from '@ngx-translate/core';
import { ThemeService } from './services/theme/theme.service';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'chat-client';
  public theme_control = new FormControl(false);
  public current_language = 'en';

  @HostBinding('class') className = '';

  constructor(
    private chatService: ChatService,
    public userService: UserService,
    private translate: TranslateService,
    private themeService: ThemeService,
    private overlay: OverlayContainer,
    ) {
      this.theme_control.valueChanges.subscribe((darkMode) => {
        this.themeService.setDarkMode(darkMode);
      });

      const darkClassName = 'darkMode';
      this.themeService.getDarkModeObservable().subscribe( darkMode => {
        this.className = darkMode ? darkClassName : '';
        if (darkMode) {
          this.overlay.getContainerElement().classList.add(darkClassName);
        } else {
          this.overlay.getContainerElement().classList.remove(darkClassName);
        }
      });

      this.theme_control.setValue(true);
      translate.setDefaultLang('en');
      translate.use('en');
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
      this.chatService.disconnect();
      return;
  }

  useLanguage() {
    this.translate.use(this.current_language);
  }
}
