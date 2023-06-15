import { PerformanceCalculator } from "./class";
export default function createStatementData(invoice: Invoice, plays: Record<string, Play>){
  const statementData:StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
    totalCredits: 0,
    totalAmount: 0
  };
  statementData.totalCredits = calcTotalCredits(statementData);
  statementData.totalAmount = calcTotalAmount(statementData);
  return statementData;

  function enrichPerformance(performance:CPerformance){
    const calculator = createPerformanceCalculator(performance,getPlay(performance))
    const result = Object.assign({},performance) as CPerformanceEnriched;
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumnCredits = calculator.volumnCredits;
    return result;
  }

  function getPlay(perf:CPerformance){
    return plays[perf.playID]
  }

  // function getAmount(perf:CPerformanceEnriched){
  //   return new PerformanceCalculator(perf,getPlay(perf)).amount;
  // }

  function calcTotalCredits(data:StatementData){
    return data.performances.reduce((total,p)=>total + p.volumnCredits,0)
  }

  function calcTotalAmount(data:StatementData){
    return data.performances.reduce((total,p)=>total + p.amount,0)
  }
}


function createPerformanceCalculator(perf:CPerformance,play:Play){
  return new PerformanceCalculator(perf,play);
}