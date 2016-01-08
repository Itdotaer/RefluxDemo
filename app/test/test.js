require('./test.css');

var React = require('react');
var ReactDOM = require('react-dom');

var TestComponent = React.createClass({
    render: function(){
        return (
            <div className="test">Info:Reflux Demo</div>
        );
    }
});

module.exports = TestComponent;
