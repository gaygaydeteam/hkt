import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { appBg, theme, apiUri } from '../Index';
import { connect } from 'react-redux';
import Api from '../Api/Api';

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
	text: {
		color: '#fff',
		fontSize: 16,
		marginBottom: 10
	},
	infoWrapper: {
		backgroundColor: 'rgba(255,255,255,0.2)',
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 5,
		width: '90%',
		marginBottom: 10
	},
	list: {
		height: '100%',
		flex: 1,
		alignItems: "center",
	},
	lastInfo: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	btn: {
		color: '#05a5d1'
	}
});
const orderInfo = {
	name: '李四',
	orderType: '支付宝'
}
class MyOrder extends Component {
	static navigationOptions = {
        title: '当前交易',
    }
	constructor (props) {
	    super(props);
	    this.state = {
	    	Info: []
	    };
	}
	componentDidMount() {
        const { id, token } = this.props;
		let formData = new FormData();
		formData.append('id', id);
		formData.append('token', token);
		Api.request(apiUri.getMyOrder, 'POST', formData).then((responseJson) => {
            if(responseJson.code == 'error') {
                global.toast.show(responseJson.message);
                return;
            }
	        this.setState({Info: responseJson.data});
	    });
    }
	render () {
		return (
			<View style={styles.container}>
				<ImageBackground source={appBg} style={styles.backgroundImage}>
					<ScrollView style={{marginTop: 10}}>
						<View style={styles.list}>
							{this.state.Info.map((item, index) => (
								<View style={styles.infoWrapper} key={index}>
									<Text style={styles.text}>已出单</Text>
									<Text style={styles.text}>{(item.role == 1) ? '购入人姓名' : '售卖人姓名' } : {(item.role == 1) ? item.buy_name : item.sale_name}</Text>
									<Text style={styles.text}>支付宝: {(item.role == 1) ? item.buy_alipay : item.sale_alipay}</Text>
									<Text style={styles.text}>银行卡: {(item.role == 1) ? item.buy_bank_card : item.sale_bank_card}</Text>
									<View style={styles.lastInfo}>
										<TouchableOpacity onPress={() => {}}><Text style={styles.btn}>{(item.role == 1) ? '打出款项' : '收到款项'}</Text></TouchableOpacity>
										<Text style={{color: '#fff'}}>进入交易中心查看</Text>
									</View>
								</View>
							))}
						</View>
					</ScrollView>
			    </ImageBackground>
			</View>
		)
	}
}
export default connect((state)=>{return {id: state.id, token: state.token}})(MyOrder)
