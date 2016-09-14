import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Image,
    ActivityIndicator,
    ScrollView,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const {ToolbarAndroid} = Icon;
import { Navigation } from 'react-native-navigation';

import { connect } from 'react-redux';
import * as movieActions from '../movies/MovieActions';

import {iconsMap} from '../utils/AppIcons';
import LinearGradient from 'react-native-linear-gradient';

class MovieDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieState: 'nowPlaying'
        }
    }
    openYoutube(trailer) {
        Linking.openURL(trailer).catch(err => console.error('An error occurred', err));
    }
    onMovieSelected(movie) {
        this.props.dispatch(movieActions.setActiveMovie(movie));
        this.props.navigator.switchToTab({tabIndex: 1});
    }
    render() {
        var {movie} = this.props.movie;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.trailer}>
                        <Image source={{uri: movie.posterImage || movie.image}} style={styles.imageTrailer} />
                        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.3)', '#000']} style={styles.linearGradient}>
                        </LinearGradient>
                        <View style={styles.playButtonContainer}>
                            <TouchableOpacity style={styles.playButton} onPress={this.openYoutube.bind(this, movie.trailer)}>
                                <View style={styles.playButton}>
                                    <Icon name="md-play" size={18} color="#fff"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardPanel}>
                            <Text style={styles.cardTitle}>
                                {movie.title}
                            </Text>
                            <Text style={styles.cardDesc}>
                                <Icon name="md-megaphone" /> {movie.director} {'\n'}
                                <Icon name="md-pricetag" /> {movie.genre} {'\n'}
                                <Icon name="md-star" /> {movie.rating}
                            </Text>
                        </View>
                        <View style={styles.cardAction}>
                            <TouchableOpacity style={styles.cardButton} onPress={this.onMovieSelected.bind(this, movie)}>
                                <View style={[styles.cardButtonView, styles.activeButton]}>
                                    <Text style={[styles.cardButtonText, styles.activeText]}>
                                        SCHEDULE
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cardDescription}>
                            <Text style={styles.cardDescriptionText}>
                                {movie.description}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.cardThumb}>
                        <Image source={{uri: movie.image}} style={styles.cardImageThumb} />
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'transparent',
    },
    trailer: {
        height: 200
    },
    imageTrailer: {
        height: 200,
        flex: 1
    },
    linearGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 24,
        marginBottom: 24,
        borderRadius: 4,
        marginTop: -40,
        overflow: 'visible',
        paddingHorizontal: 3,
        paddingVertical: 10,
        marginBottom: 60
    },
    cardThumb: {
        height: 160,
        width: 200,
        position: 'absolute',
        top: 130,
        left: 35,
        overflow: 'visible'
    },
    cardImageThumb: {
        height: 160,
        width: 120,
        borderRadius: 4
    },
    cardPanel: {
        marginLeft: 138
    },
    cardTitle: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '300',
        color: '#000',
        marginBottom: 5
    },
    cardDesc: {
        textAlign: 'left',
        fontSize: 12,
        marginBottom: 5,
        lineHeight: 18
    },
    cardAction: {
        flexDirection: 'row',
        marginTop: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    cardButton: {
        flex: 1,
    },
    cardButtonText: {
        textAlign: 'center'
    },
    cardButtonView: {
        flex: 1,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: '#ad241f',
        borderRadius: 4,
        paddingVertical: 10,
    },
    cardDescription: {
        padding: 10
    },
    cardButtonText: {
        color: '#ad241f',
        textAlign: 'center'
    },
    activeButton: {
        backgroundColor: '#ad241f'
    },
    activeText: {
        color: '#fff'
    },
    playButton: {
        width: 60,
        height: 60,
        backgroundColor: '#ad241f',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    playButtonContainer: {
        position: 'absolute',
        top: 40,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

MovieDetailPage = connect((state) => {
    return {
        movie: state.movie
    }
})(MovieDetailPage);

export default MovieDetailPage;