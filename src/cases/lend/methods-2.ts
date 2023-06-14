function statement(invoice: Invoice, plays: Record<string, Play>) {
  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances
  }
  return renderPlainText(statementData,plays)
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

  function getPlay(perf:CPerformance){
    return plays[perf.playID]
  }

  function getCredit(perf:CPerformance){
    let result = 0;
    result += Math.max(perf.audience - 30, 0);
    if (getPlay(perf).type === 'comedy') result += Math.floor(perf.audience / 5);
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
      result += calcAmount(perf);
    }
    return result;
  }
  
  function calcAmount (perf:CPerformance){
    let result = 0;
      switch (getPlay(perf).type) {
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
          throw new Error(`unknown type: ${getPlay(perf).type}`);
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
      result["playsList"].push(getPlay(perf).name);
      result["playsAmount"].push(usd(calcAmount(perf)));
      result["playsEntry"].push({ [getPlay(perf).name]: usd(calcAmount(perf)) })
      result["statement"] += `  ${getPlay(perf).name}: ${usd(calcAmount(perf))} (${perf.audience
        } seats)\n`;
    }
  }
}

export { statement };

