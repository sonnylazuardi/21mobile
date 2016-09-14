var client = require('../utils/GraphQLClient')();
import update from 'react-addons-update';

export function getMoviesStart() {
    return async function(dispatch, getState) {
        var query = `{
            cinema21NowPlaying {
                id
                title
                director
                genre
                image
                rating
                description
                trailer
                posterImage
            }
            cinema21ComingSoon {
                id
                title
                director
                genre
                image
                rating
                description
                trailer
                posterImage
            }
        }`;
        dispatch(fetchMoviesStart());
        client.query(query).then(function(body) {
            var movies = {
                nowPlaying: body.data.cinema21NowPlaying,
                comingSoon: body.data.cinema21ComingSoon
            };
            dispatch(getMoviesSuccess(movies));
        })
        .catch(function(err) {
            alert('Error fetching data');
            console.log(err.message)
        })
    }
}

export function getMoviesSuccess(movies) {
    return {
        type: 'GET_MOVIES_SUCCESS',
        payload: {
            movies
        }
    }
}

export function setMovie(movie) {
    return {
        type: 'SET_MOVIE',
        payload: {
            movie
        }
    }
}

export function setActiveMovie(movie) {
    return {
        type: 'SET_ACTIVE_MOVIE',
        payload: {
            movie
        }
    }
}

export function fetchMoviesStart() {
    return {
        type: 'FETCH_MOVIES_START'
    }
}