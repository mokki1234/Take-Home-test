class LoginPage {
    constructor(page) {
      this.page = page;
    }
  
    async navigateTo(url) {
      await this.page.goto(url);
    }
  
    async login(username, password) {
      await this.page.fill('#user-name', username);
      await this.page.fill('#password', password);
      await this.page.waitForSelector('#login-button');
      await this.page.click('#login-button');
    }
  }
  
  class ProductsPage {
    constructor(page) {
      this.page = page;
    }
  
    async addToCart(itemName) {
        await this.page.waitForSelector(`text="${itemName}"`);
        await this.page.click(`text="${itemName}"`);
    }
  }
  
  class CartPage {
    constructor(page) {
      this.page = page;
    }
  
    async getCartItems() {
      const cartItems = await this.page.$$eval('.cart_item', (items) =>
        items.map((item) => item.textContent.trim())
      );
      return cartItems;
    }
  
    async clickCheckout() {
      await this.page.click('#checkout');
    }
  }

  module.exports = { LoginPage, ProductsPage, CartPage};