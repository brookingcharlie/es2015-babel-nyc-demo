# ES2015 code coverage using nyc

This project demonstrates usage of [nyc](https://github.com/bcoe/nyc) for
checking and reporting of JavaScript code coverage on a Babel-transpiled
ES2015 project.

## How nyc is configured

nyc is configured entirely in `package.json`.

### Incorporating nyc into our test script

You can create a test script that runs your usual test command through nyc as
follows.

In our case, we previously just ran `mocha ...`; now we run `nyc -- mocha ...`.

```
{
  ...
  "scripts": {
    "test": "nyc -- mocha --compilers js:babel-register test/**/*_test.js"
  }
}
```

### Configuring nyc options

nyc options can be provided on the command line or via JSON as shown below.

In our case, we configure a number of options:

* Using the `require` options, we pull in `babel-core/register` to dynamically
  apply Babel code transpilation on each require/import.
  We also also require `babel-polyfill` to ensure all ES2015 features are
  available at runtime.

* We apply coverage tools to code under `src/`, excluding `src/main.js`,
  using the `include` and `exclude` options.

* We enable the `all` option to account for scripts that are present under
  `src/` but happen to never be required/imported by either source or test
  code. Such scripts have 0% coverage; but unless we enable the `all` option,
  coverage checks and reports won't include them at all!

* We enable two different test reports using the `reporter` option:
  an "lcov" HTML report, output under `build/coverage/` according to the
  `report-dir` option) and a "text" report, which is output to the console.

* We configure a minimum line coverage of 90% by setting the `lines` option and
  enable `check-coverage` so that the `nyc` command returns an exit status if
  this coverage falls below this point.

```
{
  ...
  "nyc": {
    "require": ["babel-core/register", "babel-polyfill"],
    "include": ["src/**/*.js"],
    "exclude": ["src/main.js"],
    "all": true,
    "reporter": ["lcov", "text"],
    "report-dir": "./build/coverage",
    "lines": 90,
    "check-coverage": true
  }
}
```

## Running the project

* To run tests and check/report coverage: `npm run test`
* To run a webserver and execute built code in a browser: `npm run start`

## Coverage reports

We generate an "lcov" HTML report, output under `build/coverage/lcov-report/`.
This shows overall stats for the project (statement, branch, function, and
line coverage) and links to pages for each script showing individual stats
and highlighting covered vs. uncovered code.

We also output a text report to the console. This is useful for our example
project, although it could clutter the output of test results on a larger
code base. It can be disabled by removing "text" from the reporter config.

In our case, we are missing coverage for the parsing error statement in
`src/Calculator.js` and the entirety of `src/UnusedClass.js`.

```
-----------------|----------|----------|----------|----------|----------------|
File             |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-----------------|----------|----------|----------|----------|----------------|
 src/            |    69.23 |       50 |       50 |    66.67 |                |
  Calculator.js  |       90 |       50 |      100 |    88.89 |             14 |
  UnusedClass.js |        0 |      100 |        0 |        0 |         2,3,12 |
-----------------|----------|----------|----------|----------|----------------|
All files        |    69.23 |       50 |       50 |    66.67 |                |
-----------------|----------|----------|----------|----------|----------------|
```

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
