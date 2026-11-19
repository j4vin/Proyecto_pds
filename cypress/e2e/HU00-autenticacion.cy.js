import { submitAuth } from '../helpers/auth.js'

const password = 'Clave-e2e-123'
const runId = Date.now()

function account(label) {
  return {
    name: `Persona ${label} E2E`,
    email: `e2e-${label}-${runId}@example.test`,
    password,
  }
}

function resetApp(path = '/') {
  cy.clearAllCookies()
  cy.visit(path)
}

function openRegistration() {
  resetApp('/')
  cy.contains('a', /^Registrarse$/).click()
  cy.location('hash').should('eq', '#/register')
}

function fillRegistration(user) {
  cy.get('#name').type(user.name)
  cy.get('#email').type(user.email)
  cy.get('#password').type(user.password, { log: false })
  cy.get('#confirmation').type(user.password, { log: false })
}

function register(user) {
  openRegistration()
  fillRegistration(user)
  submitAuth('register', /^Crear cuenta$/, [201])
  cy.location('hash').should('eq', '#/home')
}

function login(email, value = password, statuses = [200]) {
  cy.get('#email').clear().type(email)
  cy.get('#password').clear().type(value, { log: false })
  return submitAuth('login', /^Iniciar sesión$/, statuses)
}

describe('HU-00: autenticación y protección de acceso', () => {
  it('HU00-CY-01: registra una cuenta y abre el inicio privado', () => {
    const user = account('registro')

    register(user)

    cy.contains('h1', 'Descubre nuevos proyectos.').should('be.visible')
    cy.contains('a', /^Mi perfil$/).should('be.visible')
    cy.contains('button', /^Cerrar sesión$/).should('be.enabled')
  })

  it('HU00-CY-02: valida campos obligatorios y datos inválidos antes de enviar', () => {
    openRegistration()

    cy.contains('button', /^Crear cuenta$/).click()
    cy.get('#auth-error-name').should('have.text', 'Campo obligatorio')
    cy.get('#auth-error-email').should('have.text', 'Campo obligatorio')
    cy.get('#auth-error-password').should('have.text', 'Campo obligatorio')
    cy.get('#auth-error-confirmation').should('have.text', 'Campo obligatorio')

    cy.get('#name').type('A')
    cy.get('#email').type('correo-invalido')
    cy.get('#password').type('corta', { log: false })
    cy.get('#confirmation').type('distinta', { log: false })
    cy.contains('button', /^Crear cuenta$/).click()

    cy.get('#auth-error-name').should('contain.text', 'entre 2 y 80')
    cy.get('#auth-error-email').should('have.text', 'Ingresa un correo válido.')
    cy.get('#auth-error-password').should('contain.text', 'entre 8 y 128')
    cy.get('#auth-error-confirmation').should('have.text', 'Las contraseñas no coinciden.')
    cy.location('hash').should('eq', '#/register')
  })

  it('HU00-CY-03: cierra sesión y permite volver a ingresar', () => {
    const user = account('reingreso')

    register(user)
    cy.contains('button', /^Cerrar sesión$/).click()

    cy.location('hash').should('eq', '#/')
    cy.contains('a', /^Iniciar sesión$/).click()
    cy.location('hash').should('eq', '#/login')

    login(user.email)
    cy.location('hash').should('eq', '#/home')
    cy.contains('h1', 'Descubre nuevos proyectos.').should('be.visible')
  })

  it('HU00-CY-04: rechaza credenciales incorrectas y permite reintentar', () => {
    const user = account('reintento')

    register(user)
    cy.contains('button', /^Cerrar sesión$/).click()
    cy.contains('a', /^Iniciar sesión$/).click()

    login(user.email, 'Clave-equivocada-123', [401])
    cy.contains('[role="alert"]', 'Correo o contraseña incorrectos').should('be.visible')
    cy.location('hash').should('eq', '#/login')

    login(user.email)
    cy.location('hash').should('eq', '#/home')
  })

  it('HU00-CY-05: redirige una ruta privada al inicio de sesión', () => {
    resetApp('/#/profile')

    cy.location('hash').should('eq', '#/login')
    cy.contains('h2', 'Iniciar sesión').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#password').should('be.visible')
  })
})
