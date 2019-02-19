import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { appBg, apiUri } from '../Index';
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
	subtitle: {
		color: '#fff',
		fontSize: 18
	},
	viewmore: {
		color: '#fff'
	},
	subcontent: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
		paddingRight: 15,
		marginBottom: 10
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
			<View style={styles.item}>
	      		<Text style={styles.itemText}>{this.props.type}</Text>
	      	</View>
		)
	}
}

class TransactionList extends Component {
  render() {
    return (
      <View style={styles.list}>
      	<UserItem type={this.props.name} />
      	<UserItem type={this.props.number} />
      	<UserItem type={this.props.time} />
      </View>
    );
  }
}
export default class Transaction extends Component {
    static navigationOptions = {
        title: '交易大厅',
    }
	constructor (props) {
	    super(props);
	    this.state = {
	    	Sale: null,
	    	Buy: null
        }
        Api.request(apiUri.getSaleList, 'POST').then((responseJson) => {
            if(responseJson.code == 'error') {
                global.toast.show(responseJson.message);
                return;
            }
            this.setState({Sale: responseJson.data.slice(0,4)})
        });
        Api.request(apiUri.getBuyHistory, 'POST').then((responseJson) => {
            if(responseJson.code == 'error') {
                global.toast.show(responseJson.message);
                return;
            }
            this.setState({Buy: responseJson.data.slice(0,4)})
        });
	}
	render () {
		return (
			<View style={styles.container}>
				<ImageBackground source={appBg} style={styles.backgroundImage}>
					<ScrollView>
						<View style={{marginBottom: 20, marginTop: 20}}>
							<View style={styles.subcontent}>
								<Text style={styles.subtitle}>买入</Text>
								<Text style={styles.viewmore}>更多</Text>
							</View>
							<TransactionList name="id" number="规格" time="挂单时间"/>
							<FlatList
								keyExtractor={(item, index) => index.toString()}
								data={this.state.Buy}
								renderItem={({item}) => <TransactionList name={item.id} number={item.purchase_quantity} time={item.purchase_time}/>}
							/>
						</View>
						<View>
							<View style={styles.subcontent}>
								<Text style={styles.subtitle}>卖出</Text>
								<Text style={styles.viewmore}>更多</Text>
							</View>
							<TransactionList name="id" number="数量" time="时间"/>
							<FlatList
								keyExtractor={(item, index) => index.toString()}
								data={this.state.Sale}
								renderItem={({item}) => <TransactionList name={item.id} number={item.hanging_amount} time={item.hanging_time}/>}
							/>
						</View>
					</ScrollView>
			    </ImageBackground>
			</View>
		)
	}
}
