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

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: null,
            password: null
        }
        this.login = this.login.bind(this);
        this.toSignUp = this.toSignUp.bind(this);
    }

    login() {
        if (this.state.account == null || this.state.password == null) {
            Alert.alert("Value cannot be null");
        }else{
            this.props.login(this.state.account, this.state.password);
        }
    }

    toSignUp() {
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
                            onChangeText={(account) => this.setState({account})}
                            underlineColorAndroid='transparent'
                        />
                        <View style={{height: 2}}/>
                        <TextInput
                            style={styles.TextInput}
                            secureTextEntry={true}
                            placeholder='Password'
                            autoCapitalize='none'
                            textAlign='center'
                            onChangeText={(password) => this.setState({password})}
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
