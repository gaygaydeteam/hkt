import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { appBg, theme, apiUri } from '../Index';
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
	content: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	inputContent: {
		flex: 1,
		flexDirection: 'column',
		alignItems: "center",
		justifyContent: "center",
		height: '100%'
	},
	text: {
		color: '#fff',
		fontSize: 16,
		marginBottom: 5
	}
});

class BuyDetail extends Component {
    static navigationOptions = {
        title: '购买详情',
    }
	constructor (props) {
	    super(props);
	}
	render () {
		const { id, token, navigation } = this.props;
		const item = navigation.getParam('item');

		return (
			<View style={styles.container}>
				<ImageBackground source={appBg} style={styles.backgroundImage}>
					<View style={styles.content}>
						<View style={styles.inputContent}>
							<Text style={styles.text}>售卖人: {item.name}</Text>
							{(item.bank_card == '' || item.bank_card == null) ? (
								<Text style={styles.text}>银行卡: 暂无信息</Text>
							) : (
								<Text style={styles.text}>银行卡: {item.bank_card}</Text>
							)}
							{(item.alipay == '' || item.alipay == null) ? (
								<Text style={styles.text}>支付宝: 暂无信息</Text>
							) : (
								<Text style={styles.text}>支付宝: {item.alipay}</Text>
							)}
						</View>
					</View>
			    </ImageBackground>
			</View>
		)
	}
}
export default connect(
	(state)=>{
		return state;	
	}
)(BuyDetail)
