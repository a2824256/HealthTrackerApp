import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    Alert,
    TouchableHighlight,
    TextInput,
} from 'react-native';
import NavBar from './component/NavBar';
import Dimensions from 'Dimensions';
const {width} = Dimensions.get('window');
export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dev_id: 20180326,
            token: 0,
        }
        this.toSignUp = this.toSignUp.bind(this);
    }

    login() {
        this.props.login(this.state.ip,this.state.port);
    }

    toSignUp(){
        this.props.toSignUp();
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
                <NavBar title={'Health Tracker'}/>
                <View style={{flex: 1}}>
                    <View style={styles.content}>
                        <View style={{height: 2}}/>
                        <TextInput
                            style={styles.TextInput}
                            placeholder='Account'
                            autoCapitalize='none'
                            textAlign='center'
                            onChangeText={(token) => this.setState({token})}
                            underlineColorAndroid='transparent'
                        />
                        <View style={{height: 2}}/>
                        <TextInput
                            style={styles.TextInput}
                            secureTextEntry={true}
                            placeholder='Password'
                            autoCapitalize='none'
                            textAlign='center'
                            onChangeText={(dev_id) => this.setState({dev_id})}
                            underlineColorAndroid='transparent'
                        />
                        <TouchableHighlight onPress={this.login} underlayColor="#52ABFF"
                                            style={styles.login_button}>
                            <Text style={{color: '#fff'}}>Sign in</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.toSignUp} underlayColor="#52ABFF"
                                            style={styles.register_button}>
                            <Text style={{color: '#6295ff'}}>Sign up</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.Copyright}>
                    <View style={{flex: 4}}>
                    </View>
                    <View style={{flex: 1}}>
                        <Text>Copyright (c) 2018 by Alex Leung</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        marginTop: 10,
        height: 150,
    },
    Copyright: {
        marginTop: 100,
        alignItems: 'center',
        // backgroundColor: '#4169E1'
    },
    title: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    login_button: {
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        marginLeft: 40,
        marginRight: 40,
        borderColor: '#26c474',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#26c474'
    },
    register_button: {
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        marginLeft: 40,
        marginRight: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#7a7a7a',
    },
    TextInput: {
        height: 40,
        backgroundColor: '#fff',
    },
});
