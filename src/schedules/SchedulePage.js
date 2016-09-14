import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Image,
    Picker,
    ScrollView,
    ActivityIndicator,
    Platform
} from 'react-native';
const Item = Picker.Item;
import Icon from 'react-native-vector-icons/Ionicons';
import Toolbar from '../app/Toolbar';
import Swiper from 'react-native-swiper';
var wHeight = Dimensions.get('window').height;
const contentHeight = parseInt(wHeight - 200);

import { connect } from 'react-redux';
import * as scheduleActions from '../schedules/ScheduleActions';
import * as movieActions from '../movies/MovieActions';

import {iconsMap} from '../utils/AppIcons';
import ScheduleCard from './ScheduleCard';

const navigatorStyle = {
    statusBarColor: '#831d19',
    navigationBarColor: '#831d19',
    navBarBackgroundColor: '#ad241f',
    navBarTextColor: '#ffffff',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light'
}

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

class SchedulePage extends Component {
    constructor(props) {
        super(props);
    }
    // formatDate(dateObj) {
    //     var month = dateObj.getUTCMonth() + 1;
    //     var day = dateObj.getUTCDate();
    //     var year = dateObj.getUTCFullYear();
    //     return `${year}-${month}-${day}`;
    // }
    getMonthName(dateObj) {
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return month[dateObj.getMonth()];
    }
    getDayName(dateObj) {
        var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return weekday[dateObj.getDay()];
    }
    componentDidMount() {
        if (this.props.cinema.cinema && this.props.movie.activeMovie) {
            this.updateSchedules(this.props.cinema.cinema, this.props.movie.activeMovie);
        }
    }
    updateSchedules(cinema, movie) {
        this.props.dispatch(scheduleActions.getSchedulesStart(cinema.id, movie.id));
    }
    componentWillReceiveProps(nextProps) {
        var {cinema} = this.props.cinema;
        var {activeMovie} = this.props.movie;
        var {date} = this.props.schedule;

        if (cinema !== nextProps.cinema.cinema || activeMovie !== nextProps.movie.activeMovie) {
            if (nextProps.cinema.cinema && nextProps.movie.activeMovie) {
                this.updateSchedules(nextProps.cinema.cinema, nextProps.movie.activeMovie);
            }
        }
    }
    onActionSelected(position) {
        if (position === 0) {
            this.onRefresh();
        } else if (position === 1) {
            this.props.navigator.push({
                screen: 'mobile21.AboutPage',
                title: 'ABOUT',
                navigatorStyle
            });
        }
    }
    getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
        dateArray.push(currentDate)
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }
    // getTabWrapperStyle(date) {
    //     if (this.formatDate(date) === this.formatDate(this.props.schedule.date)) {
    //         return [styles.tabWrapper, styles.activeTab];
    //     } else {
    //         return styles.tabWrapper
    //     }
    // }
    changeDate(date) {
        this.props.dispatch(scheduleActions.setActiveDate(date));
    }
    onActiveMovieChange(value) {
        var {nowPlaying, comingSoon} = this.props.movie.movies;
        var movies = [...nowPlaying, ...comingSoon];
        var movie = movies.filter(movie => movie.id == value)[0];
        this.props.dispatch(movieActions.setActiveMovie(movie));
    }
    onCinemaChange() {
        this.props.navigator.switchToTab({tabIndex: 1});
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
    // onTimeSelected(time, format) {
    //     this.props.dispatch(scheduleActions.setActiveTime(time, format));
    //     this.props.navigator.push({
    //         screen: 'mobile21.SeatsPage',
    //         title: 'SEATS',
    //         navigatorStyle
    //     });
    // }
    // getTimeButtonStyle(time) {
    //     if (!time.active) return styles.buttonDisable;
    //     return styles.button;
    // }
    onRefresh() {
        this.updateSchedules(this.props.cinema.cinema, this.props.movie.activeMovie);
    }
    render() {
        // var today = new Date();
        // var dates = this.getDates(today, today.addDays(4));
        var {cinema} = this.props.cinema;
        var {activeMovie} = this.props.movie;
        var {schedules, schedulesLoaded} = this.props.schedule;

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#831d19"
                    barStyle="light-content"
                    />
                <Toolbar
                    title="SCHEDULES"
                    style={styles.toolbar}
                    titleColor={'#fff'}
                    actions={[
                        {title: 'Refresh', iconName: 'md-refresh', iconColor: '#fff', show: 'always'},
                        {title: 'More Actions', iconName: 'md-more', iconColor: '#fff', show: 'always'},
                    ]}
                    onActionSelected={this.onActionSelected.bind(this)} />
                <ScrollView>
                    <View style={styles.mainTab}>
                    </View>
                    <View style={styles.content}>
                        <ScheduleCard title="CINEMA" action={true} image={cinema.image} onImageClick={this.onCinemaChange.bind(this)} onChangeClick={this.onCinemaChange.bind(this)}>
                            <Text style={styles.cardText}>{cinema.name} • {cinema.city}</Text>
                        </ScheduleCard>
                        <ScheduleCard title="MOVIE" action={false} image={activeMovie.image} onImageClick={this.onMovieClick.bind(this)} large={Platform.OS == 'ios'}>
                            <Picker
                                style={Platform.OS == 'android' ? styles.picker : styles.pickerIOS}
                                itemStyle={{color: '#222', fontSize: 16}}
                                selectedValue={activeMovie.id}
                                onValueChange={this.onActiveMovieChange.bind(this)}>
                                {cinema.movies ? 
                                    cinema.movies.map(movie => {
                                        return <Item key={movie.id} label={movie.title} value={movie.id} />
                                    })
                                    : null}
                            </Picker>
                        </ScheduleCard>
                        <Swiper 
                            style={styles.wrapper} 
                            showsButtons={false}
                            height={185}
                            dot={<View style={{backgroundColor:'rgba(255,255,255,.3)', width: 10, height: 10, borderRadius: 5, marginLeft: 3, marginRight: 3,}} />}
                            activeDot={<View style={{backgroundColor: '#fff', width: 12, height: 12, borderRadius: 6, marginLeft: 4, marginRight: 4}} />}
                            paginationStyle={{
                                bottom: 0,
                            }}
                            loop={true}
                            key={`${cinema.id}-${activeMovie.id}`}
                            >
                            {schedulesLoaded && schedules.movie ?
                                <ScheduleCard title={"SHOW TIME"} action={false} large={true}>
                                    <View style={styles.buttons}>
                                        {schedules.movie.times.map(time => {
                                            return (
                                                <TouchableOpacity key={time.time}>
                                                    <View style={styles.button}>
                                                        <Text style={styles.buttonText}>
                                                            {time.time}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                    <Text style={styles.cardSmall}>{cinema.tickets}</Text>
                                </ScheduleCard>
                                : <ActivityIndicator animating={true} size="large"/>}
                        </Swiper>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    toolbar: {
        height: 60,
        backgroundColor: '#ad241f',
    },
    mainTab: {
        backgroundColor: '#ad241f',
        height: 160,
        paddingTop: 5,
        paddingHorizontal: 10,
        paddingBottom: 80,
        flexDirection: 'row',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#fff'
    },
    tab: {
        flex: 1
    },
    tabWrapper: {
        padding: 12,
    },
    innerTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 9
    },
    tabHeadline: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15
    },
    content: {
        backgroundColor: 'transparent',
        flex: 1,
        marginTop: -150
    },
    wrapper: {
    },
    tabContent: {
        
    },
    tabContentInactive: {
        position: 'absolute',
        top: -1000,
        left: -1000,
        height: 0,
        opacity: 0,
    },
    picker: {
        
    },
    pickerIOS: {
        height: 80,
        marginTop: -60
    },
    cardText: {
        color: '#000'
    },
    cardSmall: {
        fontSize: 11,
        marginTop: 10
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ad241f',
        marginTop: 8,
        borderRadius: 3,
        marginRight: 7,
    },
    buttonDisable: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ad241f',
        marginTop: 8,
        borderRadius: 3,
        marginRight: 7,
        backgroundColor: '#999'
    },
    buttonText: {
        fontSize: 13,
        textAlign: 'center',
        color: '#ad241f',
        fontWeight: '900'
    },
});

SchedulePage = connect((state) => {
    return {
        schedule: state.schedule,
        cinema: state.cinema,
        movie: state.movie
    }
})(SchedulePage);

export default SchedulePage;