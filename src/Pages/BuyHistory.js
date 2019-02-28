import React, { Component } from 'react';
import { TouchableWithoutFeedback, ImageBackground, Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
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
      	<TouchableWithoutFeedback onPress={() => {
      		if(this.props.detail != '详细信息') {
      			this.props.nav.navigate('BuyDetail', {
	            	item: this.props.info,
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
							<TransactionList number="购买数量" time="挂单时间" detail="详细信息"/>
							<FlatList
								keyExtractor={(item, index) => index.toString()}
								data={this.state.Buy}
								renderItem={({item}) => <TransactionList nav={this.props.navigation} info={item} number={item.money} time={item.add_time} detail="详情"/>}
							/>
						</View>
					</ScrollView>
			    </ImageBackground>
			</View>
		)
	}
}
export default connect((state) => state)(BuyHistory)