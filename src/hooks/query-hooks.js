import { useQuery, useQueryClient} from "react-query";
import { client } from "_helpers/client";
import PlaceHolder from "assets/PlaceHolder.svg";

const loadingBook = {
  title: "Loading...",
  author: "loading...",
  coverImageUrl: PlaceHolder,
  publisher: "Loading Publishing",
  synopsis: "Loading...",
  pageCount: "...loading",
  loadingBook: true,
};

const loadingBooks = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}));

const getBookSearchConfig = (query, user, queryCache) => ({
  queryKey: ["book-search", { query }],
  queryFn: () =>
      client(`books?query=${encodeURIComponent(query)}`, {
        token: user.token,
    }).then((data) => data.books),
    onSuccess(books){
      for(const book of books){
        queryCache.setQueryData(['book', {bookId: book.id}], book)
      }
    }
})

function useBookSearch(query, user) {
  const queryCache = useQueryClient();
  const result = useQuery(getBookSearchConfig(query, user, queryCache));

  return { ...result, books: result.data ? result.data : loadingBooks };
}

function useBook(bookId, user){
    const result = useQuery({
        queryKey: ['book', {bookId}],
        queryFn: () => client(`books/${bookId}`, {token: user.token}).then(data => data.book),
    });

    return {...result, book: result.data ?? loadingBook};
}

function useListItems(user){
    const { data: listItems } = useQuery({
        queryKey: "list-items",
        queryFn: () =>
          client(`list-items`, { token: user.token }).then(
            (data) => data.listItems
          ),
    });

    return listItems;
}

function useListItem(bookId, user){
    const listItems = useListItems(user);
    const listItem = listItems?.find(li => li.bookId === bookId) ?? null

    return listItem;
}

async function refetchBookSearchQuery(queryCache, user){
  queryCache.removeQueries('book-search');
  await queryCache.prefetchQuery(getBookSearchConfig('', user, queryCache))

}
export { useBookSearch , useBook, useListItems, useListItem, refetchBookSearchQuery};
