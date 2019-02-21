import React from 'react';
import { View } from 'react-native';
import { Button, InputItem, List } from '@ant-design/react-native';
export default class SignUp extends React.Component {
    static navigationOptions = {
        title: '注册'
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            captcha: ''
        };
    }
    render() {
        const { text, phone, captcha, navigation } = this.props;
        console.log(navigation.getParam('id'))
        return (
                <List>
                    <InputItem
                        clear
                        error
                        value={this.state.text}
                        onChange={value => {
                        this.setState({
                            text: value,
                        });
                        }}
                        placeholder="text"
                    >
                        名称
                    </InputItem>
                    <InputItem
                        clear
                        type="phone"
                        value={this.state.phone}
                        onChange={value => {
                        this.setState({
                            phone: value,
                        });
                        }}
                        placeholder="phone"
                    >
                        手机号
                    </InputItem>
                    <View>
                        <InputItem
                            clear
                            type="number"
                            value={this.state.captcha}
                            onChange={value => {
                            this.setState({
                                captcha: value,
                            });
                            }}
                            placeholder="number"
                        >
                            验证码
                        </InputItem>              
                        <Button type="primary">发送</Button>
                    </View>
                    <Button type="primary">注册</Button>
                </List>

        )
    }
}
