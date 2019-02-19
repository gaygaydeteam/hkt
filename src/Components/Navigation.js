import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { theme } from '../Index';
const Styles = {
    container: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        width: '31%',
        backgroundColor: theme.opacityWhite,
        borderRadius: 5,
        marginBottom: 15,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10

    },
    itemImg: {
        width: 72,
        height: 72,

    },
    itemTitle: {
        fontSize: 16,
        color: '#fff',
        marginTop: 10
    }
}

export default class Navigation extends Component{
    constructor(props) {
        super(props);
    }
    link (id) {
        if(!id) {
            global.toast.show('该功能暂未开放!!!');
            return;
        }
        this.props.nav.navigate(id);
    }
    render () {
        const { list } = this.props;
        return (
            <View style={Styles.container}>
                {
                    list.map((item, index) => (
                        <TouchableWithoutFeedback key={index} onPress={() => this.link(item.id)}>
                            <View style={Styles.item}>
                                <FontAwesome name={item.icon} size={22} color="red" />
                                <Text style={Styles.itemTitle}>{item.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
            </View>
        )
    }
}
