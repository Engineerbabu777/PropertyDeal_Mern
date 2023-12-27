"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _app = require("firebase/app");

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.KEY,
  authDomain: "testing-projects-373f0.firebaseapp.com",
  projectId: "testing-projects-373f0",
  storageBucket: "testing-projects-373f0.appspot.com",
  messagingSenderId: "319109786606",
  appId: "1:319109786606:web:34955bbcaba2eca7907cff"
}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig);
exports.app = app;