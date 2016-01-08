require('./test.css');

var React = require('react');
var ReactDOM = require('react-dom');

var TestComponent = React.createClass({
    render: function(){
        return (
            <div className="test">Test Comonent</div>
        );
    }
});

module.exports = TestComponent;
