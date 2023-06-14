import { json } from "./utils/fetch.js";
import { statement } from "./cases/lend/methods.js";

async function execution() {
  const invoices = await json("/cases/lend/invoices.json",true);
  const plays = await json("/cases/lend/plays.json",true);
  const res = statement(invoices[0],plays);
  console.log('res',res)
}

await execution();