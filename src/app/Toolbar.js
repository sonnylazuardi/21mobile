import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
const {ToolbarAndroid} = Icon;

class Toolbar extends Component {
    onIconBtnClick(position) {
        this.props.onActionSelected(position);
    }
    render() {
        var props = {
            title: this.props.title,
            style: [styles.toolbar, this.props.style],
            titleColor: this.props.titleColor,
        };

        if (this.props.logo) props = Object.assign({}, props, {logo: this.props.logo});
        if (this.props.navIconName) props = Object.assign({}, props, {navIconName: this.props.navIconName});
        if (this.props.onIconClicked) props = Object.assign({}, props, {onIconClicked: this.props.onIconClicked});
        if (this.props.actions) props = Object.assign({}, props, {actions: this.props.actions});
        if (this.props.onActionSelected) props = Object.assign({}, props, {onActionSelected: this.props.onActionSelected});

        if (Platform.OS == 'android') {
            return (
                <ToolbarAndroid {...props} />
            );
        } else {
            return (
                <View style={[styles.toolbarIOS, props.style]}>
                    <View style={styles.left}>
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                    <View style={styles.right}>
                        {this.props.actions.map((action, i) => {
                            return (
                                <TouchableOpacity style={styles.iconBtn} key={i} onPress={this.onIconBtnClick.bind(this, i)}>
                                    <View>
                                        <Icon name={action.iconName} size={20} color={action.iconColor} />
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: 60,
    },
    toolbarIOS: {
        alignItems: 'center',
        paddingTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: '#fff',
        fontWeight: '900'
    },
    iconBtn: {
        width: 40, 
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default Toolbar;