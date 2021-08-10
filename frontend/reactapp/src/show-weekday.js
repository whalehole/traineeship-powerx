import React from 'react';
import ReactDOM from 'react-dom';

export default function() {
    const showWeekday = (
        <span className="test-xs">Today is <b className="underline">Sunday</b></span>
    );
    ReactDOM.render(showWeekday, document.getElementById("root"));
}