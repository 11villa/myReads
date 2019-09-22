import React from 'react';
import * as BooksAPI from './BooksAPI';
import ShowBooksBySelf from './ShowBooksBySelf'
import { Link } from 'react-router-dom'


class SearchBooks extends React.Component{

constructor(props){
    super(props);
    this.handleSearch=this.handleSearch.bind(this);
    this.handleAddShelf=this.handleAddShelf.bind(this);

    this.state=({
        /** matchedBooks is an array of the books serched and feth from backend API adding shelf ='none') */ 
        matchedBooks : []
    });
}



handleSearch(e){
    //call to API to fetch all the books matched
    BooksAPI.search(e.target.value)
    .then((returnedBooks) => {
        
        let formatedBooks=[];
        if(Array.isArray(returnedBooks)){
            //Format books adding the shelf property 
            returnedBooks.map((book)=>formatedBooks.push({...book, shelf: "none"} ));
        
        this.setState(() => ({
            matchedBooks: formatedBooks
        }
            
        ))
    }
    else{
        this.setState(() => ({
            matchedBooks: []
        }))
    }

  });
}
/** Handle add book to myBooks
 * Set onShelfChange for further actions
 * Delete book from the view setting state
 *  */
handleAddShelf(event, book){

    /**set (event,book) props function onShelfChange  */
    this.props.onShelfChange(event,book);
    let index=0;
    const returnedBooksNew = this.state.matchedBooks;
    
    for (const myBook of returnedBooksNew){
    
        if(myBook.id===book.id){
        returnedBooksNew.splice(index, 1);
        
        }
        index++;
    }
    this.setState({
    returnedBooks: returnedBooksNew
    });
}

render(){

    return( <div className="search-books">
    <div className="search-books-bar">
      
      <Link to='' className='create-book'><button className="close-search">Close</button></Link>

      <div className="search-books-input-wrapper">
        <input type="text" 
        placeholder="Search by title or author"
        onChange= {(e)=>this.handleSearch(e)}
        />

      </div>
    </div>
    <div className="search-books-results">
    <ShowBooksBySelf onShelfChange={this.handleAddShelf} myBooks={this.state.matchedBooks} shelf='none'/>

      <ol className="books-grid"></ol>
    </div>
  </div>)
}
}
export default SearchBooks