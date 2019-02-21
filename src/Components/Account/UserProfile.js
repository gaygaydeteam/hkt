import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import { defaultAvatar } from '../../Index';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarWrapper: {
        marginRight: 10
    },
    content:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 42,
		height: 42,
		borderRadius: 16,
    },
    name: {
        color: '#fff',
    },
    edit: {
        name: "edit",
        color: '#fff',
        size: 14,
    }
}
class UserProfile extends Component {
    constructor (props) {
        super(props);
    }
    showEdit (editable, style) {
        let iconStyle = Object.assign(Styles.edit, style);
        if(editable) {
            return (
                <FontAwesome style={{marginLeft: 5}} name={iconStyle.name} color={iconStyle.color} size={iconStyle.size}/>
            )
        }
        return;
    }
    render () {
        const { editable, style: customStyle={}, avatar=defaultAvatar, name='昵称', id} = this.props;
        return (
            <View style={[Styles.container, customStyle.container]}>
                <View style={[Styles.avatarWrapper, customStyle.avatarWrapper]}>
                    <Image style={[Styles.avatar, customStyle.avatar]}
                        source={avatar.toString().indexOf('http') === 0? {uri: avatar} : defaultAvatar}
                    />
                </View>
                <View style={editable ? [Styles.content, customStyle.content] : [Styles.content, customStyle.content, {flexDirection: 'column', alignItems: 'flex-start',}]}>
                    <Text style={[Styles.name, customStyle.name]}>{editable ? '' : '用户名: '}{name}</Text>
                    {this.showEdit(editable, customStyle.edit)}
                    <Text style={[Styles.name, customStyle.name]}>{editable ? '' : 'ID: ' + id}</Text>
                </View>
            </View>
        )
    }
}
export default connect((state)=>{ return {avatar: state.avatar, name: state.name, id: state.id}})(UserProfile)
