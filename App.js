import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';

import NavBar from './component/NavBar';
import Dimensions from 'Dimensions';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ConnectPage from './ConnectPage';
import Menu from './component/Menu';
import SideMenu from 'react-native-side-menu';
import DynamicLine from './component/DynamicDataLine/DynamicDataLine';
import Dtl from './component/DynamicThreeLine/DynamicThreeLine';
import TempLine from './component/TempLine/TempLine';

const {width} = Dimensions.get('window');
let ws = null;
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            account: null,
            dev_id: null,
            menu: false,
            loginState: 0, //0 connect, 1 register, 2 login, 3 main, 4 update data
        }
        this.ws_connect = this.ws_connect.bind(this);
        this.toSignUp = this.toSignUp.bind(this);
        this.regSuccess = this.regSuccess.bind(this);
        this.login = this.login.bind(this);
        this.signOut = this.signOut.bind(this);
        this.onC1 = this.onC1.bind(this);
        this.onC2 = this.onC2.bind(this);
        this.onC3 = this.onC3.bind(this);
        this.c1 = null;
        this.c2 = null;
        this.c3 = null;
    }

    onC1(ref) {
        this.c1 = ref;
    }

    onC2(ref) {
        this.c2 = ref;
    }

    onC3(ref) {
        this.c3 = ref;
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (nextState != this.state) {
            return true;
        }
        return false;
    }

    login(account, password) {
        let json = {
            'type': 'websocket',
            'action': 'login',
            'account': account,
            'password': password,
        };
        ws.send(JSON.stringify(json));
    }

    signOut() {
        let json = {
            'type': 'websocket',
            'action': 'sign_out',
        };
        ws.send(JSON.stringify(json));
    }

    toSignUp() {
        this.setState({loginState: 1});
    }

    regSuccess(account, password, dev_id) {
        let json = {
            'type': 'websocket',
            'action': 'register',
            'dev_id': dev_id,
            'account': account,
            'password': password,
        };
        ws.send(JSON.stringify(json));
    }

    ws_connect(ip, port) {
        if (ip == null || port == null) {
            Alert.alert('Value cannot be null!');
            return;
        }

        const ws_url = 'ws://' + ip + ':' + port;
        ws = new WebSocket(ws_url);

        ws.onopen = () => {
            let token = {
                'type': 'websocket',
                'action': 'connect'
            };
            ws.send(JSON.stringify(token));
        };

        ws.onmessage = (e) => {
            let json_arr = JSON.parse(e.data);
            switch (json_arr['state']) {
                case 0:
                    this.setState({loginState: 0});
                    break;
                case 2:
                    this.setState({loginState: 2});
                    break;
                case 3:
                    this.setState({loginState: 3, account: json_arr['account'], dev_id: json_arr['dev_id']});
                    break;
                case 4:
                    this.c1.sendMessage(json_arr['data']['hr']);
                    this.c2.sendMessage(json_arr['data']['tm']);
                    this.c3.sendMessage(json_arr['data']['ac']);
                    break;
                default:
                    if (json_arr['reason'] == null) {
                        Alert.alert('reason null');
                    } else {
                        Alert.alert(json_arr['reason']);
                    }
            }
        };

        ws.onerror = (e) => {
            Alert.alert("Websocket connect fail!");
        };

        ws.onclose = (e) => {
            if (this.state.loginState != 0) {
                this.setState({loginState: 0});
                Alert.alert("Connect close");
            }
        };
    }

    render() {
        switch (this.state.loginState) {
            case 0:
                return (
                    <ConnectPage connect={this.ws_connect}/>
                );
            case 1:
                return (
                    <RegisterPage regSuccess={this.regSuccess}/>
                );
            case 2:
                return (
                    <LoginPage login={this.login} toSignUp={this.toSignUp}/>
                );
            case 3:
                let menu = <Menu navigator={navigator} acc={this.state.account} devId={this.state.dev_id}
                                 signout={this.signOut}/>;

                return (
                    <SideMenu menu={menu}>
                        <ScrollView style={styles.container}>
                            <NavBar title={'Health Tracker'}/>
                            <DynamicLine xName={"time"} yName={"value"} retToFat={this.onC1}/>
                            <View style={styles.sensorTitle}><Text>tab 1 - Heart Rate</Text></View>
                            <TempLine xName={"time"} yName={"value"} retToFat={this.onC2}/>
                            <View style={styles.sensorTitle}><Text>tab 2 - Temperature</Text></View>
                            <Dtl xName={"time"} yName={"value"} retToFat={this.onC3}/>
                            <View style={styles.sensorTitle}><Text>tab 3 - Accelerated</Text></View>
                        </ScrollView>
                    </SideMenu>
                );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    content: {
        marginTop: 10,
        height: 150,
    },
    Copyright: {
        marginTop: 100,
        alignItems: 'center',
        // backgroundColor: '#4169E1'
    },
    titleView: {
        height: Platform.OS == 'ios' ? 64 : 44,
        paddingTop: Platform.OS == 'ios' ? 14 : 0,
        backgroundColor: '#ff6400',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    sensorTitle: {
        flexDirection: 'row',
        height: 40,
        flex: 1,
        justifyContent: 'center',
        marginTop: 20
        // alignItems: 'center',
        // backgroundColor:'#ef9196'
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
    TextInput: {
        height: 40,
        backgroundColor: '#fff',
    },
});
