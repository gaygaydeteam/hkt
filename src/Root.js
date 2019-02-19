import React, { Component } from 'react';
import { Text, View, ScrollView, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import My from './Pages/My';
import UserProfile from './Components/Account/UserProfile';
import Navigation from './Components/Navigation';
import { appBg, theme, apiUri } from './Index';
import Api from "./Api/Api";
import MyButton from './Components/Form/MyButton';

const Styles = {
    backgroundImage:{
        flex: 1,
        resizeMode: 'cover',
        width: null,
    },
    home: {
        userProfile: {
            container: {
                marginTop: theme.appTopHeight,
            },
            avatar: {
                marginLeft: 15.
            },
            name: {
                color: '#fff',
            }
        },
        main: {

        },
        balanceAndCredit: {
            container: {
                marginTop: 80,
                paddingTop: 5,
                paddingBottom: 5,
                backgroundColor: theme.opacityWhite,
                flexDirection: 'row'
            },
            text: {
                flex: 1,
                paddingTop: 5,
                paddingBottom: 5,
                textAlign: 'center',
                fontSize: 16,
                color: '#fff',
            },
            balance: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                borderRightWidth: 1,
                borderRightColor: '#fff',
            },
            machineBuy: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                borderRightWidth: 1,
                borderRightColor: '#fff',
            },
            credit: {
                flex: 1,
            }
        },
        outBtnWrapper: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
}
const navigateList = [
    {
        title: '购买记录',
        id: 'BuyHistory',
        icon: 'history'
    },
    {
        title: '静态收益',
        id: 'HangUp',
        icon: 'bar-chart'
    },
    {
        title: '动态收益',
        id: 'DynamicIncome',
        icon: 'line-chart'
    },
    {
        title: '总账明细',
        id: 'TotalDetail',
        icon: 'list-alt'
    },
    {
        title: '邀请链接',
        id: 'ShareLink',
        icon: 'share-alt'
    },
    {
        title: '我的粉丝',
        id: 'Team',
        icon: 'users'
    },
    {
        title: '矿机维护',
        id: 'Maintain',
        icon: 'wrench'
    },
    {
        title: '我的交易',
        id: 'MyOrder',
        icon: 'exchange'
    },
    {
        title: '退本还息',
        id: '',
        icon: 'percent'
    }
]
//editable控制编辑按钮显示，customStyle 自定义样式，对应组件里的style，详情查看UserProfile.js
//barStyle: light-content、dark-content
class Home extends Component {
    static navigationOptions = {
        title: '主页',
        headerMode: 'none',
    }
    componentWillMount() {
        let fd = new FormData();
        fd.append('id', this.props.id);
        fd.append('token', this.props.token);
        Api.request(apiUri.getUserInfo, 'POST', fd).then((resData)=>{
            this.props.update(resData.data);
        });
    }
    render() {
        const { mine_balance, frozen_money, navigation, is_real_name } = this.props
        return (
            <ImageBackground source={appBg} style={Styles.backgroundImage}>
                <ScrollView style={Styles.home.main}>
                    <UserProfile editable={false} style={Styles.home.userProfile}/>
                    <View style={Styles.home.balanceAndCredit.container}>
                        <View style={Styles.home.balanceAndCredit.machineBuy}>
                            <TouchableOpacity onPress={() => {if(is_real_name == '1'){this.props.navigation.navigate('Buy')}else{Alert.alert('需要实名认证')}}}>
                                <Text style={Styles.home.balanceAndCredit.text}>矿机购买</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.home.balanceAndCredit.balance}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('HangUp')}>
                                <Text style={Styles.home.balanceAndCredit.text}>余额: {mine_balance}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.home.balanceAndCredit.credit}>
                            <Text style={Styles.home.balanceAndCredit.text}>红利: {frozen_money}</Text>
                        </View>
                    </View>
                    <Navigation list={navigateList} nav={navigation}/>
                    <View style={Styles.home.outBtnWrapper}>
                        <MyButton title="退出登陆" style={{container: {marginTop: 10}}} activeOpacity={.5} onPress={() => {}}/>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
  }

class Info extends Component {
    static navigationOptions = {
        title: '资讯',
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>资讯</Text>
            </View>
        );
    }
}

class ShoppingCenter extends Component {
    static navigationOptions = {
        title: '商城',
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>资讯</Text>
            </View>
        );
    }
}

const TabNavigator = createBottomTabNavigator({
    Home: connect(
        (state)=>state,
        (dispatch) => {
            return {
                update: (userInfo) =>{
                    console.log('update user info');
                    dispatch({
                        type: 'UPDATE_USER_INFO',
                        userInfo,
                    })
                }
            }
        })(Home),
    Info,
    ShoppingCenter,
    My,
},{
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            switch(routeName) {
                case 'Home':
                    iconName = 'ios-home';
                    break;
                case 'Info':
                    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
                    break;
                case 'ShoppingCenter':
                    iconName = 'md-cart';
                    break;
                case 'My':
                    iconName = 'md-person';
                    break;
            }
            return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    },
});
export default createAppContainer(TabNavigator);
