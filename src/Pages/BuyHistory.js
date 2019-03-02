import React, { Component } from 'react';
import { Alert, TouchableWithoutFeedback, ImageBackground, Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { appBg, apiUri } from '../Index';
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
	item: {
		flex: 1,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: 'rgba(255,255,255,0.2)',
		marginBottom: 6
	},
	itemText: {
		textAlign: 'center',
		fontSize: 16,
		lineHeight: 17,
		height: 17,
		color: '#ffffff'
	},
	viewmore: {
		color: '#fff'
	},
	list: {
		flex: 1,
		flexDirection: 'row',
      	justifyContent: "center",
		alignItems: "center",
	}
});
class UserItem extends Component {
	render() {
		return (
			<View style={(this.props.style == '1') ? [styles.item, {width: 160, flex: 0}] : styles.item}>
	      		<Text style={styles.itemText}>{this.props.type}</Text>
	      	</View>
		)
	}
}

class TransactionList extends Component {
	getNewData = (dateTemp, days) => {
	   var dateTemp = dateTemp.split("-");
	   var nDate = new Date(dateTemp[1] + '/' + dateTemp[2] + '/' + dateTemp[0]);
	   var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);  
	   var rDate = new Date(millSeconds);  
	   var year = rDate.getFullYear();  
	   var month = rDate.getMonth() + 1;
	   if (month < 10) month = "0" + month;  
	   var date = rDate.getDate();  
	   if (date < 10) date = "0" + date;  
	   return (year + "-" + month + "-" + date);  
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

		return {date,time};
	}
  	render() {
	  	let timer = this.changeData(this.props.time);
	  	let unlockTime = this.getNewData(timer.date, 10);
	  	showTime = timer.date + ' ' + timer.time;
	  	unlockTime = unlockTime + ' ' + timer.time;
	    return (
	      <View style={styles.list}>
	      	<UserItem type={this.props.number} />
	      	<UserItem style='1' type={(this.props.head == 'true') ? this.props.time : showTime} />
	      	<TouchableWithoutFeedback onPress={() => {
	      		if(this.props.head != 'true') {
	      			this.props.nav.navigate('BuyDetail', {
		            	item: this.props.info,
		            	unlockTime: unlockTime
		            })
	      		}
	      	}}>
	      		<View style={styles.item}>
		      		<Text style={styles.itemText}>{this.props.detail}</Text>
		      	</View>
	      	</TouchableWithoutFeedback>
	      </View>
	    );
  	}
}
class BuyHistory extends Component {
    static navigationOptions = {
        title: '购买记录',
    }
	constructor (props) {
	    super(props);
	    this.state = {
	    	Buy: null
        }
	}
	componentDidMount() {
        const { id, token } = this.props;
		let formData = new FormData();
		formData.append('id', id);
		formData.append('token', token);
		Api.request(apiUri.getBuyHistory, 'POST', formData).then((responseJson)=>{
			if(responseJson.code == 'error') {
                global.toast.show(responseJson.message);
                return;
            }
            this.setState({Buy: responseJson.data})
        })
    }
	render () {
		return (
			<View style={styles.container}>
				<ImageBackground source={appBg} style={styles.backgroundImage}>
					<ScrollView>
						<View style={{marginBottom: 20, marginTop: 10}}>
							<TransactionList head="true" number="购买数量" time="挂单时间" detail="详细信息"/>
							<FlatList
								keyExtractor={(item, index) => index.toString()}
								data={this.state.Buy}
								renderItem={({item}) => <TransactionList head="false" nav={this.props.navigation} info={item} number={item.money} time={item.add_time} detail="详情"/>}
							/>
						</View>
					</ScrollView>
			    </ImageBackground>
			</View>
		)
	}
}
export default connect((state) => state)(BuyHistory)