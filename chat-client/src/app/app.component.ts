import { UserService } from 'src/app/services/user/user.service';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Chat Lucca';
  private darkClassName = 'darkMode';

  @HostBinding('class') className = '';

  constructor(
    private chatService: ChatService,
    public userService: UserService,
    public themeService: ThemeService,
    public overlay: OverlayContainer,
    ) {
      this.themeService.getDarkModeObservable().subscribe( darkMode => {
        this.className = darkMode ? this.darkClassName : '';
        if (darkMode) {
          this.overlay.getContainerElement().classList.add(this.darkClassName);
        } else {
          this.overlay.getContainerElement().classList.remove(this.darkClassName);
        }
      });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
      this.chatService.disconnect();
      return;
  }


}
