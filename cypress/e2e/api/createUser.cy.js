describe('Create User API Tests', () => {
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

    it('Check if the user is created successfully', () => {
        const user = createNonAdminUserBodyRequest()
        cy.request({
            method: 'POST',
            url: `${apiUrl}/usuarios`,
            body: user
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            expect(response.body).to.have.property('_id').and.to.be.equal(response.body._id)
        })
    })

    it('Check return message when trying to create a user with an existing email', () => {
        const user = createNonAdminUserBodyRequest()
        cy.request({
            method: 'POST',
            url: `${apiUrl}/usuarios`,
            body: user
        }).then((response) => {
            expect(response.status).to.eq(201)
            cy.request({
                method: 'POST',
                url: `${apiUrl}/usuarios`,
                failOnStatusCode: false,
                body: user
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.message)
                    .to.eq('Este email já está sendo usado')
            })
        })
    })

    it('Check body response when retrieving a user by ID', () => {
        const user = createNonAdminUserBodyRequest()
        cy.request({
            method: 'POST',
            url: `${apiUrl}/usuarios`,
            body: user
        }).then((response) => {
            expect(response.status).to.eq(201)
            const userId = response.body._id
            cy.request({
                method: 'GET',
                url: `${apiUrl}/usuarios/${userId}`
            }).then((response) => {
                expect(response.status).to.eq(200)

                expect(response.body).to.include({
                    _id: userId,
                    nome: user.nome,
                    email: user.email,
                    password: user.password,
                    administrador: user.administrador
                })
            })
        })
    })
})