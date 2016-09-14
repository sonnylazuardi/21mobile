import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    Image,
    Picker,
    ScrollView,
    Platform
} from 'react-native';
const Item = Picker.Item;
import Icon from 'react-native-vector-icons/Ionicons';
import Toolbar from '../app/Toolbar';
import Swiper from 'react-native-swiper';
var wHeight = Dimensions.get('window').height;
const contentHeight = parseInt(wHeight - 200);
import { Navigation } from 'react-native-navigation';

import { connect } from 'react-redux';
import * as cinemaActions from '../cinemas/CinemaActions';
import * as scheduleActions from '../schedules/ScheduleActions';

import {iconsMap} from '../utils/AppIcons';
import CinemaCard from './CinemaCard';

const navigatorStyle = {
    statusBarColor: '#831d19',
    navigationBarColor: '#831d19',
    navBarBackgroundColor: '#ad241f',
    navBarTextColor: '#ffffff',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light'
}

class CinemasPage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(cinemaActions.getCitiesStart());
    }
    onActionSelected(position) {
        if (position === 0) {
            this.onRefresh();
        } else if (position === 1) {
            this.props.navigator.push({
                screen: 'mobile21.CinemaSearchPage',
                title: 'SEARCH CINEMAS',
                navigatorStyle
            });
        } else if (position === 2) {
            this.props.navigator.push({
                screen: 'mobile21.AboutPage',
                title: 'ABOUT',
                navigatorStyle
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.cinema.cities !== nextProps.cinema.cities) {
            var {city, cities} = nextProps.cinema;
            if (!city.city) {
                this.props.dispatch(cinemaActions.setActiveCity(cities.filter(city => city.city == 'Bandung')[0]));
            }
        }
    }
    onCitySelected(value) {
        var {cities} = this.props.cinema;
        this.props.dispatch(cinemaActions.setActiveCity(cities.filter(city => city.city == value)[0]));
    }
    onCinemaSelected(cinema) {
        this.props.dispatch(cinemaActions.setActiveCinema(cinema));
        this.props.navigator.switchToTab({tabIndex: 2});
    }
    onRefresh() {
        this.props.dispatch(cinemaActions.getCitiesStart());
    }
    render() {
        var {cities, city, cinema} = this.props.cinema;

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#831d19"
                    barStyle="light-content"
                    />
                <Toolbar
                    title="THEATERS"
                    style={styles.toolbar}
                    titleColor={'#fff'}
                    actions={[
                        {title: 'Refresh', iconName: 'md-refresh', iconColor: '#fff', show: 'always'},
                        {title: 'Search', iconName: 'md-search', iconColor: '#fff', show: 'always'},
                        {title: 'More Actions', iconName: 'md-more', iconColor: '#fff', show: 'always'},
                    ]}
                    onActionSelected={this.onActionSelected.bind(this)} />
                <ScrollView>
                    <View style={styles.mainTab}>
                        <Picker
                            style={Platform.OS == 'android' ? styles.picker : styles.pickerIOS}
                            itemStyle={{color: '#fff', fontSize: 16}}
                            selectedValue={city.city}
                            onValueChange={this.onCitySelected.bind(this)}>
                            {cities.map(city => {
                                return (
                                    <Item key={city.city} label={city.city} value={city.city} />
                                );
                            })}
                        </Picker>
                    </View>
                    <View style={styles.content}>
                        
                        {city.theaters && city.theaters.length > 0 ?
                            <Swiper 
                                style={styles.wrapper} 
                                showsButtons={false}
                                height={contentHeight}
                                dot={<View style={{backgroundColor:'rgba(255,255,255,.3)', width: 10, height: 10, borderRadius: 5, marginLeft: 3, marginRight: 3,}} />}
                                activeDot={<View style={{backgroundColor: '#fff', width: 12, height: 12, borderRadius: 6, marginLeft: 4, marginRight: 4}} />}
                                paginationStyle={{
                                    bottom: 40,
                                }}
                                loop={true}
                                key={city.city}
                                >
                                {city.theaters.map(item => (
                                    <CinemaCard key={item.id} item={item} onCinemaSelected={this.onCinemaSelected.bind(this)} active={cinema.id == item.id} />
                                ))}
                                </Swiper>
                            : <CinemaCard />}

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
        paddingHorizontal: 24,
        paddingBottom: 50
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#fff'
    },
    tab: {
        flex: 1,
    },
    tabWrapper: {
        padding: 12
    },
    innerTab: {
        height: 60,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        color: '#fff',
        textAlign: 'center'
    },
    content: {
        backgroundColor: 'transparent',
        flex: 1,
        marginTop: Platform.OS == 'android' ? -80 : -60
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
        color: '#fff'
    },
    pickerIOS: {
        height: 100,
        marginTop: -60,
    },
    pickerItem: {

    }
});

CinemasPage = connect((state) => {
    return {
        cinema: state.cinema
    }
})(CinemasPage);

export default CinemasPage;