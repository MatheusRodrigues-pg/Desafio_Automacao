import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutStepOnePage,
  CheckoutCompletePage,
} from "../../pages/saucePages"
import * as utils from "../../support/utilsFront"

let userSucess = "standard_user"
let userInvalid = "user"
let userBlocked = "standard_user"
let userVisualError = "visual_user"
let passwordSucess = "secret_sauce"

describe("SauceDemo", () => {
  before(() => {})

  it("UI01 - Login usuario invalido", () => {
    LoginPage.visit()
    LoginPage.login(userInvalid, passwordSucess)
    utils.validarTexto(
      LoginPage.errorMessage,
      "Epic sadface: Username and password do not match any user in this service",
    )
    utils.validarUrlExata(LoginPage.url)
  })
  it("UI02 - Cenario de erro Login com sucesso esperado", () => {
    LoginPage.visit()
    LoginPage.login(userInvalid, passwordSucess)
    utils.validarUrlExata(InventoryPage.url)
  })
  it("UI03 - Login usuario valido", () => {
    LoginPage.visit()
    LoginPage.login(userSucess, passwordSucess)
    utils.validarUrlExata(InventoryPage.url)
  })

  it("UI04 - Login campos vazios", () => {
    LoginPage.visit()
    utils.clicar(LoginPage.loginButton)
    utils.validarTexto(
      LoginPage.errorMessage,
      "Epic sadface: Username is required",
    )
    utils.validarUrlExata(LoginPage.url)
  })

  it("UI05 - Login usuario bloqueado", () => {
    LoginPage.visit()
    LoginPage.login(userBlocked, passwordSucess)
    utils.validarTexto(
      LoginPage.errorMessage,
      "Epic sadface: Sorry, this user has been locked out.",
    )
    utils.validarUrlExata(LoginPage.url)
  })

  it("UI06 - Adicionar e Remover Itens do carrinho", () => {
    LoginPage.visit()
    LoginPage.login(userSucess, passwordSucess)
    utils.validarUrlExata(InventoryPage.url)
    utils.clicar('[data-test="add-to-cart-sauce-labs-bike-light"]')
    utils.clicar('[data-test="add-to-cart-sauce-labs-onesie"]')
    utils.validarTexto(InventoryPage.cartBadge, "2")
    utils.clicar(InventoryPage.cartLink)
    utils.textoVisivel("Sauce Labs Bike Light")
    utils.textoVisivel("Sauce Labs Onesie")
    utils.clicar(InventoryPage.menuButton)
    utils.clicar(InventoryPage.menuItemResetAppState)
    utils.validarNaoExiste(InventoryPage.cartBadge)
  })

  it("UI07 - Pedido comfirmado", () => {
    LoginPage.visit()
    LoginPage.login(userSucess, passwordSucess)
    utils.validarUrlExata(InventoryPage.url)
    utils.clicar('[data-test="add-to-cart-sauce-labs-bike-light"]')
    utils.clicar('[data-test="add-to-cart-sauce-labs-onesie"]')
    utils.validarTexto(InventoryPage.cartBadge, "2")
    utils.clicar(InventoryPage.cartLink)
    utils.textoVisivel("Sauce Labs Bike Light")
    utils.textoVisivel("Sauce Labs Onesie")
    CartPage.checkout()
    CheckoutStepOnePage.preencherInformacao("Teste", "Silva", "12345678")
    utils.clicarTexto("Continue")
    cy.get('[data-test="inventory-item-price"]')
      .eq(0)
      .should("have.text", "$9.99")
    cy.get('[data-test="inventory-item-price"]')
      .eq(1)
      .should("have.text", "$7.99")

    cy.get('[data-test="subtotal-label"]').should(
      "have.text",
      "Item total: $17.98",
    )
    cy.get('[data-test="tax-label"]').should("have.text", "Tax: $1.44")
    cy.get('[data-test="total-label"]').should("have.text", "Total: $19.42")
    utils.clicarTexto("Finish")

    utils.validarTexto(
      CheckoutCompletePage.completeHeader,
      "Thank you for your order!",
    )
  })

  it("UI08 - Login usuario com erros visuais", () => {
    LoginPage.visit()
    LoginPage.login(userVisualError, passwordSucess)
    utils.validarUrlExata(InventoryPage.url)
    cy.screenshot()
    utils.clicar('[data-test="add-to-cart-sauce-labs-backpack"]')
    utils.clicar('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
    utils.clicar(InventoryPage.cartLink)
    cy.screenshot()

    InventoryPage.logout()
    cy.screenshot()
  })
})
