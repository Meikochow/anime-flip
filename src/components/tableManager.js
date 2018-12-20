import React, { Component } from 'react'
import Tile from './tile';

const win = require('../introImages/win.gif');

const konoha = require('../backFaceImages/konoha.jpg');
const hero = require('../backFaceImages/hero.jpg');
const onePiece = require('../backFaceImages/onePiece.jpg');
const berserk = require('../backFaceImages/berserk.jpg')

const narutoTable = require('../tables/narutoTable').default;
const heroTable =require('../tables/heroTable').default;
const onePieceTable = require('../tables/onePieceTable').default;
const berserkTable =require('../tables/berserkTable').default;

class TableManager extends Component {
    constructor(props){
        super(props);
        this.state={
            charactersPool:[],
            selected:[],
            backFace:konoha,
            winGame:false
        }
     }
    componentWillMount(){
        this.selectCharactersPool(this.props.tableName);
    }
    componentDidMount(){
        this.randomize();
    }
    selectCharactersPool = (tableName) => {
        switch (tableName){
            case 'narutoTable':
                return(
                    this.setState({
                        charactersPool:narutoTable,
                        backFace:konoha
                    })
                );
            case 'heroTable':
                return( 
                    this.setState({
                        charactersPool:heroTable,
                        backFace:hero
                    })
                )
            case 'onePieceTable':
                return(
                    this.setState({
                        charactersPool:onePieceTable,
                        backFace:onePiece
                    })
                );
            case 'berserkTable':
                return( this.setState({
                    charactersPool:berserkTable,
                    backFace:berserk
                })
                )
            default:return(
                this.setState({
                    charactersPool:narutoTable,
                    backFace:konoha
                })
            );
        }

    }
    randomize(){
        let oldOrder = this.state.charactersPool;
        let newOrder=[];
        let oldOrderLength = oldOrder.length;
        for(let i=0;i<oldOrderLength;i++){
            let index = this.getRandom(oldOrder.length);
            newOrder.push(oldOrder[index]);
            oldOrder.splice(index,1);
        }
        this.setState({
            charactersPool:newOrder
        })
    }
tileHandle = (id) => {
this.flipTile(id);
this.checkTiles(id);
} 
flipTile = (id) => {
    let stateObjId = id.substr(id.length-3,id.length-1);
    let arr = this.state.charactersPool;
    arr.map((character)=>{
        if(character.id === stateObjId){
          character.class="tile flipped";  
        }
        return arr;
    })
    this.setState({
        charactersPool:arr
    })
}
checkTiles = (id) => {
    let image = id.substr(0,id.length-3);
    let imageId = id.substr(id.length-3,id.length-1);
    if(this.state.selected.length===0){
        let firstSelect = {image:image,imageId:imageId}
        this.setState({
            selected:firstSelect
        })
    }else{
        if(this.state.selected.image===image&&this.state.selected.imageId === imageId){
           this.unflipOneTile(imageId);
        }else if(this.state.selected.image===image&&this.state.selected.imageId !== imageId){
                 setTimeout(()=>{
                  this.removeTiles(image);
                 },1000);
        }else{
             setTimeout(()=>{
                this.unflipTiles(imageId, this.state.selected.imageId);
             },1000);
            
        }
    }
}
unflipOneTile = (id) =>{
    let arr = this.state.charactersPool;
    arr.map((character)=>{
        if(character.id===id){
            character.class="tile"
        }
        return arr;
    })
    this.setState({
        selected:[]
    })
}
unflipTiles = (id1,id2) => {
    let arr = this.state.charactersPool;
    arr.map((character)=>{
        if(character.id===id1||character.id===id2){
            character.class="tile"
        }
         return arr;
    })
this.setState({
    charactersPool:arr,
    selected:[]
})

}
removeTiles = (name) => {
let newPool = this.state.charactersPool;
newPool.map((character)=>{
    if(character.name===name){
        character.class="solved";
    }
    return newPool;
})
this.setState({
    charactersPool:newPool,
    selected:[]
})
this.checkWin();
}
getRandom = (num=1) =>{
return Math.floor(Math.random()*num);
}   
checkWin = () => {
let win = this.state.charactersPool.filter(character => character.class.includes('tile'));
if(win.length===0){
    this.setState({
        winGame:true
    })
}
}
backToMenu = () => {
    window.location.reload();
}
  render() {
      let winClass = this.state.winGame?"win":"notYet";
    return (

      <div>
          {this.state.charactersPool.map((character,i)=>{
              return <Tile 
              link={character.link} 
              key={i} 
              id={character.name+character.id} 
              className={character.name+" "+character.class}
              click={this.tileHandle}
              backFace={this.state.backFace}
              />
          })
          }
            <div className={winClass}>
              <p className="youWin" style={{'backgroundImage':'url('+win+')'}}>You Win</p>
            </div>
          <button onClick={this.backToMenu} className="backToMenu">Return to menu</button>
      </div>
    )
  }
}

export default TableManager;