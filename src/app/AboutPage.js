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
import {iconsMap} from '../utils/AppIcons';

class AboutPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.heading}>
                                21MOBILE 🎦 2016 @sonnylazuardi
                            </Text>
                        </View>
                        <View>
                            <Text>
                                This app will give you movies schedule at Cinema 21, You can easily browse and check the schedule.
                                This app is built with React Native, Redux, and GraphQL. The data is taken from http://21cineplex.com/
                            </Text>
                        </View>
                        <View style={styles.action}>
                            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('http://github.com/sonnylazuardi').catch(err => console.error('An error occurred', err))}>
                                <View>
                                    <Text style={styles.buttonText}>
                                        FOLLOW MY GITHUB: sonnylazuardi
                                    </Text>
                                </View>
                            </TouchableOpacity>
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
    card: {
        flex: 1,
        padding: 20,
        margin: 24,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    heading: {
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 12
    },
    action: {
        flexDirection: 'row',
        marginTop: 12
    },
    button: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ad241f',
        borderRadius: 4
    },
    buttonText: {
        color: '#ad241f',
        fontSize: 14,
        textAlign: 'center'
    }
});

export default AboutPage;