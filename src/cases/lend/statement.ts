import createStatementData from "./createStatementData";

function statement(invoice: Invoice, plays: Record<string, Play>) {
  return renderHTML(createStatementData(invoice,plays));
}

function renderHTML(data:StatementData,):LendRes{
  let result:LendRes = {
    statement: `<h1>Statement for ${data.customer}</h1>\n`,
    playsAmount: [],
    playsList: [],
    playsEntry: []
  }
  result["statement"] += "<table>\n";
  result["statement"] += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  updateResult();
  result["statement"] += `<p>Amount owed is<em>${usd(data.totalAmount)}</em></p>\n`;
  result["statement"] += `<p>You earned<em>${data.totalCredits}</em>credits</p>\n`;
  return result;

  function updateResult(){
    for (let perf of data.performances) {
      result["playsList"].push(perf.play.name);
      result["playsAmount"].push(usd(perf.amount));
      result["playsEntry"].push({ [perf.play.name]: usd(perf.amount) })
      result["statement"] += `<tr><td>${perf.play.name}</td><td>${usd(perf.amount)}</td>`;
      result["statement"] += `<td>${perf.audience}</td></tr>\n`;
    }
  }
}


function usd(num:number){
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(num / 100);
}


export { statement };

