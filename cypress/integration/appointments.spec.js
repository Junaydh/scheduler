describe("Appointments", () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
    cy.contains("Monday");
  })

  it("should book an interview" , () => {
    cy.get('[alt=Add]')
      .first()
      .click();

    cy.get('[data-testid=student-name-input]')
      .type('Test Student');
    
    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.contains('button', 'Save')
      .click();

    cy.contains('.appointment__card--show', "Test Student");
    cy.contains(".appointment__card--show", 'Sylvia Palmer');
  })

  it("should edit an interview", () => {
    cy.get('[alt=Edit]')
      .click({force: true});

    cy.get('[data-testid=student-name-input]')
      .clear()
      .type('Edit Test');

    cy.get('[alt="Tori Malcolm"]')
      .click();

    cy.contains('button', 'Save')
      .click();
    
    cy.contains('.appointment__card--show', "Edit Test");
    cy.contains(".appointment__card--show", 'Tori Malcolm');
  })

  it("should cancel an interview", () => {
    cy.get('[alt=Delete]')
      .click({force: true});
    
    cy.contains('Confirm')
      .click();
    
    cy.contains("Deleting")
      .should('not.exist');
    cy.contains('.appointment__card--show', 'Archie Cohen')
      .should('not.exist');
  })
})