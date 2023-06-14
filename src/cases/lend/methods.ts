function statement(invoice: Invoice, plays: Record<string, Play>) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let statement = `Statement for ${invoice.customer}\n`;
  let playsAmount: string[] = [];
  let playsList: string[] = [];
  let playsEntry: Record<string, string>[] = [];
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    switch (play.type) {
      case 'tragedy': {
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      }
      case 'comedy': {
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      }
      default: {
        throw new Error(`unknown type: ${play.type}`);
      }
    }

    // add volumn credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credits for every ten comedy attendees
    if (play.type === 'comedy') volumeCredits += Math.floor(perf.audience / 5);
    playsAmount.push(format(thisAmount / 100));
    playsList.push(play.name);
    playsEntry.push({ [play.name]: format(thisAmount / 100) })
    statement += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience
      } seats)\n`;
    totalAmount += thisAmount;
  }

  statement += `Amount owed is ${format(totalAmount / 100)}\n`;
  statement += `You earned ${volumeCredits} credits\n`;
  return {
    playsList,playsAmount,playsEntry,statement
  };
}

export { statement };

