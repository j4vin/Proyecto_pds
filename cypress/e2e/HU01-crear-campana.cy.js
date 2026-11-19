import { submitAuth } from '../helpers/auth.js'

const password = 'Clave-campana-123'
const runId = Date.now()
let sequence = 0

function registerSession() {
  const id = ++sequence
  cy.session(`hu01-${runId}`, () => {
    cy.clearAllCookies()
    cy.visit('/#/register')
    cy.get('#name').type(`Creador HU01 ${id}`)
    cy.get('#email').type(`hu01-${runId}-${id}@example.test`)
    cy.get('#password').type(password, { log: false })
    cy.get('#confirmation').type(password, { log: false })
    submitAuth('register', /^Crear cuenta$/, [201])
    cy.location('hash').should('eq', '#/home')
  }, {
    validate() {
      cy.request({ url: '/api/auth/me', failOnStatusCode: false })
        .its('status')
        .should('eq', 200)
    },
  })
}

function openForm() {
  cy.visit('/#/campaigns/new')
  cy.location('hash').should('eq', '#/campaigns/new')
  cy.contains('h1', 'Crear una campaña').should('be.visible')
}

function validImage(fileName = 'campana.png') {
  return {
    contents: 'cypress/fixtures/campana.png',
    fileName,
    mimeType: 'image/png',
  }
}

function fillValidForm(title = 'Campaña E2E HU01') {
  cy.get('#campaign-title').type(title)
  cy.get('#campaign-description').type('Proyecto creado mediante un flujo completo de interfaz.')
  cy.get('#campaign-category').select('Tecnología')
  cy.get('#campaign-image').selectFile(validImage())
  cy.get('#campaign-goal').type('500000')
  cy.get('#campaign-deadline').type('2099-12-31')
}

describe('HU-01: crear campaña', () => {
  beforeEach(() => {
    registerSession()
    openForm()
  })

  it('HU01-CY-01: crea un borrador y muestra todos sus datos', () => {
    fillValidForm()
    cy.get('img[alt="Vista previa de la imagen de la campaña"]').should('be.visible')

    cy.contains('button', /^Guardar borrador$/).click()

    cy.location('hash').should('match', /^#[/]campaigns[/][1-9][0-9]*$/)
    cy.contains('h1', 'Campaña E2E HU01').should('be.visible')
    cy.get('.draft-badge').should('have.text', 'Borrador')
    cy.contains('Proyecto creado mediante un flujo completo de interfaz.').should('be.visible')
    cy.contains('Tecnología').should('be.visible')
  })

  it('HU01-CY-02: informa todos los campos obligatorios sin crear datos', () => {
    cy.contains('button', /^Guardar borrador$/).click()

    for (const field of ['title', 'description', 'category', 'image', 'goal', 'deadline']) {
      cy.get(`#error-${field}`).should('have.text', 'Campo requerido')
    }
    cy.location('hash').should('eq', '#/campaigns/new')
  })

  it('HU01-CY-03: rechaza una meta no positiva y una fecha vencida', () => {
    fillValidForm('Campaña con datos inválidos')
    cy.get('#campaign-goal').clear().type('0')
    cy.get('#campaign-deadline').clear().type('2020-01-01')

    cy.contains('button', /^Guardar borrador$/).click()

    cy.get('#error-goal').should('contain.text', 'número mayor a 0')
    cy.get('#error-deadline').should('have.text', 'La fecha límite debe ser posterior a hoy.')
    cy.location('hash').should('eq', '#/campaigns/new')
  })

  it('HU01-CY-04: rechaza un archivo que no es una imagen admitida', () => {
    fillValidForm('Campaña con archivo inválido')
    cy.get('#campaign-image').selectFile({
      contents: Cypress.Buffer.from('contenido de texto'),
      fileName: 'descripcion.txt',
      mimeType: 'text/plain',
    })

    cy.contains('button', /^Guardar borrador$/).click()

    cy.get('#error-image').should('have.text', 'Selecciona una imagen JPG, PNG o WebP.')
    cy.get('img[alt="Vista previa de la imagen de la campaña"]').should('not.exist')
    cy.location('hash').should('eq', '#/campaigns/new')
  })

  it('HU01-CY-05: cancelar vuelve a Mis campañas sin guardar un borrador', () => {
    cy.get('#campaign-title').type('Cambio descartado HU01')
    cy.contains('a', /^Cancelar$/).click()

    cy.location('hash').should('eq', '#/my-campaigns')
    cy.contains('h2', 'Mis campañas').should('be.visible')
    cy.contains('Cambio descartado HU01').should('not.exist')
  })
})
