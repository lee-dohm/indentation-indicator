# CHANGELOG

## **v1.0.0** &mdash; *Released: 2016-07-04*

* Add a simple tooltip to the indicator
* Convert package from CoffeeScript to JavaScript
* Convert from HTML Custom Elements to using [Etch](https://github.com/atom/etch)
* Convert tests from original style Atom tests to new custom tests using Mocha

## **v0.6.0** &mdash; *Released: 2015-06-12*

* [#13](https://github.com/lee-dohm/indentation-indicator/pull/13) by [@jwilsson](https://github.com/jwilsson) &mdash; Added a new configuration option to choose whether the indicator should be on the left or right

## **v0.5.1** &mdash; *Released: 2015-05-02*

* Update Atom version requirement to v0.196.0 because it appears that the v1.0 Status Bar API was not released until later than I thought

## **v0.5.0** &mdash; *Released: 2015-05-01*

* Cleanup for Deprecation Day

## **v0.4.1** &mdash; *Released: 2015-01-24*

* [#9](https://github.com/lee-dohm/indentation-indicator/issues/9) &mdash; Guarded against `undefined`
* Cleaned up some deprecations

## **v0.4.0** &mdash; *Released: 2015-01-08*

* Resolved all deprecations in preparation for Atom v1.0
* Converted to using the new Status Bar API

## **v0.3.0** &mdash; *Released: 2014-12-05*

* [#5](https://github.com/lee-dohm/indentation-indicator/issues/5) &mdash; Now updates when the grammar is changed
* Updated for new APIs

## **v0.2.1** &mdash; *Released: 2014-11-27*

* Update for new APIs

## **v0.2.0** &mdash; *Released: 2014-10-02*

* Add configuration option (`indentation-indicator.spaceAfterColon`) to show a space after the colon. Defaults to `false`.

## **v0.1.0** &mdash; *Released: 2014-07-14*

* Add indicator to the status bar
    * Shows `Tabs` when Soft Wrap is off and `Spaces` when Soft Wrap is on
    * Shows the tab length
