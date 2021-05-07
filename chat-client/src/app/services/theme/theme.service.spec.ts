/* tslint:disable:no-unused-variable */

import { ThemeService } from './theme.service';

describe('Service: Theme', () => {
  let service: ThemeService;
  beforeEach(() => {
    service  = new ThemeService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getDarkMode should return true', () => {
    service.setDarkMode(true);
    expect(service.getDarkMode()).toBe(true);
  });

  it('#getDarkMode should return false', () => {
    service.setDarkMode(false);
    expect(service.getDarkMode()).toBe(false);
  });

  it('#getDarkModeObservable should return value from observable',
    (done: DoneFn) => {
      service.setDarkMode(true);
      service.getDarkModeObservable().subscribe(value => {
        expect(value).toBe(true);
        done();
      });
      expect(service.getDarkModeObservable).toHaveBeenCalled();
  });
});
