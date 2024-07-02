class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/v1/');
  }

  async login(username, password) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }
}
class InventoryPage {
  constructor(page) {
    this.page = page;
    this.itemAddToCartButtons = '.inventory_item button';
    this.cartIcon = '.shopping_cart_link';
  }

  async addItemsToCart(itemCount) {
    const buttons = await this.page.$$(this.itemAddToCartButtons);
    console.log(`Found ${buttons.length} add to cart buttons.`);
    for (let i = 0; i < itemCount; i++) {
      console.log(`Clicking add to cart button ${i + 1}`);
      await buttons[i].click();
      await this.page.waitForTimeout(500); // Small wait to ensure the action is processed
    }
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
    await this.page.waitForTimeout(2000);
  }
}
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = '.cart_item';
    this.checkoutButton = 'body.main-body:nth-child(2) div.page_wrapper:nth-child(1) div:nth-child(2) div.cart_contents_container div:nth-child(1) div.cart_footer > a.btn_action.checkout_button';
  }

  async verifyItemsInCart(expectedItemCount) {
    console.log('Waiting for cart items to be visible.');
    await this.page.waitForSelector(this.cartItems, { timeout: 60000 });
    const items = await this.page.$$(this.cartItems);
    console.log(`Found ${items.length} items in cart.`);
    if (items.length !== expectedItemCount) {
      throw new Error(`Expected ${expectedItemCount} items in cart, but found ${items.length}`);
    }
  }
  async clickCheckout() {
    console.log('Waiting for the checkout button to be visible.');
    const checkoutButtonExists = await this.page.$(this.checkoutButton);
    if (checkoutButtonExists) {
      await this.page.waitForSelector(this.checkoutButton, { visible: true, timeout: 60000 });
      console.log('Clicking the checkout button.');
      await this.page.click(this.checkoutButton);
    } else {
      throw new Error('Checkout button not found on the page.');
    }
  }
}
  /*async clickCheckout() {
    console.log('Waiting for the checkout button to be visible.');
    await this.page.waitForSelector(this.checkoutButton, { visible: true, timeout: 60000 });
    console.log('Clicking the checkout button.');
    await this.page.click(this.checkoutButton);
  }*/


class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.postalCodeInput = '#postal-code';
    this.continueButton = '[type="submit"]';
    this.finishButton = 'body.main-body:nth-child(2) div.page_wrapper:nth-child(1) div.checkout_summary_container div:nth-child(1) div.summary_info div.cart_footer:nth-child(8) > a.btn_action.cart_button';
  }

  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.page.fill('#first-name', firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async completeCheckout() {
    await this.page.click(this.finishButton);
  }
}


module.exports = {LoginPage,InventoryPage,CartPage,CheckoutPage};

