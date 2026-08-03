// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { report } from 'node:process';

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
const config =({
  testDir: './tests',
  timeout: 30*1000,//given 30econdss as explicit tiemout for each test step 
  expect:
  {
     timeout: 5000,   //given 5seconds as explicit tiemout for expect
  },

  reporter : [['html'],['github']], //to generate html reports

  use:{

   browserName : 'chromium',
   headless : true, // it means it will open the browser
   screenshot: 'on', //captures sc for all the steps
   trace: 'on',
   ignoreHttpsError : true,

  },
});

module.exports = config;

