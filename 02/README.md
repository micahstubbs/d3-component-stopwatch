A stopwatch app constructed using [d3-component](https://github.com/curran/d3-component).

The following components are defined and used to construct the app:

 * `app` <br>The top-level app component. This serves as a "container component" that holds the state of the app, and exposes "actions" to children (similar pattern to [Redux](http://redux.js.org/). This component manages an instance of [d3-timer](https://github.com/d3/d3-timer) that keeps track of passing time. <br><br> 
 * `buttonPanel` <br>The panel that contains the two buttons. This shows a simple composition pattern in which props are passed through to child components. <br><br> 
 * `resetButton` <br>The button that says "Reset" and invokes the `reset` action when clicked. <br><br> 
 * `startStopButton` <br>The button that either starts or stops (pauses) the stopwatch when clicked, depending on whether the stopwatch is running or not. <br><br> 
 * `button` <br> A generic Button component, used by both `resetButton` and `startStopButton`. <br><br> 
 * `timeDisplay` <br> A display of the current time.

Built with [blockbuilder.org](http://blockbuilder.org)

forked from <a href='http://bl.ocks.org/curran/'>curran</a>'s block: <a href='http://bl.ocks.org/curran/fc8f6989901628e2e79d6374849453ed'>Posts with d3-component</a>

<!-- Start of SimpleHitCounter Code -->
<div align="center"><img src="http://simplehitcounter.com/hit.php?uid=2238980&f=16777215&b=0" border="0" height="18" width="83"></a><br></div>
<!-- End of SimpleHitCounter Code -->
