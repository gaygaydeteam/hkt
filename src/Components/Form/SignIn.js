import React from 'react';
import { connect } from 'react-redux'
import { Text, View, ImageBackground, TextInput } from 'react-native';
import { appBg, theme, apiUri } from "../../Index";
import MyButton from './MyButton';
import Api from "../../Api/Api";
const Styles = {
    background: {
        flex: 1,
        resizeMode: 'cover',
        width: null,
        justifyContent: 'center',
    },
    title: {
        container: {
            alignItems: 'center',
            marginBottom: 160,
        },
        cnName: {
            fontSize: 42,
            color: theme.shitYellow,
        },
        enName: {
            fontSize: 18,
            color: theme.shitYellow,
        }
    },
    form: {
        alignItems: 'center',
    }
}

class SignIn extends React.Component {
    static navigationOptions = {
        title: '登录'
    }
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            editable: true,
        };
    }
    lock = () => {
        console.log('lock');
    }
    login = () => {
        if(!this.state.username) {
            global.toast.show('请输入用户名');
            return;
        }
        if(!this.state.password) {
            global.toast.show('请输入密码');
            return;
        }
        this.setState({ editable: false });
        let fd = new FormData();
        fd.append('username', this.state.username);
        fd.append('password', this.state.password);
        Api.request(apiUri.login, 'POST', fd).then((res) => {
            switch(res.code) {
                case 'success':
                this.props.loginSuccess(res.data);
                    global.toast.show('登录成功');
                    this.setState({ editable: true });
                    this.props.navigation.navigate('Root');
                break;
                case 'error':
                    global.toast.show(res.message);
                    this.setState({ editable: true });
                break;
            }
        });
    }
    render() {
        const { editable, username, password } = this.state;
        return (
            <ImageBackground source={appBg} style={Styles.background}>
                <View style={Styles.title.container}>
                    <Text style={Styles.title.cnName}>HKT</Text>
                    <Text style={Styles.title.enName}></Text>
                </View>
                <View style={Styles.form}>
                    <TextInput
                        style={editable ? theme.textInput : [theme.textInput, theme.textInputDisable]}
                        onChangeText={(username) => this.state.username = username}
                        // value={this.state.username}
                        placeholder="账号"
                        placeholderTextColor={theme.lightGray}
                        selectionColor="#fff"
                        maxLength={12}
                        defaultValue={username}
                        editable={editable}
                        autoCapitalize="none"
                        autoComplete="off"
                    />
                    <TextInput
                        style={editable ? theme.textInput : [theme.textInput, theme.textInputDisable]}
                        onChangeText={(password) => this.state.password = password}
                        placeholder="密码"
                        placeholderTextColor={theme.lightGray}
                        selectionColor="#fff"
                        maxLength={12}
                        secureTextEntry={true}
                        defaultValue={password}
                        editable={editable}
                    />
                    <MyButton title="登录" activeOpacity={.5} onPress={editable ? this.login : this.lock}/>
                </View>
            </ImageBackground>
        )
    }
}
export default connect(
    // (state) => {
    //     console.log('sign in map state to props')
    //     return state;
    // },
    null,
    (dispatch, ownProps) => {
        return {
            loginSuccess: (data) =>{
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    data,
                })
            }
        }
    }
)(SignIn);
