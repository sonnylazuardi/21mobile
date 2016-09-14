var client = require('../utils/GraphQLClient')();
import update from 'react-addons-update';

export function getSchedulesStart(cinemaId, movieId) {
    return async function(dispatch, getState) {
        var query = `{
            cinema21Schedule (cinemaId: "${cinemaId}", movieId: "${movieId}") {
                movie {
                    times {
                        time
                    }
                }
            }
        }`;
        dispatch(fetchSchedulesStart());
        client.query(query).then(function(body) {
            var schedules = body.data.cinema21Schedule;
            dispatch(getSchedulesSuccess(schedules));
        })
        .catch(function(err) {
            alert('Error fetching data');
            console.log(err.message)
        })
    }
}

export function fetchSchedulesStart() {
    return {
        type: 'FETCH_SCHEDULES_START'
    }
}

export function getSchedulesSuccess(schedules) {
    return {
        type: 'GET_SCHEDULES_SUCCESS',
        payload: {
            schedules
        }
    }
}

// export function fetchSeatsStart() {
//     return {
//         type: 'FETCH_SEATS_START'
//     }
// }

// export function setActiveTime(time, format) {
//     return {
//         type: 'SET_ACTIVE_TIME',
//         payload: {
//             time,
//             format
//         }
//     }
// }

// export function setActiveDate(date) {
//     return {
//         type: 'SET_ACTIVE_DATE',
//         payload: {
//             date
//         }
//     }
// }

// export function getSeatsStart(cinemaId, date, movieId, format, time) {
//     return async function(dispatch, getState) {
//         var query = `{
//             schedule (cinemaId: "${cinemaId}", date: "${date}") {
//                 movies (id: "${movieId}") {
//                     formats (format: "${format}") {
//                         times (time: "${time}") {
//                             seat {
//                                 label
//                                 taken
//                             }
//                         }
//                     }
//                 }
//             }
//         }`;
//         dispatch(fetchSeatsStart());
//         client.query(query).then(function(body) {
//             var movie, format, time, seat;
//             movie = body.data.schedule.movies[0];
//             if (movie)
//                 format = movie.formats[0];
//             if (format)
//                 time = format.times[0];
//             if (time)
//                 seat = time.seat;
//             if (seat) {
//                 dispatch(getSeatsSuccess(seat));
//             } else {
//                 dispatch(getSeatsSuccess([]));
//             }
//         })
//         .catch(function(err) {
//             alert('Error fetching data');
//             console.log(err.message)
//         })
//     }
// }

// export function getSeatsSuccess(seats) {
//     return {
//         type: 'GET_SEATS_SUCCESS',
//         payload: {
//             seats
//         }
//     }
// }

// export function addSeatSelected(seat) {
//     return {
//         type: 'ADD_SEAT_SELECTED',
//         payload: {
//             seat
//         }
//     }
// }

// export function removeSeatSelected(seat) {
//     return {
//         type: 'REMOVE_SEAT_SELECTED',
//         payload: {
//             seat
//         }
//     }
// }