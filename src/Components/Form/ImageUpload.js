import React from 'react';
import { connect } from 'react-redux'
import { View, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { appBg, theme, apiUri } from "../../Index";
import MyButton from './MyButton';
import Api from "../../Api/Api";
const Styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000',
    },
    image: {
        width: 300,
        height: 400,
    },
    upload: {

    }
}
class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '',
        }
    }
    createImagePicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({imageUrl: image.sourceURL})
        });

    }
    showUploadImage = (imageUrl) => {
        if(imageUrl) {
            return <Image style={Styles.image} source={{uri: imageUrl}}/>
        }
    }
    render() {
        const {imageUrl} = this.state;
        console.log(imageUrl);
        return (
            <View style={Styles.container}>
                <View>

                </View>
                {this.showUploadImage(imageUrl)}
                <MyButton title="上传图片" activeOpacity={.5} onPress={this.createImagePicker}/>
            </View>
        );
    }
}
export default connect(

)(ImageUpload);
