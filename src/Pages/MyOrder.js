import React, { Component } from 'react';
import { Alert, ImageBackground, Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { appBg, theme, apiUri } from '../Index';
import { connect } from 'react-redux';
import Api from '../Api/Api';
import ImagePicker from 'react-native-image-crop-picker';
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
        flexWrap: 'nowrap',
		justifyContent: 'space-between',
	},
	btnRemit: {
		color: '#05a5d1'
    },
    btnUpload: {
        color: '#05a5d1'
    }
});
const orderInfo = {
	name: '李四',
	orderType: '支付宝'
}
class MyOrder extends Component {
	static navigationOptions = {
        title: '当前状态',
    }
	constructor (props) {
	    super(props);
	    this.state = {
            Info: [],
            uploadSuccess: false,
            btnUploadText: '上传凭证',
            imageRemoteUrl: '',
	    };
	}
	componentWillMount() {
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
    uploadImage = (id, token, url) => {
        let formData = new FormData();
        formData.append('id', id);
        formData.append('token', token);
        formData.append('image', url);
        Api.request(apiUri.uploadImage, 'POST', formData).then((res) => {
            if(res.code == 'success') {
                this.setState({
                    btnUploadText: '已上传',
                    uploadSuccess: true,
                    imageRemoteUrl: res.data.image_url,
                })
            }
            Alert.alert(res.message);
        });
    }
    changeData = (temp) => {
		var year = temp.slice(0,4);
		var month = temp.slice(4,6);
		var day = temp.slice(6,8);
		var date = [year,month,day].join('-');

		var hour = temp.slice(8,10);
		var minute = temp.slice(10,12);
		var second = temp.slice(12,14);
		var time = [hour,minute,second].join(':');

		return (date + ' ' + time);
	}
	render () {
        const { id, token } = this.props;
        const { btnUploadText, uploadSuccess, imageRemoteUrl } = this.state;
		return (
			<View style={styles.container}>
				<ImageBackground source={appBg} style={styles.backgroundImage}>
					<ScrollView style={{marginTop: 10}}>
						<View style={styles.list}>
							{this.state.Info.map((item, index) => (
								<View style={styles.infoWrapper} key={index}>
									{(item.role == '') ? (
										<View>
											<Text style={styles.text}>{(item.role == 'saler') ? '挂卖' : '挂买'}匹配中</Text>
											<Text style={styles.text}>订单时间: {this.changeData(item.add_time)}</Text>
											<Text style={styles.text}>HKT数量: {item.money}</Text>
										</View>
									) : (
										<View>
											<Text style={styles.text}>{(item.role == 'saler') ? '挂卖' : '挂买'}已出单</Text>
											<Text style={styles.text}>订单时间: {this.changeData(item.add_time)}</Text>
											{(item.role == 'saler') ? (
												(item.buy_name == '' || item.buy_name == null) ? null : (
													<Text style={styles.text}>购入人姓名: {item.buy_name}</Text>
												)
											) : (
												(item.sale_name == '' || item.sale_name == null) ? null : (
													<Text style={styles.text}>购入人姓名: {item.sale_name}</Text>
												)
											)}
											{(item.role == 'saler') ? (
												(item.buy_alipay == '' || item.buy_alipay == null) ? null : (
													<Text style={styles.text}>支付宝: {item.buy_alipay}</Text>
												)
											) : (
												(item.sale_alipay == '' || item.sale_alipay == null) ? null : (
													<Text style={styles.text}>支付宝: {item.sale_alipay}</Text>
												)
											)}
											{(item.role == 'saler') ? (
												(item.buy_bank_card == '' || item.buy_bank_card == null) ? null : (
													<Text style={styles.text}>银行卡: {item.buy_bank_card}</Text>
												)
											) : (
												(item.sale_bank_card == '' || item.sale_bank_card == null) ? null : (
													<Text style={styles.text}>银行卡: {item.sale_bank_card}</Text>
												)
											)}
											{(item.role == 'saler') ? (
												(item.buy_phone == '' || item.buy_phone == null) ? null : (
													<Text style={styles.text}>联系方式: {item.buy_phone}</Text>
												)
											) : (
												(item.sale_phone == '' || item.sale_phone == null) ? null : (
													<Text style={styles.text}>联系方式: {item.sale_phone}</Text>
												)
											)}
											<Text style={styles.text}>HKT数量: {item.money}</Text>
											<View style={styles.lastInfo}>
												{(item.role == 'saler' && item.status == 1) ? (
			                                        <TouchableOpacity onPress={()=> {
			                                            ImagePicker.openPicker({
			                                                width: 450,
			                                                height: 800,
			                                                cropping: true,
			                                                writeTempFile: false,
			                                                compressImageQuality: 1,
			                                                includeBase64: true,
			                                                cropperChooseText: '选择',
			                                                cropperCancelText: '取消',
			                                            }).then(image => {
			                                                console.log(image);
			                                                if(image.size > 5000000) {
			                                                    Alert.alert('图片不能大于5M');
			                                                    return;
			                                                }
			                                                let base64uri = 'data:' + image.mime + ';base64,' + image.data;
			                                                console.log(base64uri);
			                                                this.uploadImage(id, token, base64uri);
			                                            }).catch(error => {
			                                                console.log(error);
			                                            });
			                                        }}>
			                                            <Text style={styles.btnUpload}>{(item.role == 'saler') ? btnUploadText : ''}</Text>
			                                        </TouchableOpacity>
			                                        ) : null
												}
												{(item.status == 0) ? (
													<Text style={styles.btnRemit}>已打款</Text>
												) : (
													<TouchableOpacity onPress={() => {
			                                            if(!uploadSuccess && item.role == 'saler') {
			                                                Alert.alert('请先上传凭证');
			                                                return;
			                                            }
														let formData = new FormData();
														formData.append('id', id);
														formData.append('token', token);
			                                            formData.append('list_id', item.list_id);
			                                            formData.append('image_url', imageRemoteUrl)
														Api.request(apiUri.getDealCheck, 'POST', formData).then((responseJson) => {
															if(responseJson.code == 'success') {
																let formData1 = new FormData();
																formData.append('id', id);
																formData.append('token', token);
																Api.request(apiUri.getMyOrder, 'POST', formData1).then((responseJson) => {
														            if(responseJson.code == 'error') {
														                global.toast.show(responseJson.message);
														                return;
														            }
															        this.setState({Info: responseJson.data});
															    });
															}
												            Alert.alert(responseJson.message);
													    });
													}}>
			                                            <Text style={styles.btnRemit}>{(item.role == 'buyer') ? '确认收款' : '确认打款'}</Text>
			                                        </TouchableOpacity>
												)}
											</View>
										</View>
									)}

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