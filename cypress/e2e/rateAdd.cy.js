describe('Login e navegação', () => {
  before(() => {
    // Acesse a página de login
    cy.visit('https://parkzones-front-fc2e998adaa1.herokuapp.com/');
    
    // Preencha o formulário de login
    cy.get('input[type="email"]').type('pedro@gmail.com');
    cy.get('input[type="password"]').type('pedro@010');
    cy.get('button[type="submit"]').click();
    
    // Aguarde até que a URL seja alterada após o login bem-sucedido
    cy.url().should('not.include', '/login');  // A URL não deve conter '/login' após o login
    
    // Verifique se o login foi bem-sucedido, por exemplo, verificando se o botão de logout está visível
    cy.contains('Logout').should('be.visible');  // Ajuste o texto conforme o botão de logout real

    // Adicione um tempo de espera para garantir que o cookie ou localStorage tenha sido configurado
    cy.wait(1000); // Aguarde 1 segundo para garantir que os cookies ou o localStorage sejam configurados

    // Verifique a persistência do token de autenticação no localStorage
    cy.window().its('localStorage.token').should('exist');
    cy.window().its('localStorage.token').should('not.be.empty');
  });

  it('Deve navegar para Gerenciamento de Tarifas após login', () => {
    cy.contains('Gerenciamento de Tarifas').click();  // Clique no botão de navegação
    cy.url().should('include', '/rates');  // Verifique se a URL inclui '/rates'
    cy.contains('Gerenciamento de Tarifas').should('exist');  // Verifique se a página foi carregada corretamente
  });
});

describe('RateForm - Adicionar uma nova taxa', () => {
  beforeEach(() => {
    // Ajuste o caminho da página de taxas
    cy.visit('/rates');  // Verifique se /rates é o caminho correto para sua página de taxas
  });

  it('Deve carregar a página de taxas corretamente', () => {
    // Verifique se a página está carregando corretamente
    cy.contains('Tarifa por hora').should('be.visible');
    cy.contains('Tipo do automóvel').should('be.visible');
  });

  it('Deve adicionar uma nova taxa com sucesso', () => {
    // Simule o preenchimento do formulário de taxas
    const hourlyRate = '10.00'; // Ajuste com um valor válido
    const vehicleType = 'Carro'; // Ajuste com o tipo de veículo correto

    cy.get('input[name="hourly_rate"]').type(hourlyRate);
    cy.get('input[name="vehicle_type"]').type(vehicleType);

    // Simule o envio do formulário
    cy.get('button[type="submit"]').click();

    // Verifique se a mensagem de sucesso ou a taxa foi adicionada
    cy.contains('Tarifa adicionada com sucesso').should('be.visible');  // Ajuste conforme a resposta esperada
  });

  it('Deve exibir erro ao tentar adicionar uma taxa com tipo de veículo duplicado', () => {
    // Teste para tentar adicionar uma taxa com um tipo de veículo já existente
    const hourlyRate = '15.00';  // Ajuste com um valor válido
    const vehicleType = 'Carro'; // Ajuste com um tipo de veículo duplicado

    cy.get('input[name="hourly_rate"]').type(hourlyRate);
    cy.get('input[name="vehicle_type"]').type(vehicleType);

    cy.get('button[type="submit"]').click();

    // Verifique se o erro de tipo de veículo duplicado é exibido
    cy.contains('Tipo de veículo já cadastrado').should('be.visible');
  });
});
