import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { theme } from '../../Index';
const Styles = {
    btn: {
        container: {
            width: 160,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
            paddingTop: 15,
            paddingBottom: 15,
            borderRadius: 60,
            backgroundColor: theme.opacityWhite,
        },
        text: {
            fontSize: 18,
            color: '#fff',
        }
    }
}
export default class MyButton extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        const { title, onPress, activeOpacity, style={} } = this.props;
        return (
            <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
                <View style={[Styles.btn.container, style.container]}>
                    <Text style={[Styles.btn.text, style.text]}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
