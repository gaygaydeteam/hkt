import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { appBg, apiUri } from '../Index';
import { connect } from 'react-redux';
import Api from '../Api/Api';

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#EEE'
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
		backgroundColor: '#fff',
		marginBottom: 10,
		alignItems: 'center',
		justifyContent: 'center',
		height: 56
	},
	itemText: {
		textAlign: 'center',
		fontSize: 16,
		lineHeight: 17,
		height: 17,
		color: '#333'
	},
	viewmore: {
		color: '#333'
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
			<View style={(this.props.style == '1') ? [styles.item, {width: 180, flex: 0}] : styles.item}>
	      		<Text style={styles.itemText}>{this.props.type}</Text>
	      	</View>
		)
	}
}

class TransactionList extends Component {
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
		showTime = timer.date + ' ' + timer.time;
		return (
		  <View style={styles.list}>
		  	<UserItem type={this.props.name} />
		  	<UserItem type={this.props.number} />
		  	<UserItem style='1' type={(this.props.head == 'true') ? this.props.time : showTime} />
		  </View>
		);
	}
}
class DynamicIncome extends Component {
    static navigationOptions = {
        title: '动态收益',
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
		Api.request(apiUri.getDynamicIncome, 'POST', formData).then((responseJson) => {
            if(responseJson.code == 'error') {
                global.toast.show(responseJson.message);
                return;
            }
	        this.setState({Buy: responseJson.data});
	    });
    }
	render () {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={{marginBottom: 20, marginTop: 10}}>
						<TransactionList head="true" name="ID" number="返佣额" time="时间"/>
						<FlatList
							keyExtractor={(item, index) => index.toString()}
							data={this.state.Buy}
							renderItem={({item}) => <TransactionList head="false" name={item.from_id} number={item.gold} time={item.add_time}/>}
						/>
					</View>
				</ScrollView>
			</View>
		)
	}
}
export default connect((state)=>{return {id: state.id, token: state.token}})(DynamicIncome)
