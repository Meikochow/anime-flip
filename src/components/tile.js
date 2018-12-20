import React, { Component } from 'react'

 class Tile extends Component {
  handleClick=()=>{
    this.props.click(this.props.id)
  }
  render() {
    return (
      <div className="backFace" style={{'backgroundImage':'url('+this.props.backFace+')'}}>
      <img 
      className={this.props.className} 
      src={this.props.link} 
      id={this.props.id} 
      onClick={this.handleClick} 
      alt="prop"
      draggable="false"
       />
      </div>
    )
  }
}

export default Tile;