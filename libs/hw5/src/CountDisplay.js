import React, { Component } from 'react';

class CountDisplay extends Component {
  constructor(props){
    super(props);
    this.state={
    };
  }
  render()
  {
    return(
    <div>
        <button type="button" className="display" onClick={()=>this.props.display_filter("All")}>Display All</button>
        <button type="button" className="display" onClick={()=>this.props.display_filter("Completed")}>Completed</button>
        <button type="button" className="display" onClick={()=>this.props.display_filter("Actived")}>Actived</button>
    </div>);
  };

}

module.exports=CountDisplay;