import React,{ Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import Root from './src/Root';
import SignIn from './src/Components/Form/SignIn';
import RetrievePsw from './src/Components/Form/RetrievePsw';
import Toast from './src/Components/Modal/Toast';

import Buy from './src/Pages/Buy';
import HangUp from './src/Pages/HangUp';
import Team from './src/Pages/Team';
import MyOrder from './src/Pages/MyOrder';
import BuyHistory from './src/Pages/BuyHistory';
import TotalDetail from './src/Pages/TotalDetail';
import Maintain from './src/Pages/Maintain';
import DynamicIncome from './src/Pages/DynamicIncome';
import PersonalInfo from './src/Pages/PersonalInfo';
import ShareLink from './src/Pages/ShareLink';
import Transaction from './src/Pages/Transaction';
import ChangePassword from './src/Pages/ChangePassword';
import StaticIncome from './src/Pages/StaticIncome';
import BuyDetail from './src/Pages/BuyDetail';
const defaultState = {
    isLogin: false,
    username: '未登录',
}
const reducer = (state = defaultState, action) => {
    console.log('action type:' + action.type);
    console.log(state);
    switch(action.type) {
    case 'LOGIN_SUCCESS':
        return Object.assign({}, state, {
            isLogin: true,
            token: action.data.token,
            id: action.data.id,
            username: action.data.username,
        });
    case 'SET_TOAST_MSG':
        return Object.assign({}, state, {
            message: action.message,
        });
    case 'UPDATE_USER_INFO':
        return Object.assign({}, state, action.userInfo);
    case 'RESET_USER_STATE':
        return defaultState;
    default:
        return state;
    }
};
let store = createStore(reducer);

const Navigator = createStackNavigator({
    Root,
    Team,
    Buy,
    MyOrder,
    HangUp,
    PersonalInfo,
    Transaction,
    BuyHistory,
    TotalDetail,
    Maintain,
    DynamicIncome,
    ShareLink,
    ChangePassword,
    StaticIncome,
    BuyDetail
},{
    defaultNavigationOptions: ({ navigation })=> {
        const { routeName } = navigation.state;
        if(routeName == 'Root') {
            return {
                header: null,
                headerBackTitle: null,
            }
        }
        else {
            return {
                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTintColor: 'white',
            }
        }
    },
    initialRouteName: 'Root',
});
const Navigator1 = createStackNavigator({
    SignIn,
    RetrievePsw,
},{
    defaultNavigationOptions: ({ navigation })=> {
        const { routeName } = navigation.state;
        if(routeName == 'SignIn') {
            return {
                header: null,
                headerBackTitle: null,
            }
        }
        else {
            return {
                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTintColor: 'white',
            }
        }
    },
    initialRouteName: 'SignIn',
});
const RootContainer = createAppContainer(createSwitchNavigator({
    Navigator1,
    Navigator,
},{
    initialRouteName: 'Navigator1',
    // initialRouteName: 'Navigator'
}));
export default class App extends Component {
  onRef = (ref) => global.toast = ref
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" translucent={true} animated={true}/>
        <RootContainer />
        <Toast onRef={this.onRef}/>
      </Provider>
    );
  }
}
