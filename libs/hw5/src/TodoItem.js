import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props){
    super(props);
    this.state={
      value:props.value,
    };
    // this.state.value is broken!!
  }
  render(){
    // console.log(this.props.value);
      return(
        <div className={this.props.cn}>
          <div className="todoitem" id={this.props.id}>
            <input className="checkbox" type="checkbox" />
            <p className="content"> {this.props.value} </p>
            <p className="delete" onClick={this.destroy_itself}>X</p>
          </div>
        </div>
        );
      }
 }

 module.exports=TodoItem;