// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { permission, report } from 'node:process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './test',
  retries:1, //rexectures the flaky test once after failing
  workers:7,
  timeout: 30 * 1000,//given 30econdss as explicit tiemout for each test step 
  expect:
  {
    timeout: 5000,   //given 5seconds as explicit tiemout for expect
  },

  reporter: 'html', //to generate html reports

  projects:
    [
      {
        name: 'Firefox',
        use: {
          browserName: 'firefox',
          headless: false,
          screenshot: 'on',
          trace: 'on'
        },
      },
       {
        name: 'chrome',
        use: {
          browserName: 'chromium',
          headless: false,
          screenshot: 'on', //stored in test-results folder post execution
          //trace: 'on',
          trace: 'retain-on-failure', //stored in playwright-results folder post execution
          viewport : {width:720,height:720},//this opens browser in the provided width and height
          ignoreHttpsError : true, //this is used to handle SSL cert issue
          permission :['geolocation'] // thi is used to accpet the "Allow Location" popup
          //...devices['']
        },
      }

    ]
});

module.exports = config;

