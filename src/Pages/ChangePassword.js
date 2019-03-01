import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { appBg, theme, apiUri } from '../Index';
import MyButton from '../Components/Form/MyButton';
import Api from  '../Api/Api';
import { connect } from 'react-redux';
const styles = StyleSheet.create({
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
            console.log(res);
            global.toast.show(res.message);
        });
    }
	render () {
		return (
			<View style={styles.container}>
				<ImageBackground source={appBg} style={styles.backgroundImage}>
					<View style={styles.content}>
						<View style={styles.listWrapper}>
							<TextInput
		                        style={theme.textInput}
		                        onChangeText={(password) => this.state.oldPassword = password}
		                        placeholder="请输入旧密码"
		                        placeholderTextColor={theme.lightGray}
		                        selectionColor="#fff"
		                        maxLength={12}
		                        secureTextEntry={true}
		                        defaultValue={this.state.oldPassword}
		                    />
		                    <TextInput
		                        style={theme.textInput}
		                        onChangeText={(password) => this.state.newPassword = password}
		                        placeholder="请输入新密码"
		                        placeholderTextColor={theme.lightGray}
		                        selectionColor="#fff"
		                        maxLength={12}
		                        secureTextEntry={true}
		                        defaultValue={this.state.newPassword}
		                    />
                            <MyButton title="确定" onPress={this.change}/>
						</View>
					</View>
			    </ImageBackground>
			</View>
		)
	}
}
export default connect((state) => state)(ChangePassword)
