import React, { Component } from 'react';
import { ImageBackground, Alert, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { appBg, theme } from '../Index';
import UserProfile from '../Components/Account/UserProfile';
const styles = {
	userProfile: {
        container: {
            marginTop: theme.appTopHeight,
        },
        avatar: {
            width: 80,
            height: 80,
            borderRadius: 40,
            marginLeft: 15.
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
		backgroundColor: theme.opacityWhite,
		paddingTop: 15,
		paddingBottom:15,
		paddingLeft: 10,
		paddingRight:10,
		marginTop: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
	},
	container: {
        flex: 1,
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
  	      		<FontAwesome style={styles.listIcon} name={this.props.icon} color='#cc9933' size={18}/>
  	      		<Text style={{ paddingLeft:30, color: 'white', fontSize: 18, fontWeight: 'bold' }}>{this.props.name}</Text>
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
				<ImageBackground source={appBg} style={styles.backgroundImage}>
                    <UserProfile editable={true} style={styles.userProfile}/>
                    <ScrollView>
                        <List name="个人信息" icon="vcard-o" id="PersonalInfo" nav={navigation}/>
                        <List name="交易大厅" icon="cart-plus" id="Transaction" nav={navigation}/>
                        <List name="分享链接" icon="share" nav={navigation}/>
                        <List name="收获地址" icon="tags" nav={navigation}/>
                    </ScrollView>
				</ImageBackground>
			</View>
		)
	}
}
