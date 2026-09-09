describe('Create User UI Tests', () => {
    const apiUrl = Cypress.expose().apiUrl
    const createNonAdminUserBodyRequest = () => {
        const dateNow = Date.now()
        return {
            nome: `Mikael-${dateNow}`,
            email: `mikael.${dateNow}@qa.com.br`,
            password: 'teste123',
            administrador: 'false'
        }
    }

    it('Check if an user can access the create user page', () => {
        cy.visit('/login')
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('h2').should('contain', 'Cadastro')
    })

    it('Check if the user is created successfully', () => {
        cy.visit('/cadastrarusuarios')
        cy.get('[id="nome"]').type(`Mikael-${Date.now()}`)
        cy.get('[id="email"]').type(`mikael.${Date.now()}@qa.com.br`)
        cy.get('[id="password"]').type('teste123')
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.alert').should('exist')
        cy.get('.alert').should('contain', 'Cadastro realizado com sucesso')
    })

    it('Check return message when trying to create a user with an existing email', () => {
        const email = `mikael.${Date.now()}@qa.com.br`
        const user = createNonAdminUserBodyRequest()
        cy.request({
            method: 'POST',
            url: `${apiUrl}/usuarios`,
            body: user
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            expect(response.body).to.have.property('_id').and.to.be.equal(response.body._id)
        })
        cy.visit('/cadastrarusuarios')
        cy.intercept('POST', '/usuarios').as('createUser')
        cy.get('[id="nome"]').type(`Mikael-${Date.now()}`)
        cy.get('[id="email"]').type(email)
        cy.get('[id="password"]').type('teste123')
        cy.get('[data-testid="cadastrar"]').click()
        cy.wait('@createUser').then((interception) => {
            expect(interception.response.statusCode).to.eq(400)
            expect(interception.response.body.message).to.eq('Este email já está sendo usado')
        }) 
        cy.get('[role="alert"]').should('exist')
        cy.get('[role="alert"]').should('contain', 'Este email já está sendo usado')     
    })


})