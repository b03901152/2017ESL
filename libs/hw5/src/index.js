import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const TodoItem=require('./TodoItem.js');
const CountDisplay=require('./CountDisplay.js')



class TodoApp extends Component {
  constructor(){
    super();
    this.state={
      todoitems:[],
      done:[],
      displaychoice:"",   
    }
    this.display = this.display.bind(this);
    this.click = this.click.bind(this);
  }
  push(e){
    if(e.key!=='Enter'||e.target.value=="")
      return;
    this.setState({done:[...this.state.done,false]});
    this.setState({todoitems:[...this.state.todoitems,e.target.value]});
    e.target.value="";
  }
  todoitems_construction(){
    var todoitemsbox=[];
    for(var i=0; i<this.state.todoitems.length; ++i)
    {
      if (! this.state.done[i])
        todoitemsbox.push(<TodoItem cn="active" value={this.state.todoitems[i]} key={i} id={i} />);
      else
        todoitemsbox.push(<TodoItem cn="completed" value={this.state.todoitems[i]} key={i} id={i} />);
    }
    if(this.state.displaychoice==="Completed")
      todoitemsbox=todoitemsbox.filter((v,i)=>this.state.done[i])
    else if(this.state.displaychoice==="Actived")
      todoitemsbox=todoitemsbox.filter((v,i)=>!this.state.done[i])
    return <div>
              {todoitemsbox}
          </div>

    
    // return <div>
    //          this.state.todoitems.map(
    //           (v,i) => (<TodoItem value={s}  id={i} destroy={this.delete}/>)
    //          );
    //        </div>;
  }
  click(e)
  {
    let t=e.target;
    if(t.className==="checkbox")
    {
      this.state.done[t.parentElement.id]=t.checked
      this.setState({done:this.state.done});
    }
    else if (t.className==="delete")
    {
      this.state.todoitems.splice(t.parentElement.id,1);
      this.setState({todoitems:this.state.todoitems});
      this.state.done.splice(t.parentElement.id,1);
      this.setState({done:this.state.done});
      // this.setState({todoitems: this.state.todoitems.filter((v, i) => i !== Number(t.parentElement.id))});
    }
  }
  display(d)
  {
    // this.setState({done:[...this.done,false]});
    this.setState({displaychoice:d} );
  }
  render() {
    return (
        <div>
          <input type="text" onKeyPress={this.push.bind(this)} /> 
          <div onClick={this.click}>{this.todoitems_construction()}</div>
          <CountDisplay display_filter={this.display}/>

        </div>
    );
  }
}



ReactDOM.render (
  <TodoApp/>,
  document.getElementById('root')
);
