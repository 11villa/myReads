import React from 'react'
import ShowBooksBySelf from './ShowBooksBySelf'
import { Link } from 'react-router-dom'

class MyBooks extends React.Component{

    constructor(props){
        super(props);
        this.handleShelfChange=this.handleShelfChange.bind(this);
    }

    handleShelfChange(event, book){
        this.props.onShelfChange(event,book);
      }

    render(){
        return(<div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <ShowBooksBySelf onShelfChange={this.handleShelfChange} myBooks={this.props.myBooks} shelf='currentlyReading'/>
            <ShowBooksBySelf onShelfChange={this.handleShelfChange} myBooks={this.props.myBooks} shelf='wantToRead'/>
            <ShowBooksBySelf onShelfChange={this.handleShelfChange} myBooks={this.props.myBooks} shelf='read'/>

          </div>
        </div>
        <div className="open-search">
        
          <Link to='create' className='open-search'><button>Add a book</button></Link>
          
        </div>
      </div>);
    }
}

export default MyBooks