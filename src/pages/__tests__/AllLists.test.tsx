import puppeteer, { Browser, Page } from 'puppeteer'
import { renderAllTodo } from './../../utils/test/puppeteer';

let browser: Browser, p: Page

jest.setTimeout(45000)
beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: ['–no-sandbox' , '–disable-setuid-sandbox']
  });
  p = await browser.newPage()
  await renderAllTodo(p)
})

afterEach(async () => {
  await browser.close()
})

test('list without todos', async () => {
  await p.click('#root > div > ul > li:nth-child(3)')
  await p.waitForSelector('.lists a')
  await p.click('.lists a')
  await p.type('#root > div > div > input[type=text]', 'test list')
  await p.click('#root > div > div > button')
  await p.click('#root > div > div > button')
  await p.waitForSelector('.list h1')
  const listName = await p.evaluate(() => {
    return document.querySelector('.list:last-of-type h1')?.textContent
  })

  expect(listName).toBe('test list')
})

test('list with todos', async () => {
  await p.click('#root > div > ul > li:nth-child(3)')
  await p.waitForSelector('.lists a')
  await p.click('.lists a')
  await p.type('#root > div > div > input[type=text]', 'test list')
  await p.click('#root > div > div > button')
  await p.waitForSelector('.lists a')
  await p.click('#root > div > ul > li:nth-child(2) > a')
  await p.type('#root > div > div > div > input[type=text]:nth-child(2)', 'test todo')

  const listValue = await p.evaluate((): any => {
    return (document.querySelector('#list > option:last-child') as any)?.value
  })

  await p.select('#list', listValue as string)
  await p.screenshot({ path: 'src/pages/__tests__/AddTodo.png' })
  await p.click('#root > div > div > button')
  await p.waitForSelector('.todo h1')
  await p.click('#root > div > ul > li:nth-child(3) > a')
  await p.waitForSelector('.lists a')
  await p.waitForSelector('.list:last-of-type h1')

  const listInfo = await p.evaluate(() => {
    return [document.querySelector('.list:last-of-type h1')?.textContent,
            document.querySelector('.list:last-of-type p')?.textContent]
  })

  expect(listInfo[0]).toBe('test list')
  expect(listInfo[1]).toBe('test todo')
})

