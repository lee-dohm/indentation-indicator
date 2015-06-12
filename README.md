# Indentation Indicator [![Build Status](https://travis-ci.org/lee-dohm/indentation-indicator.svg?branch=master)](https://travis-ci.org/lee-dohm/indentation-indicator) [![Dependency Status](https://david-dm.org/lee-dohm/indentation-indicator.svg)](https://david-dm.org/lee-dohm/indentation-indicator)

Adds an indicator to the status bar that shows the indentation width and type of the active editor.

Active editor with soft tabs enabled and two spaces:

![Soft tabs and two spaces](https://raw.githubusercontent.com/lee-dohm/indentation-indicator/master/soft-tabs.png)

Active editor with soft tabs disabled and four spaces:

![Hard tabs and four spaces](https://raw.githubusercontent.com/lee-dohm/indentation-indicator/master/hard-tabs.png)

## Configuration

* `indentation-indicator.spaceAfterColon` &mdash; When set to `true`, places a space between the colon and the number of spaces per indentation level.
* `indentation-indicator.indicatorPosition` &mdash; Control the placement of the indicator, `left` or `right`.

## Styles

The indentation indicator can be styled using the following classes:

* `.indentation-indicator` - For styling all instances of the indicator

It uses the following values from `ui-variables` as defaults in order to blend in to your theme:

* `@text-color` - Color of the indicator text

## Copyright

Copyright &copy; 2014-2015 [Lee Dohm](http://www.lee-dohm.com) and [Lifted Studios](http://www.liftedstudios.com). See [LICENSE](https://raw.githubusercontent.com/lee-dohm/indentation-indicator/master/LICENSE.md) for details.
