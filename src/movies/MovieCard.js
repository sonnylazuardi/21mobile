import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';

var MovieCard = (props, context) => {
    var {item} = props;
    return (
        <View style={styles.slide}>
            <View style={styles.card}>
                <View style={styles.cardImage}>
                    {item ?
                        <TouchableOpacity style={{flex: 1}} onPress={props.onDetailClick.bind(this, item)}>
                            <View style={{flex: 1}}>
                                <Image
                                    source={{uri: item.image}}
                                    style={styles.cardImageView}
                                    resizeMode={'cover'}
                                    />
                            </View>
                        </TouchableOpacity>
                        : <View
                            style={styles.cardImageViewPlaceholder}
                            /> }
                </View>
                <View style={styles.cardInfo}>
                    {item ?
                        <View>
                            <Text style={styles.cardTitle}>
                                {item.title}
                            </Text>
                            <Text style={styles.cardDesc}>
                                {item.director} • {item.genre} • ⭐️{item.rating}
                            </Text>
                        </View>
                        : <ActivityIndicator animating={true} size="large"/>}
                    <View style={styles.cardAction}>
                        <TouchableOpacity style={styles.cardButton} onPress={props.onDetailClick.bind(this, item)}>
                            <View style={styles.cardButtonView}>
                                <Text style={styles.cardButtonText}>
                                    DETAILS
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {!props.noSchedule ?
                            <TouchableOpacity style={styles.cardButton} onPress={props.onMovieSelected.bind(this, item)}>
                                <View style={[styles.cardButtonView, styles.activeButton]}>
                                    <Text style={[styles.cardButtonText, styles.activeText]}>
                                        SCHEDULE
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            : null}
                    </View>
                </View>
            </View>
        </View>
    )
};

MovieCard.defaultProps = {
    onDetailClick: () => {},
    onMovieSelected: () => {}
}

var styles = StyleSheet.create({
    slide: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    card: {
        backgroundColor: '#fff',
        flex: 1,
        marginBottom: 80,
        marginHorizontal: 24,
        borderRadius: 4
    },
    cardInfo: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '300',
        color: '#000',
        marginBottom: 5
    },
    cardDesc: {
        textAlign: 'center',
        fontSize: 12,
        marginBottom: 5
    },
    cardBold: {
        fontWeight: '700'
    },
    cardAction: {
        flexDirection: 'row',
        marginTop: 12,
        marginBottom: 8
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
    cardImage: {
        flex: 1,
        overflow: 'hidden',
        borderRadius: 4
    },
    cardImageView: {
        flex: 1,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    cardImageViewPlaceholder: {
        flex: 1,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        backgroundColor: '#ddd',
    }
})

export default MovieCard;