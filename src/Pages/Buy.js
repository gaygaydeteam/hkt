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
	confirmBtn: {
		minWidth: 140,
		marginTop: 30,
		height: 40,
	},
	money: {
		backgroundColor: '#fff',
		height: 40,
		minWidth: 100,
		marginRight: 15,
		textAlign: 'center',
		lineHeight: 40,
		fontSize: 16
	},
	inputStyle: {
		height: 40,
		backgroundColor: '#ffffff',
		width: '60%',
		paddingLeft: 10,
		paddingRight: 10,
	},
	moneyActive: {
		color: '#cc9933'
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
        const { id, token } = this.props;
        const machine_specifications = this.state.machine_specifications;
        let fd = new FormData();
        fd.append('id', id);
        fd.append('token', token);
        fd.append('machine_specifications', machine_specifications);
        Api.request(apiUri.userBuy, 'POST', fd).then((res) => {
            console.log(res);
            if(res.code == 'error') {
                global.toast.show(res.message);
            }
            if (res.code == 'success') {
                global.toast.show(res.message);
            }
        });
    }
	render () {
		return (
			<View style={styles.container}>
				<ImageBackground source={appBg} style={styles.backgroundImage}>
					<Text style={styles.title}>矿机规格</Text>
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
			    </ImageBackground>
			</View>
		)
	}
}
export default connect((state) => state)(Buy)


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
