import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

class ScheduleCard extends Component {
    getSizeStyle() {
        if (this.props.large) return {height: 165};
        if (this.props.small) return {height: 50};
        return {};
    }
    render() {
        return (
            <View style={[styles.container, this.getSizeStyle()]}>
                <View style={styles.left}>
                    {this.props.image ?
                        <TouchableOpacity onPress={this.props.onImageClick.bind(this)}>
                            <View style={{flex: 1}}>
                                <Image source={{uri: this.props.image}} style={styles.image} resizeMode={'cover'}/>
                            </View>
                        </TouchableOpacity>
                        : null}
                    {this.props.text ?
                        <View style={styles.circle}>
                            <Text style={styles.leftText}>
                                {this.props.text}
                            </Text>
                        </View>
                        : null}
                </View>
                <View style={styles.right}>
                    <Text style={styles.heading}>
                        {this.props.title}
                    </Text>
                    {this.props.children}
                    {this.props.action ?
                        <View style={styles.action}>
                            <TouchableOpacity style={styles.buttonRightWrap} onPress={this.props.onChangeClick.bind(this)}>
                                <View style={styles.buttonRight}>
                                    <Text style={styles.buttonRightText}>
                                        CHANGE
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        : null}
                </View>
            </View>
        );
    }
}

ScheduleCard.defaultProps = {
    onChangeClick: () => {},
    onImageClick: () => {}
}

var styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        flexDirection: 'row',
        marginBottom: 8,
        borderRadius: 4
    },
    left: {
        flex: 1,
        backgroundColor: '#ddd',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    right: {
        flex: 4,
        padding: 10,
        overflow: 'hidden'
    },
    heading: {
        fontSize: 10,
        fontWeight: '900'
    },
    text: {
        fontSize: 12
    },
    buttonRight: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ad241f',
        marginTop: 10,
        borderRadius: 3,
    },
    buttonRightText: {
        fontSize: 10,
        textAlign: 'center',
        color: '#ad241f',
        fontWeight: '900'
    },
    action: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    image: {
        height: 120, 
        width: 100
    },
    leftText: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '900'
    },
    circle: {
        width: 68,
        height: 68,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }

});



export default ScheduleCard;