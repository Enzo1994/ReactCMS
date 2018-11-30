import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Son extends React.Component {
    constructor(props) {
        super(props)
        console.log(this)
    }
    clickHandler() {
        console.log(this)
    }
    render() {
        return (
            <div>
                <button onClick={this.props.onClick(5)}>点击测试</button>
            </div>
        )
    }
}

// console.log(new Son().render())
class Father extends React.Component {
    constructor() {
        super()
        this.state = {
            value: Math.random()
        }
    }
    clickHandler(){

    }
    renderSon(){
        return <Son value={1} onClick = {(num)=>window.alert.bind(null,num)}/>
    }

    render() {
        return (
            <div>
                <p>测试文本</p>
                {this.renderSon()}
            </div>
        )
    }
}
ReactDOM.render(
    <Father />,
    document.getElementById('root')
);
