import React, { Component } from 'react';
import { ImageBackground, Alert, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { appBg, theme } from '../Index';
import UserProfile from '../Components/Account/UserProfile';
const styles = {
	userProfile: {
        container: {
            paddingTop: theme.appTopHeight + 20,
            backgroundColor: '#49AAF0',
            paddingBottom: 20
        },
        avatar: {
            width: 80,
            height: 80,
            borderRadius: 0,
            marginLeft: 15,
            marginRight: 15
        },
        name: {
            color: '#fff',
            fontSize: 22,
        },
        edit: {
            size: 18,
        }
    },
	itemList: {
		backgroundColor: '#fff',
		paddingTop: 20,
		paddingBottom:20,
		paddingLeft: 20,
		paddingRight:10,
        borderBottomWidth: 1,
        borderColor: '#EEE',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
	},
	container: {
        flex: 1,
        backgroundColor: '#eee'
    },
	backgroundImage:{
	    flex:1,
	    resizeMode: 'cover',
	    width:null,
	    width:null,
	    backgroundColor:'rgba(0,0,0,0)',
    },
    listIcon: {
        position: 'absolute'
    }
};

class List extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    const {id, nav} = this.props;
    return (
      <TouchableWithoutFeedback
      	onPress={() => {
            if(!id) {
                Alert.alert('暂未开放')
                return;
            }
		    this.props.nav.navigate(id);
  		}}>
        <View style={ styles.itemList }>
        	<View style={{ flexDirection: 'row', flex: 0, alignItems: 'center' }}>
  	      		<FontAwesome style={styles.listIcon} name={this.props.icon} color='#cc9933' size={28}/>
  	      		<Text style={{ paddingLeft:50, color: '#333', fontSize: 20, fontWeight: 'bold' }}>{this.props.name}</Text>
        	</View>
        	<View style={{ flex: 0 }}>
        		<FontAwesome  name="chevron-right" color="white" size={18}/>
        	</View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default class My extends Component {
    static navigationOptions = {
        title: '我的',
    }
	constructor (props) {
	    super(props);
	}
	render () {
        const {navigation} = this.props;
		return (
			<View style={styles.container}>
                <UserProfile editable={true} style={styles.userProfile}/>
                <ScrollView>
                    <List name="实名认证" icon="vcard-o" id="PersonalInfo" nav={navigation}/>
                    <List name="修改密码" icon="cart-plus" id="ChangePassword" nav={navigation}/>
                    <List name="收货地址" icon="tags" nav={navigation}/>
                </ScrollView>
			</View>
		)
	}
}
