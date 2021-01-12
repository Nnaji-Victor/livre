import { useAsync } from 'hooks/use-async';
import React from 'react'
import styled from 'styled-components'
import { theme } from 'styles';
import { client } from '_helpers/client';
import Loading from './Loading';
import {Link} from 'react-router-dom';

const TopPicks = ({user}) => {
    const {run, data, isError, isLoading, isIdle, isSuccess} = useAsync();

    React.useEffect(() => {
        run(client(`books?query=`, {token: user.token}))
    }, [run, user.token])

    const randBook = Math.floor(Math.random() * 10);
    const book = data?.books[randBook];

    return (
        <StyledToPicks>
            {isIdle || isLoading ? (<Loading />): null}
            {isSuccess ? (
                <StyledTopPickBook 
                aria-labelledby={book.id}
                to={`/book/${book.id}`}>
                    <div className="topPick-heading">Top Pick</div>
                    <div className="image-column">
                        <img src={book.coverImageUrl} alt=""/>
                    </div>
                    <div className="text-column">
                        <div className="name">{book.title}</div>
                        <div className="author">{book.author}</div>
                    </div>
                </StyledTopPickBook>
            ) : (null)}
            {isError ? (<div>error fetching book</div>) : null}
        </StyledToPicks>
    )
}

const TopPicksMemo = React.memo(TopPicks);

const StyledToPicks = styled.div`
    height: 500px;
    position: sticky;
    top: 6rem;
`;

const StyledTopPickBook = styled(Link)`
    display: block;
    background: ${theme.colors.grey};
    text-decoration: none;
    color: ${theme.colors.primary};

    &:hover{
        background: ${theme.colors.tertiary};
    }

    .topPick-heading{
        font-size: 3rem;
        font-weight: 700;
        text-align: center;
        padding: 1rem 0 3rem 0;
    }

    .text-column{
        margin-top: 2rem;
        padding: 0rem 2rem 3rem;

        .name{
            font-size: 1.5rem;
            font-weight: 700;
        }
    }

    img{
        max-width: 100%;
        height: auto;
        width: 90%;
        margin: 0 auto;
        display: block;
        object-fit: cover;
        text-align: center;
    }
`;

export default TopPicksMemo
