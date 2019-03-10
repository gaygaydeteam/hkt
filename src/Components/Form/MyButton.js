import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { theme } from '../../Index';
const Styles = {
    btn: {
        container: {
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 5,
            backgroundColor: '#49AAF0',
        },
        text: {
            fontSize: 18,
            color: '#fff',
            width: '100%',
            textAlign: 'center'
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
