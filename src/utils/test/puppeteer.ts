import {  Page } from "puppeteer"

export const renderAllTodo = async (p: Page) => {
  await p.goto('http://localhost:3000/')
  await p.waitForSelector('#root > div > div > h1')
  await p.click('#root > div > ul > li > a')
  await p.type('#input > div.email > input[type=email]', 'test@test.com')
  await p.type('#input > div.password > input[type=password]', 'test')
  await p.keyboard.press('Enter')
  await p.click('#root > div > div > button')
  await p.waitForSelector('#root > div > ul > li:nth-child(2)')
  await p.waitForTimeout(500)
  await p.screenshot({ path: 'test.png' })
}
