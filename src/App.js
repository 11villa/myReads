import React from 'react'
import './App.css'

import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import MyBooks from './MyBooks'

import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.handleShelfChange=this.handleShelfChange.bind(this);
    this.updateMyBooks=this.updateMyBooks.bind(this);
    /**myBooks is an array of the object books */
    this.state = {
      myBooks:[]
    };
  }
    componentDidMount() {

      BooksAPI.getAll()
      .then((myBooks) => {
        this.setState(() => ({
          myBooks
        }))
      })
  }


/** Setting state of mybooks updating the shelf or adding the book if it's not in myBooks*/
  updateMyBooks(book,newShelf){

    let index=0;
    let bookUpdated=false;
    const myBooksNew = this.state.myBooks;
    for (const myBook of myBooksNew){
      
      if(myBook.id===book.id){
       myBooksNew[index].shelf=newShelf;
       bookUpdated=true;
      }
      index++;
    }
    if(!bookUpdated){
      myBooksNew.push(book);
    }
    this.setState({
     myBooks: myBooksNew
   });

  }

/**Handle user event of changing shelf
  * Communicate to the backend via BooksAPI the self change
  * Call addMyBooks if you are adding a newBook or call updateMyBooks if you are updating a Shelf
*/

  handleShelfChange(event, book){
    const newShelf=event.target.value;

     BooksAPI.update(book,newShelf)
     .then(()=> {
      this.updateMyBooks(book,newShelf);
      })
  }
  render() {
    return (
      <div className="app">
        <Route path='/search' render ={ ()=> <SearchBooks onShelfChange={this.handleShelfChange} onAddBooks={this.updateMyBooks} myBooks={this.state.myBooks} /> } />
        <Route exact path='/' render={ () => <MyBooks onShelfChange={this.handleShelfChange} myBooks={this.state.myBooks}/> } />
      </div>
    )
  }
}

export default BooksApp
