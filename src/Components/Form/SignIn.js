import React from 'react';
import { connect } from 'react-redux'
import { Text, View, ImageBackground, TextInput, TouchableWithoutFeedback } from 'react-native';
import { appBg, theme, apiUri } from "../../Index";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
            marginBottom: 60
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
    },
    psd: {
        textAlign: 'center',
        color: '#49AAF0',
        marginTop: 10,
        paddingTop: 10,
        fontSize: 18
    },
    psdWrapper: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#DDD',
        marginBottom: 20
    },
    inputText: {
        width: '15%',
        fontSize: 20,
        paddingTop: 15,
        paddingBottom: 15
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
    jump = () => {
        this.props.navigation.navigate('RetrievePsw');
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
            <View style={Styles.background}>
                <View style={Styles.title.container}>
                    <Text style={Styles.title.cnName}>HKT</Text>
                    <Text style={Styles.title.enName}></Text>
                </View>
                <View style={Styles.form}>
                    <View style={Styles.inputWrapper}>
                        <Text style={Styles.inputText}>账号</Text>
                        <TextInput
                            style={editable ? theme.textInput : [theme.textInput, theme.textInputDisable]}
                            onChangeText={(username) => this.state.username = username}
                            // value={this.state.username}
                            placeholder="请输入账号"
                            placeholderTextColor={theme.lightGray}
                            selectionColor="#fff"
                            maxLength={12}
                            defaultValue={username}
                            editable={editable}
                            autoCapitalize="none"
                            autoComplete="off"
                        />
                        <FontAwesome name={'angle-right'} size={30} color="#BBB" />
                    </View>
                    <View style={Styles.inputWrapper}>
                        <Text style={Styles.inputText}>密码</Text>
                        <TextInput
                            style={editable ? theme.textInput : [theme.textInput, theme.textInputDisable]}
                            onChangeText={(password) => this.state.password = password}
                            placeholder="请输入密码"
                            placeholderTextColor={theme.lightGray}
                            selectionColor="#fff"
                            maxLength={12}
                            secureTextEntry={true}
                            defaultValue={password}
                            editable={editable}
                        />
                        <FontAwesome name={'angle-right'} size={30} color="#BBB" />
                    </View>
                    <MyButton title="登录" activeOpacity={.5} onPress={editable ? this.login : this.lock}/>
                </View>
                <View style={Styles.psdWrapper}>
                    <TouchableWithoutFeedback onPress={this.jump}> 
                        <Text style={Styles.psd}>忘记密码？</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
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
