import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public current_language = 'en';
  public theme_control = new FormControl(false);

  constructor(
    public themeService: ThemeService,
    public translate: TranslateService,
    ) {

    translate.setDefaultLang('en');
    translate.use('en');

    this.theme_control.valueChanges.subscribe((darkMode) => {
      this.themeService.setDarkMode(darkMode);
    });
    this.theme_control.setValue(true);
  }

  ngOnInit(): void {
  }

  useLanguage() {
    this.translate.use(this.current_language);
  }
}
