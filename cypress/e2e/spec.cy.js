describe('Login e navegação', () => {
  it('Deve fazer login corretamente e navegar para Gerenciamento de Tarifas', () => {
    cy.visit('http://localhost:3001/');
    cy.get('input[type="email"]').type('pedro@gmail.com');
    cy.get('input[type="password"]').type('pedro010');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/');
    cy.contains('Gerenciamento de Tarifas').click();
    cy.url().should('include', '/rates');
    cy.contains('Gerenciamento de Tarifas').should('exist');
  });
});
