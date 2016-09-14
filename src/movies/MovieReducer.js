import Immutable from 'seamless-immutable';
import update from 'react-addons-update';

const initialState = Immutable({
    movies: {
        nowPlaying: [],
        comingSoon: []
    },
    movie: {},
    activeMovie: {},
    moviesLoaded: false
});

export default function movie(state = initialState, action = {}) {
    var {payload} = action;
    switch (action.type) {
        case 'GET_MOVIES_SUCCESS':
            return update(state, {
                movies: {$set: payload.movies},
                moviesLoaded: {$set: true}
            });
        case 'SET_MOVIE':
            return update(state, {
                movie: {$set: payload.movie}
            });
        case 'SET_ACTIVE_MOVIE':
            return update(state, {
                activeMovie: {$set: payload.movie}
            });
        case 'FETCH_MOVIES_START':
            return update(state, {
                moviesLoaded: {$set: false}
            });
        default:
            return state;
    }
}
