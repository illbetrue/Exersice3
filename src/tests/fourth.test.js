
describe('Fourth test', () => {

  beforeEach(async () => {
    await browser.maximizeWindow();
    await browser.url('https://www.wikipedia.org/');
  });

  it('Choose a table and save content', async () => {

    const searchLanguage = await $('select#searchLanguage');
    await searchLanguage.click();

    const language = 'Українська';
    await searchLanguage.selectByVisibleText(language);

    const searchField = await $('input#searchInput');
    await searchField.setValue('Чемпіонат світу з футболу 1998');

    const searchIcon = await $('button.pure-button-primary-progressive');
    await searchIcon.click();

    const tableSection = await $('//span[@id="Група_C"]');
    await tableSection.scrollIntoView({ block: 'center', inline: 'center' });

    const moreInfoLink = await $('=Чемпіонат світу з футболу 1998, група C');
    await moreInfoLink.click();

    const groupTable = await $('table.wikitable');
    await groupTable.scrollIntoView({ block: 'center', inline: 'center' });

    await browser.pause(1000);

    const tbody = await groupTable.$('tbody');
    const rows = await tbody.$$('tr');
    let tableOutput = '';
  
    
    const maxWidths = Array.from({ length: rows[0].$$('th,td').length }, () => 0);
    rows.forEach(async (row) => {
        const cells = await row.$$('th,td');
       cells.forEach(async (cell, index) => {
           const cellText = await cell.getText();
            maxWidths[index] = Math.max(maxWidths[index], cellText.length);
        });
    });
  
    
    tableOutput += '+';
    maxWidths.forEach((maxWidth) => {
        tableOutput += '-'.repeat(maxWidth + 2) + '+';
    });
    tableOutput += '\n';
  
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = await row.$$('th,td');
  
        tableOutput += '|';
  
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            const cellText = await cell.getText();
            const paddedCellText = cellText.padEnd(maxWidths[j]);
            tableOutput += ` ${paddedCellText} |`;
        }
        tableOutput += '\n';
  
        
        tableOutput += '+';
        maxWidths.forEach((maxWidth) => {
            tableOutput += '-'.repeat(maxWidth + 2) + '+';
        });
        tableOutput += '\n';
    }
  
    console.log(tableOutput);
  
    

    await browser.pause(1000);
    
  });

});
