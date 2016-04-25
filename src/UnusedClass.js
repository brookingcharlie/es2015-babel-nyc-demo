class UnusedClass {
  constructor() {
    console.log(
      "Demonstrates class with zero test coverage. In fact, this script\n" +
      "is never required/imported by either source or test code; if we\n" +
      "didn't provide the --all flag to nyc, then coverage checks and\n" +
      "reports wouldn't include this script at all."
    );
  }
}

module.exports = UnusedClass;
