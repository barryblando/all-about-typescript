"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatchReader_1 = require("./MatchReader");
var Summary_1 = require("./Summary");
var WinsAnalysis_1 = require("./analyzers/WinsAnalysis");
var consoleReporter_1 = require("./reportTargets/consoleReporter");
// Using Composition
var matchReader = MatchReader_1.MatchReader.fromCsv('football.csv');
var summary = Summary_1.Summary.winsAnalysisWithHtmlReport('Man United');
matchReader.load();
summary.buildAndPrintReport(matchReader.matches);
var consoleSummary = new WinsAnalysis_1.WinsAnalysis('Man United').run(matchReader.matches);
new consoleReporter_1.ConsoleReport().print(consoleSummary);
