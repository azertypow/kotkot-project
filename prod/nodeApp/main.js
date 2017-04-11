"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var voiceGenerator_js_1 = require("./voiceGenerator.js");
var appServer_1 = require("./appServer");
voiceGenerator_js_1.default.run();
appServer_1.default.run(1337);
