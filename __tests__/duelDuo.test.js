const { Builder, Browser, By, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

let driver;

beforeEach(async () => {
  const geckoDriverPath = "C:\Users\shwif\OneDrive\Desktop\DevMountain\Assessments!\assessment-qa-devops\Gecko_Driver\geckodriver.exe";
  const firefoxOptions = new firefox.Options().setBinary("C:\Users\shwif\AppData\Local\Microsoft\WindowsApps\Mozilla.Firefox_n80bbvh6b1yt2\firefox.exe");

  driver = await new Builder()
    .forBrowser(Browser.FIREFOX)
    .setFirefoxOptions(firefoxOptions)
    .setFirefoxService(new firefox.ServiceBuilder(geckoDriverPath))
    .build();
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