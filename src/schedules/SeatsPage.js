import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const {ToolbarAndroid} = Icon;
import { connect } from 'react-redux';
import * as scheduleActions from '../schedules/ScheduleActions';
import * as movieActions from '../movies/MovieActions';

import {iconsMap} from '../utils/AppIcons';
import ScheduleCard from './ScheduleCard';
var wWidth = Dimensions.get('window').width;

const navigatorStyle = {
    statusBarColor: '#831d19',
    navigationBarColor: '#831d19',
    navBarBackgroundColor: '#ad241f',
    navBarTextColor: '#ffffff',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light'
}

class SeatsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    formatDate(dateObj) {
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        return `${year}-${month}-${day}`;
    }
    onCinemaChange() {
        this.props.navigator.switchToTab({tabIndex: 1});
    }
    componentDidMount() {
        var {cinema} = this.props.cinema;
        var {activeMovie} = this.props.movie;
        var {format, time, seats, date} = this.props.schedule; 
        this.props.dispatch(scheduleActions.getSeatsStart(cinema.id, this.formatDate(date), activeMovie.id, format.format, time.time));
    }
    onMovieClick() {
        var {activeMovie} = this.props.movie;
        this.props.dispatch(movieActions.setMovie(activeMovie));
        this.props.navigator.push({
            screen: 'mobile21.MovieDetailPage',
            title: activeMovie.title,
            navigatorStyle
        });
    }
    getBoxVerticalStyle() {
        var {seats} = this.props.schedule;
        if (seats.length > 0 && seats[0].length > 0) {
            return [styles.boxWrapper, {width: wWidth - 20, height: seats.length * 35}];
        } else {
            return styles.boxWrapper;
        }   
    }
    getBoxHorizontalStyle() {
        var {seats} = this.props.schedule;
        if (seats.length > 0 && seats[0].length > 0) {
            return [styles.boxWrapper, {width: seats[0].length * 28, height: seats.length * 35}];
        } else {
            return styles.boxWrapper;
        }   
    }
    getBoxCardStyle(col) {
        var {seatSelected} = this.props.schedule;
        if (col.taken) return styles.boxCardDisable;
        if (col.label === '') return styles.boxCardEmpty;
        if (seatSelected.filter(seat => seat.label === col.label).length > 0) return styles.boxCardSelected;
        return styles.boxCard;
    }
    getBoxCardTextStyle(col) {
        var {seatSelected} = this.props.schedule;
        if (seatSelected.filter(seat => seat.label === col.label).length > 0) return styles.boxCardTextSelected;
        return styles.boxCardText;
    }
    onAddSeatSelected(col) {
        var {seatSelected} = this.props.schedule;
        if (seatSelected.filter(seat => seat.label === col.label).length > 0) {
            this.props.dispatch(scheduleActions.removeSeatSelected(col));
        } else {
            this.props.dispatch(scheduleActions.addSeatSelected(col));
        }
    }
    render() {
        var {cinema} = this.props.cinema;
        var {activeMovie} = this.props.movie;
        var {format, time, seats, seatsLoaded} = this.props.schedule; 
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.mainTab}>
                    </View>
                    <View style={styles.content}>
                        <ScheduleCard small={true} title="CINEMA" image={cinema.image} onImageClick={this.onCinemaChange.bind(this)}>
                            <Text style={styles.cardText}>{cinema.name} • {cinema.city && cinema.city.name}</Text>
                        </ScheduleCard>
                        <ScheduleCard small={true} title="MOVIE" image={activeMovie.image} onImageClick={this.onMovieClick.bind(this)}>
                            <Text style={styles.cardText}>{activeMovie.title}</Text>
                        </ScheduleCard>
                        <ScheduleCard small={true} title="SHOW TIME • PRICE" text={format.name}>
                            <Text style={styles.cardText}>{time.time} • {time.price}</Text>
                        </ScheduleCard>
                        <View style={styles.seats}>
                            <View style={styles.screen}>
                                <Text style={styles.screenText}>SCREEN</Text>
                            </View>
                            <ScrollView>
                                <View style={styles.scroll}>
                                    <View style={this.getBoxVerticalStyle()}>
                                        {seatsLoaded ?
                                            <ScrollView horizontal={true}>
                                                <View style={this.getBoxHorizontalStyle()}>
                                                    {seats.length > 0 && seats[0].length > 0 ?
                                                        seats.map((row, i) => {
                                                            return (
                                                                <View style={styles.boxRow} key={`row-${i}`}>
                                                                    {row.map((col, i) => {
                                                                        return (
                                                                            <TouchableOpacity key={`col-${i}`} onPress={this.onAddSeatSelected.bind(this, col)}>
                                                                                <View style={styles.box}>
                                                                                    <View style={this.getBoxCardStyle(col)}>
                                                                                        <Text style={this.getBoxCardTextStyle(col)}>{col.label}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        );
                                                                    })}
                                                                </View>
                                                            );
                                                        })
                                                        : null}
                                                </View>
                                            </ScrollView>
                                            : 
                                            <ActivityIndicator animating={true} size="large"/>}
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    mainTab: {
        backgroundColor: '#ad241f',
        height: 160,
        paddingTop: 5,
        paddingHorizontal: 10,
        paddingBottom: 80,
        flexDirection: 'row',
    },
    content: {
        backgroundColor: 'transparent',
        marginTop: -150
    },
    seats: {
        height: 300,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginBottom: 8,
        borderRadius: 4
    },
    boxWrapper: {
        width: 200,
        height: 200,
    },
    box: {
        width: 28,
        height: 35,
        // borderWidth: 1,
        // borderColor: '#ddd'
    },
    screen: {
        marginVertical: 8
    },
    screenText: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 10
    },
    cardText: {
        color: '#000'
    },
    boxRow: {
        flexDirection: 'row'
    },
    boxCard: {
        margin: 1,
        flex: 1,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#ad241f',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxCardDisable: {
        margin: 1,
        flex: 1,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#ad241f',
        backgroundColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxCardSelected: {
        margin: 1,
        flex: 1,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#ad241f',
        backgroundColor: '#ad241f',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxCardEmpty: {
        margin: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    boxCardText: {
        textAlign: 'center',
        fontSize: 9,
        color: '#ad241f',
        fontWeight: '900'
    },
    boxCardTextSelected: {
        textAlign: 'center',
        fontSize: 9,
        color: '#fff',
        fontWeight: '900'
    }
});

SeatsPage = connect((state) => {
    return {
        schedule: state.schedule,
        cinema: state.cinema,
        movie: state.movie
    }
})(SeatsPage);

export default SeatsPage;