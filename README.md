# ES2015 code coverage using nyc

This project demonstrates usage of [nyc](https://github.com/bcoe/nyc) for
checking and reporting of JavaScript code coverage on a Babel-transpiled
ES2015 project.

## Running the project

* To run tests and check/report coverage: `npm run test`
* To run a webserver and execute built code in a browser: `npm run start`

## Coverage reports

We generate an "lcov" HTML report, output under `build/coverage/lcov-report/`.
This shows overall stats for the project (statement, branch, function, and
line coverage) and links to pages for each script showing individual stats
and highlighting covered vs. uncovered code.

In our case, we are missing coverage for the parsing-error statements in
`src/Calculator.js` and the entirety of `src/UnusedClass.js`.

## Checking coverage

We not only report on coverage but check that it meets a minimum percentage.
This effectively means code without test coverage will "break the build".

In our case, we want line coverage of 90%; the project deliberately fails
with this error message after running tests:

```
ERROR: Coverage for lines (66.67%) does not meet global threshold (90%)
```

## Improving coverage

You can clone this project and improve test coverage by doing two things:

* Enable the skipped parsing error test in `test/Calculator_test.js`.
* Remove the unused script, `test/UnusedClass.js`.
