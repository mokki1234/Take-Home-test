const { test, expect } = require('@playwright/test');
const{LoginPage,InventoryPage,CartPage,CheckoutPage} = require('./pageobject');

test('Swaglabs end-to-end test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Navigate to the website
  await loginPage.navigate();

  // Step 2: Login as standard_user
  await loginPage.login('standard_user', 'secret_sauce');

  // Step 3: Add items to cart
  await inventoryPage.addItemsToCart(2); // Add 2 items

  // Step 4: Verify the correct items were added to the cart
  await inventoryPage.goToCart();
  await cartPage.verifyItemsInCart(2);

  // Step 5: Complete checkout process
  await cartPage.clickCheckout();
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  await checkoutPage.completeCheckout();

  // Verify checkout completion
  const thankYouHeader = await page.locator('.complete-header').innerText();
  expect(thankYouHeader).toBe('THANK YOU FOR YOUR ORDER');
  console.log('Test has been complete');
});
