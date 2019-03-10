import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { appBg, theme, apiUri } from '../Index';
import { connect } from 'react-redux';
import Api from  '../Api/Api';
import MyButton from '../Components/Form/MyButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
	container: {
        flex: 1
    },
    contentWrapper: {
    	flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	marginTop: 10
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
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderBottomWidth: 1,
        borderColor: '#DDD',
        marginBottom: 20
    },
});

class PersonalInfo extends Component {
    static navigationOptions = {
        title: '实名认证',
    }
	constructor (props) {
	    super(props);
	    this.state = {
	    	userName: this.props.real_name,
	    	idCard: this.props.resident_id_card,
	    	phoneNumber: this.props.phone,
	    	bankCard: this.props.bank_card,
	    	aPay: this.props.alipay,
	    	spreadCode: this.props.promotion_code
	    }
	}
	render () {
        const {real_name, resident_id_card, alipay, bank_card, promotion_code, phone} = this.props;
        // const {username, resident_id_card, alipay, bank_card, promotion_code} = {username: 'zzz', resident_id_card: '23er2f', alipay: '1111', bank_card: '2222', promotion_code: '43324'};
		return (
			<View style={styles.container}>
				<ScrollView
				>	
					<View style={styles.contentWrapper}>
						<View style={styles.inputWrapper}>
							<Text style={styles.inputText}>姓名</Text>
							<TextInput
							placeholderTextColor={theme.lightGray}
							autoCapitalize = 'none'
							style={(real_name == ''|| real_name == null) ? [theme.textInput, styles.customInput] : [theme.textInput, theme.textInputDisable, styles.customInput]}
						    defaultValue={real_name}
						    onChangeText={(value) => {
						      this.setState({
						        userName: value,
						      });
						    }}
						    placeholder="请输入名字"
						    editable={(real_name == ''|| real_name == null) ? true : false}
							/>
							<FontAwesome name={'angle-down'} size={30} color="#BBB" />
						</View>
						<View style={styles.inputWrapper}>
							<Text style={styles.inputText}>身份证</Text>
							<TextInput
							placeholderTextColor={theme.lightGray}
							autoCapitalize = 'none'
							style={(resident_id_card == '' || resident_id_card == null) ? [theme.textInput, styles.customInput] : [theme.textInput, theme.textInputDisable, styles.customInput]}
						    defaultValue={resident_id_card}
						    onChangeText={(value) => {
						      this.setState({
						        idCard: value,
						      });
						    }}
						    placeholder="请输入身份证"
						    editable={(resident_id_card == '' || resident_id_card == null) ? true : false}
							/>
							<FontAwesome name={'angle-down'} size={30} color="#BBB" />
						</View>
						<View style={styles.inputWrapper}>
							<Text style={styles.inputText}>手机号</Text>
							<TextInput
							placeholderTextColor={theme.lightGray}
							autoCapitalize = 'none'
							style={(phone == '' || phone == null) ? [theme.textInput, styles.customInput] : [theme.textInput, theme.textInputDisable, styles.customInput]}
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
							<FontAwesome name={'angle-down'} size={30} color="#BBB" />
						</View>
						<View style={styles.inputWrapper}>
							<Text style={styles.inputText}>银行卡号</Text>
							<TextInput
							placeholderTextColor={theme.lightGray}
							autoCapitalize = 'none'
							style={(bank_card == '' || bank_card == null) ? [theme.textInput, styles.customInput] : [theme.textInput, theme.textInputDisable, styles.customInput]}
						    defaultValue={bank_card}
						    onChangeText={(value) => {
						      this.setState({
						        bankCard: value,
						      });
						    }}
						    placeholder="银行卡号仅限四大行"
						    editable={(bank_card == '' || bank_card == null) ? true : false}
							/>
							<FontAwesome name={'angle-down'} size={30} color="#BBB" />
						</View>
						<View style={styles.inputWrapper}>
							<Text style={styles.inputText}>支付宝</Text>
							<TextInput
							placeholderTextColor={theme.lightGray}
							autoCapitalize = 'none'
							style={(alipay == '' || alipay == null) ? [theme.textInput, styles.customInput] : [theme.textInput, theme.textInputDisable, styles.customInput]}
						    defaultValue={alipay}
						    onChangeText={(value) => {
						      this.setState({
						        aPay: value,
						      });
						    }}
						    placeholder="请输入支付宝账号"
						    editable={(alipay == '' || alipay == null) ? true : false}
							/>
							<FontAwesome name={'angle-down'} size={30} color="#BBB" />
						</View>
						<View style={styles.inputWrapper}>
							<Text style={styles.inputText}>推广码</Text>
							<TextInput
							placeholderTextColor={theme.lightGray}
							autoCapitalize = 'none'
							style={(promotion_code == '' || promotion_code == null) ? [theme.textInput, styles.customInput] : [theme.textInput, theme.textInputDisable, styles.customInput]}
						    defaultValue={promotion_code}
						    onChangeText={(value) => {
						      this.setState({
						        spreadCode: value,
						      });
						    }}
						    placeholder="请输入推广码"
						    editable={(promotion_code == '' || promotion_code == null) ? true : false}
							/>
							<FontAwesome name={'angle-down'} size={30} color="#BBB" />
						</View>
						<MyButton
						    title="确定"
						    style={{container: {marginTop: 20}}}
						    onPress={() => {
								const { id, token } = this.props;
						        let fd = new FormData();
						        fd.append('id', id);
						        fd.append('token', token);
						        fd.append('name', this.state.userName);
						        fd.append('bank_card', this.state.bankCard);
						        fd.append('resident_id_card', this.state.idCard);
						        fd.append('alipay', this.state.aPay);
						        console.log(fd);
						        Api.request(apiUri.getRealName, 'POST', fd).then((res) => {
						        	if(res.code == 'success') {
						        		this.props.update(res.data);
						        	}
						            global.toast.show(res.message);
						        });
							}}
						/>
					</View>
				</ScrollView>
			</View>
		)
	}
}

export default connect(
    (state) => {
        console.log(state);
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
)(PersonalInfo)
