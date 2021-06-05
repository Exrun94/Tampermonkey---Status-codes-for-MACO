// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://maco.siteground.com/client_manager/*
// @icon         https://www.google.com/s2/favicons?domain=siteground.com
// @grant        GM_xmlhttpRequest
/* globals request */
// ==/UserScript==


let data = document.querySelectorAll('tr.green')
let hasSSL = '';
let regexSSL = /https/g;



data.forEach(d => GM_xmlhttpRequest({
    method:     'GET',
    url:        `http://${d.children[2].innerText}`,
    onload:     function (response) {

      console.log([
      response.status,
      response.statusText,
      response.readyState,
      response.responseHeaders,
      response.finalUrl,
    ].join("\n"));

        if(response.finalUrl.match(regexSSL)) {
            hasSSL = 'SSL'
        } else {
            hasSSL = 'No SSL'
        }

    d.children[1].innerText = `${response.status} | ${hasSSL}`
    },

    onerror:     function (err) {
        console.log(err)
        d.children[1].innerText = 'Failed to fetch'
    }
}))
