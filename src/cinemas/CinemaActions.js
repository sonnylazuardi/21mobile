var client = require('../utils/GraphQLClient')();
import update from 'react-addons-update';

export function getCitiesStart() {
    return async function(dispatch, getState) {
        var query = `{
            cinema21Cities {
                city
                theaters {
                    id
                    city
                    name
                    image
                    tickets
                    address
                    movies {
                        id
                        title
                    }
                }
            }
        }`;
        dispatch(fetchCinemasStart());
        client.query(query).then(function(body) {
            var cities = body.data.cinema21Cities;
            dispatch(getCitiesSuccess(cities));
        })
        .catch(function(err) {
            alert('Error fetching data');
            console.log(err.message)
        })
    }
}

export function getCitiesSuccess(cities) {
    return {
        type: 'GET_CITIES_SUCCESS',
        payload: {
            cities
        }
    }
}

export function setActiveCity(city) {
    return {
        type: 'SET_ACTIVE_CITY',
        payload: {
            city
        }
    }
}

export function setActiveCinema(cinema) {
    return {
        type: 'SET_ACTIVE_CINEMA',
        payload: {
            cinema
        }
    }
}

export function fetchCinemasStart() {
    return {
        type: 'FETCH_CINEMAS_START'
    }
}

