import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    Image,
    TextInput,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const {ToolbarAndroid} = Icon;
import Swiper from 'react-native-swiper';
var wHeight = Dimensions.get('window').height;
const contentHeight = parseInt(wHeight - 200);
import { Navigation } from 'react-native-navigation';

import { connect } from 'react-redux';
import * as cinemaActions from '../cinemas/CinemaActions';

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

class CinemaSearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searchResult: []
        }
    }
    componentDidMount() {
        this.props.dispatch(cinemaActions.getCitiesStart());
    }
    changeSearchText(text) {
        this.setState({search: text}, () => {
            var {cities} = this.props.cinema;
            
            var cinemas = cities.reduce((prev, current) => [...prev, ...current.theaters], []);
            if (this.state.search.length < 3) {
                this.setState({searchResult: []});
                return 
            }

            text = text.toLowerCase();
            cinemas = cinemas.filter(cinema => {
                if (cinema.name.toLowerCase().indexOf(text) !== -1) return true;
                if (cinema.city.toLowerCase().indexOf(text) !== -1) return true;
                return false;
            });
            
            this.setState({searchResult: cinemas});
        });
    }
    onCinemaSelected(cinema) {
        this.props.dispatch(cinemaActions.setActiveCinema(cinema));
        this.props.navigator.switchToTab({tabIndex: 2});
    }
    render() {
        var result = this.state.searchResult;
        var {cinema} = this.props.cinema;

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#831d19"
                    barStyle="light-content"
                    />
                <View style={styles.mainTab}>
                    <TextInput
                        style={[styles.textSearch, Platform.OS == 'ios' ? {height: 30, marginTop: 20} : {}]}
                        onChangeText={this.changeSearchText.bind(this)}
                        placeholder={'Type cinema name or city'}
                        placeholderTextColor={'#999'}
                        value={this.state.search}
                        autoFocus={true}
                        />
                </View>
                <View style={styles.content}>
                    
                    {result.length > 0 ?
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
                            key={this.state.search}
                            >
                            {result.map(item => (
                                <CinemaCard key={item.id} item={item} onCinemaSelected={this.onCinemaSelected.bind(this)} active={cinema.id == item.id} />
                            ))}
                            </Swiper>
                        : <CinemaCard />}

                </View>
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
        marginTop: -80
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
    textSearch: {
        color: '#fff'
    }
});

CinemaSearchPage = connect((state) => {
    return {
        cinema: state.cinema
    }
})(CinemaSearchPage);

export default CinemaSearchPage;