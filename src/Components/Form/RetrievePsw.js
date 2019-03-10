import React from 'react';
import { TouchableWithoutFeedback, ImageBackground, Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { appBg, theme, apiUri } from '../../Index';
import MyButton from './MyButton';
import Api from "../../Api/Api";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: 100,
        fontSize: 20,
        paddingTop: 15,
        paddingBottom: 15
    },
    customInput: {
        flex: 1
    },
    content: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    listWrapper: {
        flex: 1,
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    captcha: {
        width: '80%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    sendText: {
        color: '#333',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        fontSize: 16,
        width: '30%',
    }
});

export default class RetrievePsw extends React.Component {
    static navigationOptions = {
        title: '找回密码'
    }
    constructor (props) {
        super(props);
        this.state = {
            captcha: '',
            userName: '',
            phoneNumber:'',
            newPassword: '',
            rewrite: '',
            isSend: false,
            timeOut: 120,
            disabled: false,
            sendInfo: '发送短信'
        };
    }
    change = () => {
        if(this.state.newPassword == '') {
            Alert.alert('请输入新密码');
        }else if(this.state.newPassword == this.state.rewrite) {
            let formData = new FormData();
            formData.append('phone', this.state.phoneNumber);
            formData.append('username', this.state.userName);
            formData.append('mobileCode', this.state.captcha);
            formData.append('password', this.state.newPassword);
            Api.request(apiUri.getPassword, 'POST', formData).then((responseJson)=>{
                global.toast.show(responseJson.message);
                if(responseJson.code == 'success') {
                    this.props.navigation.goBack();
                }
            })
        }else {
            Alert.alert('俩次输入密码不一致');
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.listWrapper}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputText}>账号</Text>
                            <TextInput
                                placeholderTextColor={theme.lightGray}
                                autoCapitalize = 'none'
                                style={[theme.textInput, styles.customInput]}
                                onChangeText={(value) => {
                                  this.setState({
                                    userName: value,
                                  });
                                }}
                                placeholder="请输入账号"
                            />
                            <FontAwesome name={'angle-down'} size={30} color="#BBB" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputText}>手机号</Text>
                            <TextInput
                                placeholderTextColor={theme.lightGray}
                                autoCapitalize = 'none'
                                style={[theme.textInput, styles.customInput]}
                                maxLength={11}
                                keyboardType="numeric"
                                onChangeText={(value) => {
                                  const newPhone = value.replace(/[^\d]+/, '');
                                  this.setState({
                                    phoneNumber: newPhone,
                                  });
                                }}
                                placeholder="请输入手机号"
                            />
                            <FontAwesome name={'angle-down'} size={30} color="#BBB" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputText}>验证码</Text>
                            <TextInput
                                placeholderTextColor={theme.lightGray}
                                autoCapitalize = 'none'
                                style={[theme.textInput,{width: '45%'}]}
                                keyboardType="numeric"
                                onChangeText={(value) => {
                                  const newPhone = value.replace(/[^\d]+/, '');
                                  this.setState({
                                    captcha: newPhone,
                                  });
                                }}
                                placeholder="请输入验证码"
                            />
                            <TouchableWithoutFeedback
                            onPress={() => {
                                if(!this.state.disabled) {
                                    if(this.state.phoneNumber == ''){
                                        Alert.alert('请输入手机号');
                                    }else {
                                        let formData = new FormData();
                                        formData.append('phone', this.state.phoneNumber);
                                        Api.request(apiUri.getMessage + this.state.phoneNumber, 'POST', formData).then((responseJson)=>{
                                            global.toast.show(responseJson.message);
                                        })
                                        this.setState({
                                            isSend: true,
                                            disabled: true
                                        });
                                        let interval = setInterval(() => {
                                            let timer = this.state.timeOut - 1;
                                            if(timer <= 0) {
                                                this.setState({
                                                    isSend: false,
                                                    timeOut: 120,
                                                    disabled: false,
                                                    sendInfo: '重新发送'
                                                });
                                                clearInterval(interval);
                                            }else {
                                                this.setState({
                                                    timeOut: timer,
                                                })
                                            }
                                        }, 1000);
                                    }
                                }
                            }}>
                                {(this.state.isSend) ? <Text style={styles.sendText}>{this.state.timeOut}S</Text> : <Text style={styles.sendText}>{this.state.sendInfo}</Text>}
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputText}>新密码</Text>
                            <TextInput
                                style={[theme.textInput, styles.customInput]}
                                onChangeText={(password) => this.state.newPassword = password}
                                placeholder="请输入新密码"
                                placeholderTextColor={theme.lightGray}
                                selectionColor="#fff"
                                maxLength={12}
                                secureTextEntry={true}
                                defaultValue={this.state.newPassword}
                            />
                            <FontAwesome name={'angle-down'} size={30} color="#BBB" />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputText}>确认密码</Text>
                            <TextInput
                                style={[theme.textInput, styles.customInput]}
                                onChangeText={(password) => this.state.rewrite = password}
                                placeholder="再次确认新密码"
                                placeholderTextColor={theme.lightGray}
                                selectionColor="#fff"
                                maxLength={12}
                                secureTextEntry={true}
                                defaultValue={this.state.rewrite}
                            />
                            <FontAwesome name={'angle-down'} size={30} color="#BBB" />
                        </View>
                        <MyButton title="确定修改" style={{container: {marginTop: 0}}} onPress={this.change}/>
                    </View>
                </View>
            </View>
        )
    }
}
