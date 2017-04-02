/* global d3 Redux */

// This function formats the stopwatch time.
const stopwatchFormat = ((() => {
  const twoDigits = d3.format('02.0f');
  return (milliseconds) => {
    const centiseconds = Math.floor(milliseconds / 10);
    const centisecond = centiseconds % 100;
    const seconds = Math.floor(centiseconds / 100);
    const second = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    const minute = minutes % 60;
    const hours = Math.floor(minutes / 60);
    return [
      hours >= 1 ? `${hours}:` : '',
      minutes >= 1 ? (
        `${hours >= 1 ? twoDigits(minute) : minute}:`
      ) : '',
      (minutes >= 1 ? twoDigits(second) : second),
      hours < 1 ? `:${twoDigits(centisecond)}` : '',
    ].join('').replace(/0/g, 'O'); // Don't show the dot in the zeros.
  };
})());

// A component that renders the formatted stopwatch time.
const timeDisplay = ((() => {
  const timerLocal = d3.local();
  return d3.component('div', 'time-display')
    .render(function (selection, d) {
      const timer = timerLocal.get(selection.node());
      if (timer) { timer.stop(); }
      if (d.stopped) {
        selection.text(stopwatchFormat(d.stopTime - d.startTime));
      } else {
        timerLocal.set(selection.node(), d3.timer(() => {
          selection.text(stopwatchFormat(Date.now() - d.startTime));
        }));
      }
    })
    .destroy(function (selection) {
      const timer = timerLocal.get(selection.node());
      if (timer) { timer.stop(); }
    });
})());

// A generic Button component.
const button = d3.component('button')
  .render(function (selection, d) {
    selection
      .text(d.text)
      .on('mousedown', d.onClick);
  });

// The button that either starts or stops (pauses) the stopwatch,
// depending on whether the stopwatch is running or not.
const startStopButton = d3.component('span')
  .render(function (selection, d) {
    selection.call(button, {
      text: d.stopped ? 'Start' : 'Stop',
      onClick: d.stopped ? d.actions.start : d.actions.stop,
    });
  });

// The reset button that stops and resets the stopwatch.
const resetButton = d3.component('span')
  .render(function (selection, d) {
    selection.call(button, {
      text: 'Reset',
      onClick: d.actions.reset,
    });
  });

// The panel that contains the two buttons.
const buttonPanel = d3.component('div')
  .render(function (selection, d) {
    selection
      .call(resetButton, d)
      .call(startStopButton, d);
  });

// The top-level app component.
const app = d3.component('div')
  .render(function (selection, d) {
    selection
      .call(timeDisplay, d)
      .call(buttonPanel, d);
  });

function main() {
  const store = Redux.createStore(reducer);
  const actions = actionsFromDispatch(store.dispatch);
  store.subscribe(render);
  actions.reset();
  function reducer(state, action) {
    state = state || {
      stopped: true,
    };
    let now;
    switch (action.type) {
      case 'START':
        return Object.assign({}, state, {
          stopped: false,
          startTime: Date.now() - (state.stopTime - state.startTime),
        });
      case 'STOP':
        return Object.assign({}, state, {
          stopped: true,
          stopTime: Date.now(),
        });
      case 'RESET':
        now = Date.now();
        return Object.assign({}, state, {
          stopped: true,
          startTime: now,
          stopTime: now,
        });
      default:
        return state;
    }
  }

  function actionsFromDispatch(dispatch) {
    return {
      start() {
        dispatch({ type: 'START' });
      },
      stop() {
        dispatch({ type: 'STOP' });
      },
      reset() {
        dispatch({ type: 'RESET' });
      },
    };
  }

  function render() {
    console.log(store.getState());
    d3.select('body').call(app, store.getState(), {
      actions,
    });
  }
}

// call main() to run the app
main();
