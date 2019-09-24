import React from 'react'

//array of current shelves
const myShelves = [
  {id: 1, name:"currentlyReading",value:"Currently Reading"},
  {id: 2, name:"wantToRead",value:"Want to Read"},
  {id: 3, name:"read",value:"Read"},
  {id: 4, name:"none",value:"None"}
];


class ShowBooksBySelf extends React.Component{

  constructor(props){
    super(props)
    this.handleShelfChange=this.handleShelfChange.bind(this);
  }

/**Set funtion for further actions in parent component App */
  handleShelfChange(event, book){
    this.props.onShelfChange(event,book);
  }

render(props){

    return(<div className="bookshelf">
      {myShelves.filter((shelf)=>(this.props.shelf===shelf.name && shelf.name!=='none' ))
      .map(shelf =>  (<h2 key={shelf.id} className="bookshelf-title">{shelf.value} </h2>)) }
   
    <div className="bookshelf-books">
      <ol className="books-grid">
      {this.props.myBooks
    .filter(book => (book.shelf===this.props.shelf)|| this.props.shelf==='none')
      .map(book =>(
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (typeof book.imageLinks === "undefined") ? "":`url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select value={book.shelf}  onChange={(e) => this.handleShelfChange(e, book)} >
                <option value="move" disabled>Move to...</option>
                {myShelves.map(shelf => (<option key={shelf.id} value={shelf.name}>{shelf.value}</option>))}
                 </select> 
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </li>
        ))}
    </ol>
    </div>
    </div>
    )
   }
  }


export default ShowBooksBySelf