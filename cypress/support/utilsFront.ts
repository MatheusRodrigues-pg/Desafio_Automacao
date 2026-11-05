export function validarTexto(seletor: string, textoEsperado: string) {
  cy.get(seletor).should('contain', textoEsperado)
}

export function validarElementoVisivel(seletor: string) {
  cy.get(seletor).should('be.visible')
}

export function validarUrlExata(urlEsperada: string) {
  cy.url().should('eq', urlEsperada)
}

export function clicar(seletor: string) {
  cy.get(seletor).click()
}

export function clicarTexto(textoEsperado: string) {
  cy.contains(textoEsperado).click()
}

export function textoVisivel(textoEsperado: string) {
  cy.contains(textoEsperado).should('be.visible')
}

export function validarNaoExiste(seletor: string) {
  cy.get(seletor).should('not.exist')
}