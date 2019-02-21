import React, { Component } from 'react';
import { Image, Text, View, ScrollView, ImageBackground, TouchableOpacity, Alert } from 'react-native';
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
    },
    businessWrapper: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    businessItem: {
        width: '48%',
        backgroundColor: theme.opacityWhite,
        borderRadius: 5,
        marginBottom: 15,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    businessInfo: {
        flex: 0,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    businessText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 10
    },
    businessImg: {
        width: '100%',
        height: 0,
        paddingBottom: '100%',
        borderRadius: 5
    }
}
const business = [
    {
        title: '话费充值',
        img: require( '../assets/hengtai/phone-charge.png'),
        money: '1000'
    },
    {
        title: 'iphone',
        img: require( '../assets/hengtai/iphone.png'),
        money: '5999'
    },
    {
        title: 'gucci皮包',
        img: require( '../assets/hengtai/gucci.png'),
        money: '108888'
    },
    {
        title: '油卡',
        img: require( '../assets/hengtai/oil-card.png'),
        money: '1000'
    },
]
const navigateList = [
    {
        title: '购买记录',
        id: 'BuyHistory',
        icon: 'history'
    },
    {
        title: '静态收益',
        id: 'StaticIncome',
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
        title: '保本还息',
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
        const { mine_balance, frozen_money, navigation, is_real_name, out_money, id, token } = this.props
        return (
            <ImageBackground source={appBg} style={Styles.backgroundImage}>
                <ScrollView style={Styles.home.main}>
                    <UserProfile editable={false} style={Styles.home.userProfile}/>
                    <View style={Styles.home.balanceAndCredit.container}>
                        <View style={Styles.home.balanceAndCredit.machineBuy}>
                            <TouchableOpacity onPress={() => {if(is_real_name == '1'){navigation.navigate('Buy')}else{Alert.alert('您的身份信息尚未完善，请前往我的页面完善个人信息，完成实名认证审核')}}}>
                                <Text style={Styles.home.balanceAndCredit.text}>矿机购买</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.home.balanceAndCredit.balance}>
                            <TouchableOpacity onPress={() => navigation.navigate('HangUp')}>
                                <Text style={Styles.home.balanceAndCredit.text}>可交易HKT: {mine_balance}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.home.balanceAndCredit.credit}>
                            <Text style={Styles.home.balanceAndCredit.text}>冻结HKT: {frozen_money}</Text>
                        </View>
                    </View>
                    <Navigation list={navigateList} nav={navigation} id={id} token={token} out_money={out_money}/>
                    <View style={Styles.home.outBtnWrapper}>
                        <MyButton title="退出登陆" style={{container: {marginTop: 10}}} activeOpacity={.5} onPress={() => {
                            this.props.reset();
                            global.toast.show('已退出');
                            navigation.navigate('SignIn');
                        }}/>
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
            <ImageBackground source={appBg} style={Styles.backgroundImage}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{color: '#fff',fontSize:18}}>该功能暂未开放,敬请期待</Text>
                </View>
            </ImageBackground>
        );
    }
}

class HKTShoppingCenter extends Component {
    static navigationOptions = {
        title: 'HKT商城',
    }
    render() {
        return (
            <ImageBackground source={appBg} style={Styles.backgroundImage}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{color: '#fff',fontSize:18}}>该功能暂未开放,敬请期待</Text>
                </View>
            </ImageBackground>
        );
    }
}

class ShoppingCenter extends Component {
    static navigationOptions = {
        title: '商城',
    }
    render() {
        return (
            <ImageBackground source={appBg} style={Styles.backgroundImage}>
                <ScrollView>
                    <View style={Styles.businessWrapper}>
                        {business.map((item, index) => (
                            <View style={Styles.businessItem} key={index}>
                                <Image
                                    style={Styles.businessImg}
                                    source={item.img}
                                />
                                <View style={Styles.businessInfo}>
                                    <Text style={Styles.businessText}>{item.title}</Text>
                                    <Text style={Styles.businessText}>¥ {item.money}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const TabNavigator = createBottomTabNavigator({
    Home: connect(
        (state)=>state,
        (dispatch) => {
            return {
                update: (userInfo) => {
                    console.log('update user info');
                    dispatch({
                        type: 'UPDATE_USER_INFO',
                        userInfo,
                    })
                },
                reset: () => {
                    console.log('reset user state');
                    dispatch({
                        type: 'RESET_USER_STATE',
                    })
                }
             }
        })(Home),
    Info,
    HKTShoppingCenter,
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
                case 'HKTShoppingCenter':
                    iconName = 'md-card';
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
