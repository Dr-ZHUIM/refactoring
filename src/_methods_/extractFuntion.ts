function printBanner() {
  console.log('banner');
}

function calculateOutstanding() {
  return 1111;
}

function printOwing(invoice: Invoice) {
  printBanner();
  const outStanding = calculateOutstanding();

  // print detail
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outStanding}`);
}

// ||
// VV

function printOwingRefacted(invoice: Invoice) {
  printBanner();
  printDetails(calculateOutstanding());
  function printDetails(outStanding: number) {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outStanding}`);
  }
}
