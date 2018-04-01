import React, {Component} from 'react';
import {
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
export default class ConnectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dev_id: 20180326,
            token: 0,
            port: '2345',
            ip: '127.0.0.1'
        }
        this.connect = this.connect.bind(this);
    }

    connect() {
        this.props.connect(this.state.ip,this.state.port);
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
                <NavBar title={'Health Tracker'}/>
                <View style={{flex: 1}}>
                    <View style={styles.content}>
                        <TextInput
                            style={styles.TextInput}
                            autoCapitalize='none'
                            placeholder='IP address(default 127.0.0.1)'
                            textAlign='center'
                            onChangeText={(ip) => this.setState({ip})}
                            underlineColorAndroid='transparent'
                        />
                        <View style={{height: 2}}/>
                        <TextInput
                            style={styles.TextInput}
                            placeholder='Port(default 2345)'
                            autoCapitalize='none'
                            textAlign='center'
                            onChangeText={(port) => this.setState({port})}
                            underlineColorAndroid='transparent'
                        />
                        <TouchableHighlight onPress={this.connect} underlayColor="#52ABFF"
                                            style={styles.login_button}>
                            <Text style={{color: '#fff'}}>Connect</Text>
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
    // sensorTitle: {
    //     flexDirection: 'row',
    //     height: 40,
    //     flex: 1,
    //     justifyContent: 'center',
    //     // alignItems: 'center',
    //     // backgroundColor:'#ef9196'
    // },
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
    TextInput: {
        height: 40,
        backgroundColor: '#fff',
    },
});
