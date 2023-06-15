export namespace Clac {
  export class PerformanceCalculator {
    constructor(performance: CPerformance, play: Play) {
      this.performance = performance;
      this.play = play;
    }
    performance: CPerformance;
    play: Play;
    get volumnCredits() {
      return Math.max(this.performance.audience - 30, 0);
    }
  }

  export class TragedyCalculator extends PerformanceCalculator {
    get amount() {
      let result = 40000;
      if (this.performance.audience > 30) {
        result += 1000 * (this.performance.audience - 30);
      }
      return result;
    }
  }

  export class ComedyCalculator extends PerformanceCalculator {
    get amount() {
      let result = 30000;
      if (this.performance.audience > 20) {
        result += 10000 + 500 * (this.performance.audience - 20);
      }
      result += 300 * this.performance.audience;
      return result;
    }

    get volumnCredits() {
      return super.volumnCredits + Math.floor(this.performance.audience / 5);
    }
  }
}
