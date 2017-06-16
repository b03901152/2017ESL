import React, { Component } from 'react';
import './Sales.css';

const socket = io.connect();
class Sales extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      rawDatas: {},
    };
    fetch( '/getCommodityDatas' )
      .then( res => res.json() )
      .then( res => {
        this.setState( {
          rawDatas: res.datas,
        } );
      } );
    socket.on( 'setTrade',() => {
      fetch( '/getCommodityDatas' )
        .then( res => res.json() )
        .then( res => {
          console.log('res.datas:',res.datas);
          this.setState( { rawDatas: res.datas } );
      } );
    } );
  }

  renderTbody = () => {
    if ( !this.state.rawDatas.time )
      return <div></div>
    let trades = [];
    for ( let i = 0; i < this.state.rawDatas.time.length; ++i ) {
      for ( let j = 0; j < this.state.rawDatas.time[ i ].length; ++j ) {
        let trade = [];
        trade.push( this.state.rawDatas.name[ i ] );
        trade.push( this.state.rawDatas.time[ i ][ j ] );
        trades.push( trade );
      }
    }
    let counter = 0;
    trades = trades.sort( ( i ,j ) => {
      console.log(i[1]);
      console.log(j[1]);
      console.log( new Date( i[ 1 ] ).getTime() );
      console.log( new Date( j[ 1 ] ).getTime() );
      console.log(new Date( i[ 1 ] ).getTime() > new Date( j[ 1 ] ).getTime() );
      console.log('\n'); 
      return new Date( i[ 1 ] ).getTime() > new Date( j[ 1 ] ).getTime();
    } );
    return <tbody> 
      {
        trades.map( ( trade, idx ) => <tr key = { idx }>
                <th scope="row">{ idx }</th>
                <td>{trade[0]}</td>
                <td>{trade[1]}</td>
                <td>1</td>
                <td>25$</td>
        </tr> )
      }
    </tbody>;
  };

  render() {
    return (
        <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Purchase Time</th>
              <th>Amount</th>
              <th>Sum money</th>
            </tr>
          </thead>
          { this.renderTbody() }
        </table>

          <button type="button" className="btn btn-default"
            onClick = { () => this.props.back( 'menu' ) } > Back
          </button>
        </div>
    );
  }
}

export default Sales;
