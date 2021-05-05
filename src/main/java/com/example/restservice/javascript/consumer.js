const fetch = require("node-fetch");
const prompt = require('prompt-sync')();
const fs = require("fs")
let url = "http://localhost:8080";

function getOS() {
  const fetchPromise = fetch(url + '/os');

  fetchPromise.then(res => {
    res.text().then(osname => console.log(osname))
  })
}

function getScreenShot() {
  const fetchPromise = fetch(url + '/screenshot');
  fetchPromise.then(res => {
    res.text().then(screenshot => {
      var buffer = Buffer.from(screenshot, "base64")
      fs.writeFile(__dirname + '\\screenshot.png', buffer, function (err) {
        console.log("Screenshot saved successfully");
      })
    })
  })
}

function reboot() {
  const fetchPromise = fetch(url + "/reboot");
  fetchPromise.then(response => {
    response.text().then(status => console.log(status))
  });
}

async function menu() {

  console.log("\n1. GET OsName\n2. SAVE ScreenShot\n3. REBOOT\nChoice: ");
  let choice = prompt()
  switch (parseInt(choice)) {
    case 1:
      getOS()
      break;
    case 2:
      getScreenShot()
      break;
    case 3:
      reboot()
      break;
    default:
      console.log("Please enter a valid option");
  }
}

menu()