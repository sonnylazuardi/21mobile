import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Image,
    ScrollView,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// const {ToolbarAndroid} = Icon;
import Swiper from 'react-native-swiper';
var wHeight = Dimensions.get('window').height;
const contentHeight = parseInt(wHeight - 200);
import { Navigation } from 'react-native-navigation';

import { connect } from 'react-redux';
import * as movieActions from '../movies/MovieActions';

import {iconsMap} from '../utils/AppIcons';
import MovieCard from './MovieCard';
import Toolbar from '../app/Toolbar';

const navigatorStyle = {
    statusBarColor: '#831d19',
    navigationBarColor: '#831d19',
    navBarBackgroundColor: '#ad241f',
    navBarTextColor: '#ffffff',
    navBarButtonColor: '#ffffff',
    statusBarTextColorScheme: 'light'
}

class MoviesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieState: 'nowPlaying'
        }
    }
    componentDidMount() {
        this.props.dispatch(movieActions.getMoviesStart());
    }
    toggleMovies(state) {
        this.setState({
            movieState: state
        });
    }
    getTabWrapperStyle(tab) {
        if (tab == this.state.movieState) {
            return [styles.tabWrapper, styles.activeTab];
        } else {
            return styles.tabWrapper
        }
    }
    getTabContentStyle(tab) {
        if (tab == this.state.movieState) {
            return styles.tabContent;
        } else {
            return [styles.tabContent, styles.tabContentInactive];
        }
    }
    openDetail(movie) {
        this.props.dispatch(movieActions.setMovie(movie));
        this.props.navigator.push({
            screen: 'mobile21.MovieDetailPage',
            title: movie.title,
            navigatorStyle
        });
    }
    onActionSelected(position) {
        if (position === 0) {
            this.onRefresh();
        } else if (position === 1) {
            this.props.navigator.push({
                screen: 'mobile21.MovieSearchPage',
                title: 'SEARCH MOVIES',
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
    onMovieSelected(movie) {
        this.props.dispatch(movieActions.setActiveMovie(movie));
        this.props.navigator.switchToTab({tabIndex: 1});
    }
    onRefresh() {
        this.props.dispatch(movieActions.getMoviesStart());
    }
    render() {
        var {movies} = this.props.movie;

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#831d19"
                    barStyle="light-content"
                    />
                <Toolbar
                    title="21MOBILE"
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
                        <TouchableOpacity style={styles.tab} onPress={this.toggleMovies.bind(this, 'nowPlaying')}>
                            <View style={styles.innerTab}>
                                <View style={this.getTabWrapperStyle('nowPlaying')}>
                                    <Text style={styles.tabText}>NOW PLAYING</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.tab} onPress={this.toggleMovies.bind(this, 'comingSoon')}>
                            <View style={styles.innerTab}>
                                <View style={this.getTabWrapperStyle('comingSoon')}>
                                    <Text style={styles.tabText}>COMING SOON</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        
                        <View style={this.getTabContentStyle('nowPlaying')}>
                            {movies.nowPlaying.length > 0 ?
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
                                    >
                                    {movies.nowPlaying.map(item => (
                                        <MovieCard key={item.id} item={item} onDetailClick={this.openDetail.bind(this)} onMovieSelected={this.onMovieSelected.bind(this)} />
                                    ))}
                                    </Swiper>
                                : <MovieCard />}
                        </View>

                        <View style={this.getTabContentStyle('comingSoon')}>
                            {movies.comingSoon.length > 0 ?
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
                                    >
                                    {movies.comingSoon.map(item => (
                                        <MovieCard key={item.id} item={item} onDetailClick={this.openDetail.bind(this)} onMovieSelected={this.onMovieSelected.bind(this)} noSchedule={true} />
                                    ))}
                                    </Swiper>
                                : <MovieCard />}
                        </View>

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
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 50
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#fff'
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60
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
    }
});

MoviesPage = connect((state) => {
    return {
        movie: state.movie
    }
})(MoviesPage);

export default MoviesPage;