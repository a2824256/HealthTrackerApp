import React, {Component} from 'react';
import {View, WebView, StyleSheet, Platform} from 'react-native';
import renderChart from "native-echarts/src/components/Echarts/renderChart";

export default class NavBar extends Component {
    render() {
        return (
            <View style={{flex: 1, height: this.props.height || 400,}}>
                <WebView
                    ref="chart"
                    scrollEnabled = {false}
                    injectedJavaScript = {renderChart(this.props)}
                    style={{
                        height: this.props.height || 400,
                        backgroundColor: this.props.backgroundColor || 'transparent'
                    }}
                    scalesPageToFit={false}
                    source={require('./tpl.html')}
                    onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    Bar: {
        height: Platform.OS == 'ios' ? 64 : 44,
        paddingTop: Platform.OS == 'ios' ? 14 : 0,
        backgroundColor: '#ff6400',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

module.exports = NavBar;