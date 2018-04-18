import React from 'react';
import {
    View,
    WebView,
} from 'react-native';
import renderChart from "./renderChart";

export default class DynamicDataLine extends React.Component {

    constructor(props) {
        super(props);
    }

    sendMessage() {
        this.refs.webview.postMessage(pr);
    }

    render() {
        let xName = this.props.xName ? this.props.xName : "undefine";
        let yName = this.props.yName ? this.props.yName : "undefine";
        return (
            <View style={{flex: 1}}>
                <View style={{width: 500, height: 300}}>
                    <WebView
                        scrollEnabled={false}
                        ref={'webview'}
                        injectedJavaScript={renderChart(xName, yName)}
                        source={require('./tpl.html')}
                        style={{width: 375, height: 220}}
                    />
                </View>
            </View>
        )
    }
}
