import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { appBg, theme } from '../Index';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
	container: {
        flex: 1
    },
	backgroundImage:{
	    flex:1,
	    resizeMode: 'cover',
	    width:null,
	    width:null,
	    backgroundColor:'rgba(0,0,0,0)',
	    paddingTop: 20
	},
	text: {
		fontSize: 18,
		color: '#fff',
		width: '30%',
		textAlign: 'right',
		paddingRight: 15,
	},
	confirmWrapper: {
        width: 160,
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 60,
        backgroundColor: theme.opacityWhite,
        flexDirection: 'row',
    	justifyContent: 'center',
    },
    item: {
    	flex: 1,
    	flexDirection: 'row',
    	alignItems: "center",
    	marginBottom: 15,

    },
    confirm: {
        fontSize: 18,
        color: '#fff',
    },
    inputField: {
        width: '60%',
        marginBottom: 0
    },
    btn: {
    	flex: 1,
    	flexDirection: 'row',
    	alignItems: "center",
    	justifyContent: 'center'
    }
});

class PersonalInfo extends Component {
    static navigationOptions = {
        title: '个人信息',
    }
	constructor (props) {
	    super(props);
	    this.state = {
	    	userName: '',
	    	idCard: '',
	    	phoneNumber: '',
	    	bankCard: '',
	    	aPay: '',
	    	spreadCode: ''
	    }
	}
	render () {
        const {username, resident_id_card, alipay, bank_card, promotion_code, phone} = this.props;
        // const {username, resident_id_card, alipay, bank_card, promotion_code} = {username: 'zzz', resident_id_card: '23er2f', alipay: '1111', bank_card: '2222', promotion_code: '43324'};
		return (
			<View style={styles.container}>
				<ImageBackground source={appBg} style={styles.backgroundImage}>
					<ScrollView
					>
						<View>
							<View style={styles.item}>
								<Text style={styles.text}>姓名</Text>
								<TextInput
								autoCapitalize = 'none'
								style={(username == ''|| username == null) ? [theme.textInput, styles.inputField] : [theme.textInput, theme.textInputDisable, styles.inputField]}
							    defaultValue={username}
							    onChangeText={(value) => {
							      this.setState({
							        userName: value,
							      });
							    }}
							    placeholder="请输入名字"
							    editable={(username == ''|| username == null) ? true : false}
								/>
							</View>
						</View>
						<View>
							<View style={styles.item}>
								<Text style={styles.text}>身份证</Text>
								<TextInput
								autoCapitalize = 'none'
								style={(resident_id_card == '' || resident_id_card == null) ? [theme.textInput, styles.inputField] : [theme.textInput, theme.textInputDisable, styles.inputField]}
							    defaultValue={resident_id_card}
							    onChangeText={(value) => {
							      this.setState({
							        idCard: value,
							      });
							    }}
							    placeholder="请输身份证"
							    editable={(resident_id_card == '' || resident_id_card == null) ? true : false}
								/>
							</View>
						</View>
						<View>
							<View style={styles.item}>
								<Text style={styles.text}>手机号</Text>
								<TextInput
								autoCapitalize = 'none'
								style={(phone == '' || phone == null) ? [theme.textInput, styles.inputField] : [theme.textInput, theme.textInputDisable, styles.inputField]}
							    defaultValue={phone}
							    maxLength={11}
							    keyboardType="numeric"
							    onChangeText={(value) => {
							      const newPhone = value.replace(/[^\d]+/, '');
							      this.setState({
							        phoneNumber: newPhone,
							      });
							    }}
							    placeholder="请输入手机号"
							    editable={(phone == '' || phone == null) ? true : false}
								/>
							</View>
						</View>
						<View>
							<View style={styles.item}>
								<Text style={styles.text}>银行卡号</Text>
								<TextInput
								autoCapitalize = 'none'
								style={(bank_card == '' || bank_card == null) ? [theme.textInput, styles.inputField] : [theme.textInput, theme.textInputDisable, styles.inputField]}
							    defaultValue={bank_card}
							    onChangeText={(value) => {
							      this.setState({
							        bankCard: value,
							      });
							    }}
							    placeholder="请输入银行卡号"
							    editable={(bank_card == '' || bank_card == null) ? true : false}
								/>
							</View>
						</View>
						<View>
							<View style={styles.item}>
								<Text style={styles.text}>支付宝</Text>
								<TextInput
								autoCapitalize = 'none'
								style={(alipay == '' || alipay == null) ? [theme.textInput, styles.inputField] : [theme.textInput, theme.textInputDisable, styles.inputField]}
							    defaultValue={alipay}
							    onChangeText={(value) => {
							      this.setState({
							        aPay: value,
							      });
							    }}
							    placeholder="请输入支付宝号"
							    editable={(alipay == '' || alipay == null) ? true : false}
								/>
							</View>
						</View>
						<View>
							<View style={styles.item}>
								<Text style={styles.text}>推广码</Text>
								<TextInput
								autoCapitalize = 'none'
								style={(promotion_code == '' || promotion_code == null) ? [theme.textInput, styles.inputField] : [theme.textInput, theme.textInputDisable, styles.inputField]}
							    defaultValue={promotion_code}
							    onChangeText={(value) => {
							      this.setState({
							        spreadCode: value,
							      });
							    }}
							    placeholder="请输入推广码"
							    editable={(promotion_code == '' || promotion_code == null) ? true : false}
								/>
							</View>
						</View>
						<View style={styles.btn}>
							<View style={styles.confirmWrapper}>
	                            <Text style={styles.confirm}>确定</Text>
	                        </View>
                        </View>
					</ScrollView>
			    </ImageBackground>
			</View>
		)
	}
}
export default connect(
    (state) => {
        console.log(state);
        return state;
    }
)(PersonalInfo)
