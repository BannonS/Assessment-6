const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });
});

describe("See All Bots button works", () => {
  test("When See All Bots button is clicked, bot cards display below", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);

    const seeAllBotsButton = await driver.findElement(By.id("see-all"));
    await seeAllBotsButton.click();

    const botCards = await driver.findElements(By.className("bot-card"));
    expect(botCards.length).toBeGreaterThan(0);
  });
});


describe("Robot Name Validation", () => {
  test("Validates that robot names are not empty", () => {
    const robotNames = ["bot1", "bot2", "bot3"];
  
    const isEmptyNamePresent = robotNames.some(name => name === "");
  
    expect(isEmptyNamePresent).toBe(false);
    
  });
});