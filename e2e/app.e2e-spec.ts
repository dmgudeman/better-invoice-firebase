import { BetterInvoiceFirebasePage } from './app.po';

describe('better-invoice-firebase App', () => {
  let page: BetterInvoiceFirebasePage;

  beforeEach(() => {
    page = new BetterInvoiceFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
