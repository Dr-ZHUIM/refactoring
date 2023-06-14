function statement(invoice: Invoice, plays: Record<string, Play>) {
  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance)
  }
  return renderPlainText(statementData,plays);

  function enrichPerformance(performance:CPerformance){
    const result = Object.assign({},performance) as CPerformanceEnriched;
    result.play = getPlay(result);
    result.amount = calcAmount(result);
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


}

function renderPlainText(data:any,plays: Record<string, Play>):LendRes{
  let result:LendRes = {
    statement: `Statement for ${data.customer}\n`,
    playsAmount: [],
    playsList: [],
    playsEntry: []
  }
  updateResult();
  result["statement"] += `Amount owed is ${usd(calcTotalAmount())}\n`;
  result["statement"] += `You earned ${calcTotalCredits()} credits\n`;
  return result;

  function getCredit(perf:CPerformanceEnriched){
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if (perf.play.type === 'comedy') result += Math.floor(perf.audience / 5);
    return result;
  }

  function calcTotalCredits(){
    let result = 0;
    for (let perf of data.performances) {
      result += getCredit(perf);
    }
    return result;
  }

  function calcTotalAmount(){
    let result = 0;
    for (let perf of data.performances) {
      result += perf.amount;
    }
    return result;
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

  function usd(num:number){
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(num / 100);
  }

  function updateResult(){
    for (let perf of data.performances) {
      result["playsList"].push(perf.play.name);
      result["playsAmount"].push(usd(perf.amount));
      result["playsEntry"].push({ [perf.play.name]: usd(perf.amount) })
      result["statement"] += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience
        } seats)\n`;
    }
  }
}

export { statement };

