import createStatementData from "./createStatementData";

function statement(invoice: Invoice, plays: Record<string, Play>) {
  return renderPlainText(createStatementData(invoice,plays),plays);
}

function renderPlainText(data:StatementData,plays: Record<string, Play>):LendRes{
  let result:LendRes = {
    statement: `Statement for ${data.customer}\n`,
    playsAmount: [],
    playsList: [],
    playsEntry: []
  }
  updateResult();
  result["statement"] += `Amount owed is ${usd(data.totalAmount)}\n`;
  result["statement"] += `You earned ${data.totalCredits} credits\n`;
  return result;

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

