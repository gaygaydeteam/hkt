import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
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
	},
	title: {
		textAlign: 'center',
		color: 'white',
		fontSize: 16,
		marginBottom: 15
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
      	<UserItem type={this.props.number} />
      	<UserItem type={this.props.time} />
      	<UserItem type={this.props.remark} />
      </View>
    );
  }
}
class TotalDetail extends Component {
    static navigationOptions = {
        title: '总账明细',
    }
	constructor (props) {
	    super(props);
	    this.state = {
	    	Total: null
	    }
	}
	componentDidMount() {
        const { id, token } = this.props;
		let formData = new FormData();
		let formData1 = new FormData();
		formData.append('id', id);
		formData.append('token', token);
		Api.request(apiUri.getTotalDetail, 'POST', formData).then((responseJson) => {
            if(responseJson.code == 'error') {
            	const message = responseJson.message;
                global.toast.show(message);
                return;
            }
	        this.setState({Total: responseJson.data});
	    });
    }
	render () {
		return (
			<View style={styles.container}>
				<ImageBackground source={appBg} style={styles.backgroundImage}>
					<ScrollView>
						<View style={{marginBottom: 20, marginTop: 10}}>
							<Text style={styles.title}>矿机交易记录</Text>
							<TransactionList number="数量" time="购买时间" remark="备注"/>
							<FlatList
								keyExtractor={(item, index) => index.toString()}
								data={this.state.Total}
								renderItem={({item}) => <TransactionList number={item.money} time={item.add_time} remark={item.remark}/>}
							/>
						</View>
					</ScrollView>
			    </ImageBackground>
			</View>
		)
	}
}
export default connect((state)=>{return {id: state.id, token: state.token}})(TotalDetail)
