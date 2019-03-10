import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { appBg, theme, apiUri } from '../Index';
import MyButton from '../Components/Form/MyButton';
import Api from  '../Api/Api';
import { connect } from 'react-redux';
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
        width: '20%',
        fontSize: 20,
        paddingTop: 15,
        paddingBottom: 15
    },
    customInput: {
    	width: '75%'
    },
	title: {
		marginTop: theme.appTopHeight,
		textAlign: 'center',
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 30
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
	}
});

class ChangePassword extends Component {
    static navigationOptions = {
        title: '修改密码',
    }
	constructor (props) {
	    super(props);
	    this.state = {
	    	oldPassword: '',
	    	newPassword: '',
	    };
    }
    change = () => {
        const { id, token } = this.props;
        let fd = new FormData();
        fd.append('id', id);
        fd.append('token', token);
        fd.append('password', this.state.oldPassword);
        fd.append('new_pwd', this.state.newPassword);
        Api.request(apiUri.getChangePassword, 'POST', fd).then((res) => {
            if(res.code == 'success') {
            	this.props.reset();
            	global.toast.show('修改成功，请重新登录');
            	this.props.navigation.navigate('SignIn');
            }else {
            	global.toast.show(res.message);
            }
        });
    }
	render () {
		return (
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={styles.listWrapper}>
						<View style={styles.inputWrapper}>
							<Text style={styles.inputText}>旧密码</Text>
							<TextInput
		                        style={[theme.textInput, styles.customInput]}
		                        onChangeText={(password) => this.state.oldPassword = password}
		                        placeholder="请输入旧密码"
		                        placeholderTextColor={theme.lightGray}
		                        selectionColor="#fff"
		                        maxLength={12}
		                        secureTextEntry={true}
		                        defaultValue={this.state.oldPassword}
		                    />
		                    <FontAwesome name={'angle-down'} size={30} color="#BBB" />
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
                        <MyButton title="确定" onPress={this.change}/>
					</View>
				</View>
			</View>
		)
	}
}
export default connect((state) => {
	return state
},(dispatch) => {
    return {
    	reset: () => {
		    console.log('reset user state');
		    dispatch({
		        type: 'RESET_USER_STATE',
		    })
		}
    }
})(ChangePassword)
