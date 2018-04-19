import React, {Component} from 'react';
import {
    View,
    WebView,
} from 'react-native';
import renderChart from "./renderChart";
import Dimensions from 'Dimensions';

const {width} = Dimensions.get('window');
export default class DynamicDataLine extends Component {

    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        this.props.retToFat(this);
    }


    sendMessage(data) {
        data = [data[0], data[1], data[2]];
        this.refs.threeLine.postMessage(JSON.stringify(data));
    }

    render() {
        let xName = this.props.xName ? this.props.xName : "undefine";
        let yName = this.props.yName ? this.props.yName : "undefine";
        return (
            <View style={{flex: 1}}>
                <View style={{width: width, height: 300}}>
                    <WebView
                        scrollEnabled={false}
                        ref={"threeLine"}
                        scalesPageToFit={false}
                        injectedJavaScript={renderChart(xName, yName)}
                        source={require('./tpl.html')}
                        style={{width: width, height: 220}}
                    />
                </View>
            </View>
        )
    }
}
