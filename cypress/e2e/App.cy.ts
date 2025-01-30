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

  it("should display the loading overlay and then show the data", () => {
    // 1. Check that the AG Grid loading overlay is visible
    cy.get(".ag-overlay-loading-center").should("be.visible");

    // 2. Wait for the first cell to contain "Tesla" (data is loaded)
    cy.get(".ag-cell").first().should("have.text", "Tesla");

    // 3. Ensure the loading overlay disappears after data loads
    cy.get(".ag-overlay-loading-center").should("not.exist");
  });

});

describe('AG Grid user interation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  // Test sorting
  it('sorts "Price" column ascending and then descending', () => {
    // 1. Locate the "Price" column header and click to sort in ascending order
    cy.contains(".ag-header-cell-text", "Price").click();

    // 2. Verify the first row in the grid is now 'Fiat' (cheapest car)
    cy.get('.ag-row[row-index="0"] [col-id="make"]').should("have.text", "Fiat");

    // 3. Click again to sort in descending order
    cy.contains(".ag-header-cell-text", "Price").click();

    // 4. Verify the first row in the grid is now 'Tesla' (most expensive car)
    cy.get('.ag-row[row-index="0"] [col-id="make"]').should("have.text", "Tesla");
  });

});
