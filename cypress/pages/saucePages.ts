/// <reference types="cypress" />

export const LoginPage = {
  url: "https://www.saucedemo.com/",

  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
  errorCloseButton: '[data-test="error-button"]',
  loginLogo: ".login_logo",

  login(username: string, password: string) {
    cy.get(this.usernameInput).clear().type(username)
    cy.get(this.passwordInput).clear().type(password)
    cy.get(this.loginButton).click()
  },

  visit() {
    cy.visit(this.url)
  },
}

export const InventoryPage = {
  url: "https://www.saucedemo.com/inventory.html",

  headerContainer: "#header_container",
  appLogo: ".app_logo",
  menuButton: "#react-burger-menu-btn",
  cartLink: ".shopping_cart_link",
  cartBadge: ".shopping_cart_badge",
  menuItemResetAppState: "#reset_sidebar_link",
  sortSelect: '[data-test="product-sort-container"]',
  inventoryList: ".inventory_list",
  inventoryItem: ".inventory_item",
  inventoryItemName: ".inventory_item_name",
  inventoryItemPrice: ".inventory_item_price",
  addToCartButton: '[data-test^="add-to-cart-"]',
  removeButton: '[data-test^="remove-"]',

  logout() {
    cy.get(this.menuButton).click()
    cy.get("#logout_sidebar_link").click()
  },
}

export const CartPage = {
  cartContainer: "#cart_contents_container",
  cartList: ".cart_list",
  cartItem: ".cart_item",
  cartItemName: ".inventory_item_name",
  cartItemDesc: ".inventory_item_desc",
  cartItemPrice: ".inventory_item_price",
  cartItemQuantity: ".cart_quantity",
  continueShoppingButton: '[data-test="continue-shopping"]',
  checkoutButton: '[data-test="checkout"]',

  checkout() {
    cy.get(this.checkoutButton).click()
  },
}

export const CheckoutStepOnePage = {
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  cancelButton: '[data-test="cancel"]',
  errorMessage: '[data-test="error"]',

  preencherInformacao(firstName: string, lastName: string, postalCode: string) {
    cy.get(this.firstNameInput).clear().type(firstName)
    cy.get(this.lastNameInput).clear().type(lastName)
    cy.get(this.postalCodeInput).clear().type(postalCode)
  },
}

export const CheckoutCompletePage = {
  completeHeader: ".complete-header",
  completeText: ".complete-text",
  backHomeButton: '[data-test="back-to-products"]',
}