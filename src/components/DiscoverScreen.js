import React from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion';
import BookRow from './BookRow';
import TopPicks from './TopPicks';
import { media } from 'styles';

const DiscoverScreen = ({data, isSuccess, isIdle}) => {
    return (
      <StyledDiscoverScreen>
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          className="discover-contents"
          variants={{
            initial: { y: 7, opacity: 0 },
            exit: {
              y: 5,
              opacity: 0,
              transition: {
                y: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
              },
            },
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.9,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 1.0,
              },
            },
          }}
        >
          {isIdle && <BookSearchResult><div>Books on screen initially</div></BookSearchResult>}
          {isSuccess ? data?.books?.length ? (
          <BookSearchResult>
            {data.books.map(book => (
                <div className="x" key={book.id}><BookRow book={book} /></div>
            ))}
          </BookSearchResult>
          ) : (<div>no books found</div>) : null}
          <TopPickResult>
            <TopPicks />
          </TopPickResult>
        </motion.div>
      </StyledDiscoverScreen>
    );
}

const StyledDiscoverScreen = styled.div`
    margin-top: 3rem;
    .discover-contents{
        display: grid;
        grid-template-columns: 2.5fr 1fr;
        column-gap: 2rem;

        ${media.phablet`grid-template-columns: 1fr;`}
    }

`;


const BookSearchResult = styled.div`   
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;

    .x{
        width: 50%;
        ${media.phablet`width: 100%; `}
        ${media.tablet`min-height: 250px`};
        ${media.phone`min-height: 220px`};

        &:nth-child(1n){
            background-color: #FBC164;
        }
        &:nth-child(2n + 1){
            background-color: #F1CECD;
        }

        &:nth-child(3n + 1){
            background-color: #ECE7E9;
        }
        &:nth-child(4n + 1){
            background-color: #D0E3E8;
        }
        &:nth-child(5n){
            background-color: #ffebf5;
        }
        &:nth-child(6n){
            background-color: #f0faf9;
        }

        &:only-child{
            align-self: flex-start;
        }
    }

    ${media.phablet`flex-direction: column`}
`;

const TopPickResult = styled.div`
    background: brown;
    height: 500px;
`;

export default DiscoverScreen