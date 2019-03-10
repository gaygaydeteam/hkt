import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { appBg, theme, apiUri } from '../Index';
import { connect } from 'react-redux';
import MyButton from '../Components/Form/MyButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Api from '../Api/Api';

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
	confirmBtn: {
		minWidth: 140,
		marginTop: 30,
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

class HangUp extends Component {
    static navigationOptions = {
        title: '矿金挂卖',
    }
	constructor (props) {
	    super(props);
	    this.state = {
	    	money: ''
	    };
	}
	render () {
		const { id, token } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={styles.inputContent}>
						<View style={styles.inputWrapper}>
	                        <Text style={styles.inputText}>矿金数量</Text>
							<TextInput
								keyboardType="numeric"
								placeholder="请输入矿金数量"
								style={[theme.textInput, styles.customInput]}
						        onChangeText={(money) => {
						        	const newText = money.replace(/[^\d]+/, '');
						        	this.setState({money: newText})
						        }}
						        value={this.state.money}
						    />
						    <FontAwesome name={'angle-down'} size={30} color="#BBB" />
	                    </View>
					    <MyButton
					    title="确定"
					    style={{container: {marginTop: 20}}}
			            onPress={() => {
			                let formData = new FormData();
							formData.append('id', id);
							formData.append('token', token);
                            formData.append('mine_balance', this.state.money);
                            Api.request(apiUri.getUserSale, 'POST', formData).then((responseJson) => {
                            	console.log(responseJson);
                            	if(responseJson.code == 'success') {
                            		let number = (parseInt(this.props.mine_balance)*100 - this.state.money*100)/100;
					        		this.props.update({mine_balance: number});
					        	}
						        Alert.alert(responseJson.message);
						    });
			            }}
			            />
					</View>
				</View>
			</View>
		)
	}
}
export default connect(
	(state)=>{
		return state;	
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
    }
)(HangUp)
