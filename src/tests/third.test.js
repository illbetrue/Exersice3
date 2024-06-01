describe('Third test', () => {

  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url('https://www.wikipedia.org/');
  });

  it('Choose a language in the search field and verify the title', async () => {
    
    const searchLanguage = await $('select#searchLanguage');
    await searchLanguage.click();

    
    const language = 'Українська';
    await searchLanguage.selectByVisibleText(language);

    
    const searchField = await $('input#searchInput');
    await searchField.setValue('Мова');

    
    const searchIcon = await $('button.pure-button-primary-progressive');
    await searchIcon.click();

    const titleText = $('span.mw-page-title-main');
    await expect(titleText).toHaveText('Мова');
    
  });


});