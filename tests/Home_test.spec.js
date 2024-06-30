const { test, expect } = require('@playwright/test');
const{LoginPage,ProductsPage,CartPage}=require('./pageobject');

test('Home Test',async ({page}) => 
{
  
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
  
    // Step 1: Navigate to the website
    await loginPage.navigateTo('https://www.saucedemo.com/v1/');
  
    // Step 2: Login as standard_user
    await loginPage.login('standard_user', 'secret_sauce');
  
    // Step 3: Add items to cart
    await productsPage.addToCart('Sauce Labs Backpack');
    await productsPage.addToCart('Sauce Labs Bike Light');
  
    // Step 4: Verify items in the cart
    const cartItems = await cartPage.getCartItems();
    console.log('Cart items:', cartItems);
  
    // Step 5: Proceed to checkout
    await cartPage.clickCheckout();
});