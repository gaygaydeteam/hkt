import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { appBg, theme, apiUri } from '../Index';
import MyButton from '../Components/Form/MyButton';
import Api from  '../Api/Api';
import { connect } from 'react-redux';
const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#eee'
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
	confirmBtn: {
		minWidth: 140,
		marginTop: 30,
		height: 40,
	},
	money: {
		backgroundColor: '#fff',
		height: 50,
		minWidth: 120,
		marginRight: 15,
		textAlign: 'center',
		lineHeight: 50,
		borderWidth: 1,
		borderColor: '#fff',
		fontSize: 18
	},
	inputStyle: {
		height: 40,
		backgroundColor: '#ffffff',
		width: '60%',
		paddingLeft: 10,
		paddingRight: 10,
	},
	moneyActive: {
		color: '#49AAF0',
		borderWidth: 1,
		borderColor: '#49AAF0'
	},
	listWrapper: {
		flex: 1,
		height: '100%',
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	list: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	}
});

const money = [
	{
		number: '5000',
		key: '0'
	},{
		number: '10000',
		key: '1'
	}
]
class Buy extends Component {
    static navigationOptions = {
        title: '买入',
    }
	constructor (props) {
	    super(props);
	    this.state = {
	    	isActive: '',
            code: '',
            machine_specifications: '',
	    };
    }
    buy = () => {
        const { id, token, maintain_currency } = this.props;
        const machine_specifications = this.state.machine_specifications;
        let fd = new FormData();
        fd.append('id', id);
        fd.append('token', token);
        fd.append('machine_specifications', machine_specifications);
        Api.request(apiUri.userBuy, 'POST', fd).then((res) => {
            console.log(res);
            if(res.code == 'success') {
    			let number = Number(this.props.maintain_currency) - (Number(machine_specifications)/1000);
        		this.props.update({maintain_currency: number});
        	}
        	global.toast.show(res.message);
        });
    }
	render () {
		return (
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={styles.listWrapper}>
						<View style={styles.list}>
							{money.map((item, index) => {
								return <Text onPress={() => {
									this.setState({isActive: item.key, machine_specifications: item.number})
								}} style={(this.state.isActive == item.key) ? [styles.money, styles.moneyActive] : styles.money} key={item.key}>{item.number}</Text>
							})}
						</View>
                        <MyButton title="购买" onPress={this.buy}/>
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
        update: (userInfo) => {
            console.log('update user info');
            dispatch({
                type: 'UPDATE_USER_INFO',
                userInfo,
            })
        }
    }
})(Buy)


//<Text style={{color: '#fff', marginTop:10, marginBottom:10}}>请输入支付宝/银行卡号</Text>
// <TextInput
// 	keyboardType="numeric"
// 	placeholder="请输入交易方式(支付宝号/银行卡号)"
// 	style={styles.inputStyle}
//     onChangeText={(code) => {
//     	this.setState({code: newText})
//     }}
//     value={this.state.code}
// />
