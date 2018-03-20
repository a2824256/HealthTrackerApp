import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    ScrollView,
    Alert
} from 'react-native';

import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
const {width} = Dimensions.get('window');
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hr:[0, 0, 0, 0, 0, 0, 0, 0],
            organ: [6, 9, 9, 2, 8, 7, 17, 18],
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.hr!=this.state.hr){
            return true;
        }
        return false;
    }

    componentDidMount(){
        var ws = new WebSocket('ws://127.0.0.1:2345');

        ws.onopen = () => {
            // 打开一个连接

            ws.send("{\"id\":1}"); // 发送一个消息
        };

        ws.onmessage = (e) => {
            // Alert.alert(e.data);
            json_arr = JSON.parse(e.data);
            this.setState({hr: json_arr['data']});
            if(json_arr['state']){
                this.timer = setTimeout(
                    () => { ws.send("{\"id\":2}"); },
                    5000
                );
            }
            // this.state.hr = e.data.json();
            // Alert.alert(e.data);
            // 接收到了一个消息
            // ws.send("{\"id\":2}");
        };

        ws.onerror = (e) => {
            // 发生了一个错误
        };

        ws.onclose = (e) => {
            Alert.alert("连接关闭");
            // 连接被关闭了
        };
    }

    render() {
        const option = {
            tooltip : {
                trigger: 'axis'
            },
            //可以手动选择现实几个图标
            // legend: {
            //     data:['苹果','橘子']
            // },
            //各种表格
            toolbox: {
                show : true,
                showTitle:true,
                feature : {
                    //show是否显示表格，readOnly是否只读
                    dataView : {show: false, readOnly: false},
                }
            },
            xAxis : [
                {
                    //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                    boundaryGap:true,
                    type : 'category',
                    name : '时间/s',
                    data : ['1','2','3','4','5','6','7','8']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '心率'
                }
            ],
            //图形的颜色组
            color:['rgb(249,159,94)','rgb(67,205,126)'],
            //需要显示的图形名称，类型，以及数据设置
            series : [
                {
                    name:'心率',
                    //默认显
                    type:'line',
                    data:this.state.hr
                },
                // {
                //     name:'橘子',
                //     type:'line',
                //     data:this.state.organ
                // }
            ]
        };

        return (
            <ScrollView style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>健康数据检测</Text>
                </View>
                <View><Text>心率</Text></View>
                <Echarts option={option} height={300} width={width}/>
                <View><Text>温度</Text></View>
                <Echarts option={option} height={300} width={width}/>
                <View><Text>加速度</Text></View>
                <Echarts option={option} height={300} width={width}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },

    titleView:{
        height:Platform.OS=='ios'?64:44,
        paddingTop:Platform.OS=='ios'?14:0,
        backgroundColor:'#ff6400',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color:'white',
        fontSize:20,
        textAlign:'center',
    },
});