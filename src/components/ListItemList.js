import React from 'react'
import BookRow from './BookRow';
import {BookSearchResult} from 'Pages/Discover';
import { useListItems } from 'hooks/query-hooks';

const ListItemList = ({
  filterListItems,
  noListItems,
  noFilteredListItems,
}) => {

   const listItems = useListItems();
  
  const filteredListItems = listItems?.filter(filterListItems)
  
  if (!listItems?.length){
      return <div className="initial-book-header">{noListItems}</div>
  }
  if(!filteredListItems.length){
    return <div className="initial-book-header">{noFilteredListItems}</div>
  }

  return (
      <BookSearchResult>
        {filteredListItems.map(listItem => (
            <div className={`x ${filteredListItems.length < 3 ? "two-books" : null}`} key={listItem.id}>
                <BookRow book={listItem.book} />
            </div>
        ))}
      </BookSearchResult>
  )
};

export default ListItemList
