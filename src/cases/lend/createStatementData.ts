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
    const result = Object.assign({},performance) as CPerformanceEnriched;
    result.play = getPlay(result);
    result.amount = calcAmount(result);
    result.volumnCredits = calcCredit(result);
    return result;
  }

  function getPlay(perf:CPerformance){
    return plays[perf.playID]
  }

  function calcAmount (perf:CPerformanceEnriched){
    let result = 0;
      switch (perf.play.type) {
        case 'tragedy': {
          result = 40000;
          if (perf.audience > 30) {
            result += 1000 * (perf.audience - 30);
          }
          break;
        }
        case 'comedy': {
          result = 30000;
          if (perf.audience > 20) {
            result += 10000 + 500 * (perf.audience - 20);
          }
          result += 300 * perf.audience;
          break;
        }
        default: {
          throw new Error(`unknown type: ${perf.play.type}`);
        }
      }
      return result;
  }         
  
  function calcCredit(perf:CPerformanceEnriched){
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if (perf.play.type === 'comedy') result += Math.floor(perf.audience / 5);
    return result;
  }

  function calcTotalCredits(data:StatementData){
    return data.performances.reduce((total,p)=>total + p.volumnCredits,0)
  }

  function calcTotalAmount(data:StatementData){
    return data.performances.reduce((total,p)=>total + p.amount,0)
  }
}