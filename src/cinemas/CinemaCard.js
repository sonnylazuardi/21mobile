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
    var {item, active} = props;
    return (
        <View style={styles.slide}>
            <View style={styles.card}>
                <View style={styles.cardImage}>
                    {item ?
                        <Image
                            source={{uri: item.image}}
                            style={styles.cardImageView}
                            resizeMode={'cover'}
                            />
                        : <View
                            style={styles.cardImageViewPlaceholder}
                            /> }
                </View>
                <View style={styles.cardInfo}>
                    {item ?
                        <View>
                            <Text style={styles.cardTitle}>
                                {item.name}
                            </Text>
                            <Text style={styles.cardDesc}>
                                {item.city && item.city.name}
                            </Text>
                        </View>
                        : <ActivityIndicator animating={true} size="large"/>}
                    <View style={styles.cardAction}>
                        <TouchableOpacity style={styles.cardButton} onPress={props.onCinemaSelected.bind(this, item)}>
                            <View style={active ? [styles.cardButtonView, styles.activeButton] : styles.cardButtonView}>
                                <Text style={active ? [styles.cardButtonText, styles.activeText] : styles.cardButtonText}>
                                    {active ? 'CHOOSEN' : 'CHOOSE CINEMA'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
};

MovieCard.defaultProps = {
    onCinemaSelected: () => {}
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
        paddingHorizontal: 20
    },
    cardButtonText: {
        color: '#ad241f',
        textAlign: 'center',
    },
    activeButton: {
        backgroundColor: '#ad241f'
    },
    activeText: {
        color: '#fff'
    },
    cardImage: {
        flex: 1,
        borderRadius: 4,
        overflow: 'hidden'
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
        backgroundColor: '#ddd'
    }
})

export default MovieCard;