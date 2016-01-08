require('./style.css');

var Reflux = require('reflux');
var React = require('react');
var ReactDOM = require('react-dom');

var Common = require('./common');

var TestComponent = require('./test/test');

var TodoActions = Reflux.createActions([
    'getAll',
    'addItem',
    'editItem',
    'deleteItem'
]);

var TodoStore = Reflux.createStore({
    items:[],
    init: function(){
        this.listenTo(TodoActions.getAll, 'getAll');
        this.listenTo(TodoActions.addItem, 'addItem');
        this.listenTo(TodoActions.editItem, 'editItem');
        this.listenTo(TodoActions.deleteItem, 'deleteItem');
    },
    getAll: function(){
        this.trigger(this.items);
    },
    addItem: function(value){
        this.items.push({id:this.items.length, value: value});
        this.trigger(this.items);
    },
    editItem: function(id, value){
        var idx = Common.findItemById(this.items, id);
        if(idx > -1){
            this.items[idx].value = value;
            this.trigger(this.items);
        }else{
            alert('Edit: not found!');
        }
    },
    deleteItem: function(id){
        var idx = Common.findItemById(this.items, id);
        if(idx > -1){
            this.items.splice(idx, 1);
            this.trigger(this.items);
        }else{
            alert('Delete: not found!');
        }
    }
});

var InputComponent = React.createClass({
    handleAdd: function(event){
        // this.refs.inputText.focus();
        TodoActions.addItem(this.refs.addInput.value);
    },
    render: function(){
        return (
            <p>
                <input type="text" ref="addInput" />
                <button onClick={this.handleAdd}>Add Item</button>
            </p>
        );
    }
});

var TodoItem = React.createClass({
    getInitialState: function(){
        return {isEdit: false};
    },
    isEdit: function(){
        this.setState({isEdit: !this.state.isEdit});
        this.refs.editInput.value = this.props.item.value;
    },
    handleEdit: function(event){
        TodoActions.editItem(this.props.item.id, this.refs.editInput.value);
    },
    handleDelete: function(event){
        TodoActions.deleteItem(this.props.item.id);
    },
    render: function(){
        return (
            <li>
                Index:{this.props.item.id} | Value{this.props.item.value}
                <button onClick={this.isEdit}>E</button>
                <button onClick={this.handleDelete}>X</button>
                <p style={{display: this.state.isEdit ? 'block' : 'none'}}>
                    <input type="text" ref="editInput" />
                    <button onClick={this.handleEdit}>Sure</button>
                </p>
            </li>
        );
    }
});

var TodoComponent = React.createClass({
    mixins:[Reflux.listenTo(TodoStore, 'onStatusChange')],
    getInitialState: function(){
        return {list: []};
    },
    onStatusChange: function(list){
        this.setState({list: list});
    },
    componentDidMount: function(){
        TodoActions.getAll();
    },
    render: function(){
        return (
            <div>
                <TestComponent />
                <InputComponent />
                <ul>
                    {
                        this.state.list.map(function(item){
                            return <TodoItem item={item} />;
                        })
                    }
                </ul>
            </div>
        );
    }
});

ReactDOM.render(<TodoComponent />, document.getElementById('container'));
