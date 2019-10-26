import { MatchReader } from './MatchReader'
import { Summary } from './Summary';
import { WinsAnalysis } from './analyzers/WinsAnalysis';
import { ConsoleReport } from './reportTargets/consoleReporter';

// Using Composition

const matchReader = MatchReader.fromCsv('football.csv')
const summary = Summary.winsAnalysisWithHtmlReport('Man United')

matchReader.load()
summary.buildAndPrintReport(matchReader.matches)

const consoleSummary = new WinsAnalysis('Man United').run(matchReader.matches)
new ConsoleReport().print(consoleSummary)