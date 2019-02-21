import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet, TextInput, Alert, Clipboard } from 'react-native';
import { appBg, theme } from '../Index';
import { connect } from 'react-redux';
import MyButton from '../Components/Form/MyButton';

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
	outerContent: {
		flex: 1,
		flexDirection: 'column',
      	justifyContent: "center",
		alignItems: "center",
		height: '100%'
	}
});

class ShareLink extends Component {
    static navigationOptions = {
        title: '分享链接',
    }
	constructor (props) {
	    super(props);
	    this.state = {
	    	money: '',
	    	textFromClipboard: ''
	    };
	}
	copy(){
        Clipboard.setString(this.props.link);
        Alert.alert('复制成功');
    }
	render () {
		const { link } = this.props;
		return (
			<View style={styles.container}>
				<ImageBackground source={appBg} style={styles.backgroundImage}>
					<View style={styles.content}>
						<View style={styles.outerContent}>
							<Text style={{color: '#fff', fontSize: 16,width: '60%',textAlign: 'center',marginBottom:15}}>复制该链接分享好友即可注册下载HKT</Text>
							<Text style={{color: 'gold', fontSize: 16,width: '70%'}}>{link}</Text>
						    <MyButton 
						    title="复制链接"
				            onPress={() => {
				                this.copy();
				            }}
				            />
						</View>
					</View>
			    </ImageBackground>
			</View>
		)
	}
}
export default connect((state)=>{return {link: state.share_url}})(ShareLink)