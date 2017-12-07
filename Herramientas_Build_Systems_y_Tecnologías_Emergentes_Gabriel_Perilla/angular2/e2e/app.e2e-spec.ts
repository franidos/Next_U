import { AppangularPage } from './app.po';

describe('angular2 App', function() {
  let page: AppangularPage;

  beforeEach(() => {
    page = new AppangularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
