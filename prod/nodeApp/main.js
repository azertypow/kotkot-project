"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const voiceGenerator_js_1 = require("./voiceGenerator.js");
const appServer_1 = require("./appServer");
voiceGenerator_js_1.default.run();
appServer_1.default.run(1337);
