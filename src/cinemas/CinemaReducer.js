import Immutable from 'seamless-immutable';
import update from 'react-addons-update';

const initialState = Immutable({
    cities: [],
    city: {},
    cinema: {},
    cinemasLoaded: false
});

export default function cinema(state = initialState, action = {}) {
    var {payload} = action;
    switch (action.type) {
        case 'GET_CITIES_SUCCESS':
            return update(state, {
                cities: {$set: payload.cities},
                cinemasLoaded: {$set: true}
            });
        case 'SET_ACTIVE_CITY':
            return update(state, {
                city: {$set: payload.city}
            });
        case 'SET_ACTIVE_CINEMA':
            return update(state, {
                cinema: {$set: payload.cinema}
            });
        case 'FETCH_CINEMAS_START':
            return update(state, {
                cinemasLoaded: {$set: false}
            });
        default:
            return state;
    }
}
