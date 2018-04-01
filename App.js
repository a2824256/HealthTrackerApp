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
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ConnectPage from "./ConnectPage";

const {width} = Dimensions.get('window');
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dev_id: 20180326,
            token: 0,
            loginState: 0, //0 connect, 1 register, 2 login, 3 main, 4 update data
            data: {
                hr: [0, 0, 0, 0, 0, 0, 0, 0],
                tm: [0, 0, 0, 0, 0, 0, 0, 0],
                ac: {
                    'x': [0, 0, 0, 0, 0, 0, 0, 0],
                    'y': [0, 0, 0, 0, 0, 0, 0, 0],
                    'z': [0, 0, 0, 0, 0, 0, 0, 0],
                }
            }
        }
        this.ws_connect = this.ws_connect.bind(this);
        this.toSignUp = this.toSignUp.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState != this.state) {
            return true;
        }
        return false;
    }

    toSignUp(){
        this.setState({loginState: 1});
    }

    ws_connect(ip, port) {
        if (ip == null || port == null) {
            Alert.alert('Value cannot be null!');
            return;
        }

        const ws_url = 'ws://' + ip + ':' + port;
        const ws = new WebSocket(ws_url);

        ws.onopen = () => {
            let token = {
                'type':'websocket',
                'action':'connect'
            };
            // token['user_id'] = this.state.token;
            // token['dev_id'] = this.state.dev_id;
            // Alert.alert(JSON.stringify(token));
            ws.send(JSON.stringify(token));
        };

        ws.onmessage = (e) => {
            let json_arr = JSON.parse(e.data);
            switch(json_arr['state']){
                case 0:
                    // Alert.alert("connect fail");
                     break;
                case 2:
                    this.setState({loginState: 2});
                    break;
                case 3:
                    this.setState({loginState: 3});
                    this.setState({data: json_arr['data']});
                    break;
            }
        };

        ws.onerror = (e) => {
            Alert.alert("Websocket connect fail!");
        };

        ws.onclose = (e) => {
            if(this.state.loginState!=0){
                this.setState({loginState: 0});
                Alert.alert("Connect close");
            }
        };
    }

    render() {
        switch (this.state.loginState) {
            case 0:
                return(
                    <ConnectPage connect={this.ws_connect}/>
                );
            case 1:
                return (
                    <RegisterPage/>
                );
            case 2:
                return (
                    <LoginPage toSignUp={this.toSignUp}/>
                );
            case 3:
                const hr_option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show: true,
                        showTitle: true,
                        feature: {
                            //show是否显示表格，readOnly是否只读
                            dataView: {show: false, readOnly: false},
                        }
                    },
                    xAxis: [
                        {
                            //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                            boundaryGap: true,
                            type: 'category',
                            name: '时间/s',
                            data: ['1', '2', '3', '4', '5', '6', '7', '8']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '心率'
                        }
                    ],
                    //图形的颜色组
                    color: ['rgb(249,159,94)'],
                    //需要显示的图形名称，类型，以及数据设置
                    series: [
                        {
                            name: '心率',
                            //默认显
                            type: 'line',
                            data: this.state.data.hr
                        },
                    ]
                };
                const temp_option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show: true,
                        showTitle: true,
                        feature: {
                            //show是否显示表格，readOnly是否只读
                            dataView: {show: false, readOnly: false},
                        }
                    },
                    xAxis: [
                        {
                            //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                            boundaryGap: true,
                            type: 'category',
                            name: '时间/s',
                            data: ['1', '2', '3', '4', '5', '6', '7', '8']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '摄氏度'
                        }
                    ],
                    //图形的颜色组
                    color: ['rgb(220,20,60)'],
                    //需要显示的图形名称，类型，以及数据设置
                    series: [
                        {
                            name: '摄氏度',
                            //默认显
                            type: 'line',
                            data: this.state.data.tm
                        },
                    ]
                };
                const acc_option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['x轴', 'y轴', 'z轴']
                    },
                    //各种表格
                    toolbox: {
                        show: true,
                        showTitle: true,
                        feature: {
                            //show是否显示表格，readOnly是否只读
                            dataView: {show: false, readOnly: false},
                        }
                    },
                    xAxis: [
                        {
                            //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                            boundaryGap: true,
                            type: 'category',
                            name: '时间/s',
                            data: ['1', '2', '3', '4', '5', '6', '7', '8']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '速度值'
                        }
                    ],
                    //图形的颜色组
                    color: ['rgb(249,159,94)', 'rgb(220,20,60)', 'rgb(123,104,238)'],
                    //需要显示的图形名称，类型，以及数据设置
                    series: [
                        {
                            name: 'x轴',
                            //默认显
                            type: 'line',
                            data: this.state.data.ac['x']
                        },
                        {
                            name: 'y轴',
                            type: 'line',
                            data: this.state.data.ac['y']
                        },
                        {
                            name: 'z轴',
                            type: 'line',
                            data: this.state.data.ac['z']
                        }
                    ]
                };
                return (
                    <ScrollView style={styles.container}>
                        <NavBar title={'Health Tracker'}/>
                        <Echarts option={hr_option} height={300} width={width}/>
                        <View style={styles.sensorTitle}><Text>tab 1 - Heart Rate</Text></View>
                        <Echarts option={temp_option} height={300} width={width}/>
                        <View style={styles.sensorTitle}><Text>tab 2 - Temperature</Text></View>
                        <Echarts option={acc_option} height={300} width={width}/>
                        <View style={styles.sensorTitle}><Text>tab 3 - Accelerated</Text></View>
                    </ScrollView>
                );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
