import React, { Component } from 'react';
import { Keyboard, ImageBackground, Text, View, StyleSheet, TextInput, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { appBg, apiUri, theme } from '../Index';
import Api from '../Api/Api';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MyButton from '../Components/Form/MyButton';

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
        width: '25%',
        fontSize: 20,
        paddingTop: 15,
        paddingBottom: 15
    },
    customInput: {
    	width: '70%'
    },
	title: {
		textAlign: 'center',
		color: '#49AAF0',
		fontSize: 18,
		marginBottom: 15
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: 'row'
	},
	inputStyle: {
		height: 40,
		backgroundColor: '#ffffff',
		width: '60%',
		paddingLeft: 10,
		paddingRight: 10,
	},
	confirmBtn: {
		minWidth: 140,
		marginTop: 20,
		height: 40,
	},
	inputContent: {
		flex: 1,
		flexDirection: 'column',
      	justifyContent: "center",
		alignItems: "center",
		height: '100%'
	}
});

class Maintain extends Component {
    static navigationOptions = {
        title: '矿机维护',
    }
	constructor (props) {
	    super(props);
	    this.state = {
	    	number: '',
	    	receiveId: ''
	    };
	}
	// 监听键盘弹出与收回
	componentDidMount() {
	  this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',this.keyboardDidShow);
	  this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',this.keyboardDidHide);
	}

	//注销监听
	componentWillUnmount () {
	  this.keyboardWillShowListener && this.keyboardWillShowListener.remove();
	  this.keyboardWillHideListener && this.keyboardWillHideListener.remove();
	}

	//键盘弹起后执行
	keyboardDidShow = () =>  {
	  this._scrollView.scrollTo({x:0, y:100, animated:true});
	}


	//键盘收起后执行
	keyboardDidHide = () => {
	  this._scrollView.scrollTo({x:0, y:0, animated:true});
	}
	render () {
		const { id, token, maintain_currency } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.content}>
					<ScrollView
					ref={component => this._scrollView=component}
					scrollEnabled={false}
                    keyboardShouldPersistTaps='always'
                    contentContainerStyle={{flex:1}}
                    >
						<View style={styles.inputContent}>
							<Text style={styles.title}>转移维护币(剩余: {maintain_currency})</Text>
							<View style={styles.inputWrapper}>
								<Text style={styles.inputText}>转移数量</Text>
								<TextInput
									keyboardType="numeric"
									placeholder="请输入数量"
									style={[theme.textInput, styles.customInput]}
							        onChangeText={(number) => {
							        	const newMoney = number.replace(/[^\d]+/, '');
							        	this.setState({number: newMoney})
							        }}
							        value={this.state.number}
							    />
							    <FontAwesome name={'angle-down'} size={30} color="#BBB" />
							</View>
						    <View style={styles.inputWrapper}>
						    	<Text style={styles.inputText}>接收者ID</Text>
								<TextInput
									keyboardType="numeric"
									placeholder="接收维护币用户ID"
									style={[theme.textInput, styles.customInput]}
							        onChangeText={(number) => {
							        	const newText = number.replace(/[^\d]+/, '');
							        	this.setState({receiveId: newText})
							        }}
							        value={this.state.receiveId}
							    />
							    <FontAwesome name={'angle-down'} size={30} color="#BBB" />
							</View>
						    <MyButton
						    title="确定"
						    style={{container: {marginTop: 20}}}
				            onPress={() => {
				                let formData = new FormData();
								formData.append('send_id', id);
								formData.append('token', token);
								formData.append('number', this.state.number);
								formData.append('receive_id', this.state.receiveId);
                                console.log(formData);
                                Api.request(apiUri.getTransfer, 'POST', formData).then((responseJson) => {
                                	if(responseJson.code == 'success') {
                            			let number = (parseInt(this.props.maintain_currency)*100 - this.state.number*100)/100;
						        		this.props.update({maintain_currency: number});
						        	}
							        Alert.alert(responseJson.message);
							    })
				            }}
				             />
						</View>
					</ScrollView>
				</View>
			</View>
		)
	}
}
export default connect((state)=>{
	console.log(state);
	return {maintain_currency: state.maintain_currency, id: state.id, token: state.token}
},(dispatch) => {
    return {
        update: (userInfo) => {
            console.log('update user info');
            dispatch({
                type: 'UPDATE_USER_INFO',
                userInfo,
            })
        }
    }
})(Maintain)
