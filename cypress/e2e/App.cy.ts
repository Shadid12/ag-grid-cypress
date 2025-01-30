describe('AG Grid Rendering', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should render the AG Grid component', () => {
    cy.get('.ag-root-wrapper').should('be.visible');

    // Verify column headers
    cy.get('.ag-header-cell-text').eq(0).should('have.text', 'Make');
    cy.get('.ag-header-cell-text').eq(1).should('have.text', 'Model');

    // Wait for grid to load and verify first row data
    cy.get('.ag-cell').should('have.length.greaterThan', 0);
    cy.get('.ag-cell').eq(0).should('have.text', 'Tesla');
  });
});
