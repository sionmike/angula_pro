import { HFPCPage } from './app.po';

describe('hf-pc App', function() {
  let page: HFPCPage;

  beforeEach(() => {
    page = new HFPCPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
