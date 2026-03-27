// @ts-check
import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('http://localhost:5500/loginPage');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Login/);
// });

test('google', async ({ page }) => {
  await page.goto('https://www.google.com');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Google/);
});

// test('try login', async ({page}) =>{
//   await page.goto('http://localhost:5500/loginPage')

//   await page.getByPlaceholder('email').fill('syali463@gmail.com');
//   await page.getByPlaceholder('password').fill('Asif1234.');
//   await page.getByRole('button', {name: 'Login'}).click();

//   await page.pause();
//   await expect(page).toHaveTitle('Dashboard');

// })

// test('try wrong login', async ({page}) =>{
//   await page.goto('http://localhost:5500/loginPage')

//   await page.getByPlaceholder('email').fill('syal463@gmail.com');
//   await page.getByPlaceholder('password').fill('Asif1234.');
//   await page.getByRole('button', {name: 'Login'}).click();

//   await page.pause();
//   await expect(page.getByTestId('messageTest')).toHaveText('Invalid username or password.');

// })