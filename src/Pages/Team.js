import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';
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
	text: {
		color: '#fff',
		marginBottom: 15,
		marginTop: 15,
		textAlign: 'center',
		fontSize: 18
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

class UserList extends Component {
  render() {
    return (
      <View style={styles.list}>
      	<UserItem type={this.props.id} />
      	<UserItem type={this.props.level} />
      	<UserItem type={this.props.standard} />
      	<UserItem type={this.props.superior} />
      </View>
    );
  }
}

class Team extends Component {
    static navigationOptions = {
        title: '团队',
    }
	constructor (props) {
	    super(props);
	    this.state = {
	    	Team1: '',
	    	Team2: '',
	    	Team3: '',
	    }
	}
	componentDidMount() {
        const { id, token } = this.props;
		let formData = new FormData();
		formData.append('id', id);
		formData.append('token', token);
		Api.request(apiUri.getUserFamily, 'POST', formData).then((responseJson) => {
	      this.setState({Team1: responseJson.data.list1});
	      this.setState({Team2: responseJson.data.list2});
	      this.setState({Team3: responseJson.data.list3});
	    });
    }
    keyExtractor = (item, index) => item.id;
	render () {
		return (
			<View style={styles.container}>
				<ImageBackground source={appBg} style={styles.backgroundImage}>
					<ScrollView>
						<Text style={styles.text}>直推</Text>
						<UserList id="ID" standard="矿机规格" superior="推广码" />
						<FlatList
                            data={this.state.Team1}
                            keyExtractor={this.keyExtractor}
                            renderItem={({item}) =>
                                <UserList
                                    id={item.id}
                                    standard={item.machine_specifications}
                                    superior={item.promotion_code}
                                />
                            }
						/>
						<Text style={styles.text}>间推</Text>
						<UserList id="ID" standard="矿机规格" superior="推广码" />
						<FlatList
                            data={this.state.Team2}
                            keyExtractor={this.keyExtractor}
                            renderItem={({item}) =>
                                <UserList
                                    id={item.id}
                                    standard={item.machine_specifications}
                                    superior={item.promotion_code}
                                />
                            }
						/>
						<Text style={styles.text}>二级间推</Text>
						<UserList id="ID" standard="矿机规格" superior="推广码" />
						<FlatList
                            data={this.state.Team3}
                            keyExtractor={this.keyExtractor}
                            renderItem={({item}) =>
                                <UserList
                                    id={item.id}
                                    standard={item.machine_specifications}
                                    superior={item.promotion_code}
                                />
                            }
						/>
					</ScrollView>
			    </ImageBackground>
			</View>
		)
	}
}
export default connect((state)=>{return {id: state.id, token: state.token}})(Team)
