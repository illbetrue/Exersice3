describe.skip('Second test', () => {

  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url('https://www.wikipedia.org/');
  });

  it.skip('Search by', async () => {

    const searchField = $('input#searchInput');
    await searchField.setValue('Мова');

    const searchIcon = $('button.pure-button-primary-progressive');
    await searchIcon.click();

    await expect(browser).toHaveUrl('https://en.wikipedia.org/wiki/Special:Search?go=Go&search=%D0%9C%D0%BE%D0%B2%D0%B0&ns0=1')
  })

});