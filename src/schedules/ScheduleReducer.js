import Immutable from 'seamless-immutable';
import update from 'react-addons-update';

const initialState = Immutable({
    schedules: {},
    schedulesLoaded: false,
    // schedule: {},
    // time: {},
    // seats: [],
    // seatsLoaded: false,
    // date: new Date(),
    // seatSelected: [],
    // schedulesLoaded: false
});

export default function schedule(state = initialState, action = {}) {
    var {payload} = action;
    switch (action.type) {
        case 'GET_SCHEDULES_SUCCESS':
            return update(state, {
                schedulesLoaded: {$set: true},
                schedules: {$set: payload.schedules}
            });
        case 'FETCH_FORMATS_START':
            return update(state, {
                schedules: {$set: []},
                schedulesLoaded: {$set: false}
            });
        // case 'SET_ACTIVE_SCHEDULE':
        //     return update(state, {
        //         schedule: {$set: payload.schedule}
        //     });
        // case 'SET_ACTIVE_TIME':
        //     return update(state, {
        //         time: {$set: payload.time}
        //     });
        // case 'GET_SEATS_SUCCESS':
        //     return update(state, {
        //         seats: {$set: payload.seats},
        //         seatsLoaded: {$set: true}
        //     });
        // case 'SET_ACTIVE_DATE':
        //     return update(state, {
        //         date: {$set: payload.date}
        //     });
        // case 'FETCH_SEATS_START':
        //     return update(state, {
        //         seats: {$set: []},
        //         seatSelected: {$set: []},
        //         seatsLoaded: {$set: false}
        //     });
        // case 'ADD_SEAT_SELECTED':
        //     return update(state, {
        //         seatSelected: {$apply: (seats) => [...seats, payload.seat]}
        //     });
        // case 'REMOVE_SEAT_SELECTED':
        //     return update(state, {
        //         seatSelected: {$apply: (seats) => seats.filter(seat => seat.label !== payload.seat.label)}
        //     });
        default:
            return state;
    }
}
