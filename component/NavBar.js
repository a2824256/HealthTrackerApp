import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

export default class NavBar extends Component {
    render() {
        return (
            <View>
                <View style={styles.Bar}>
                    <View style={{height: 20}}/>
                    <Text style={{color:'#fff',fontSize:17}}>{this.props.title}</Text>
                </View>
                <View style={{height:2,backgroundColor:'#DCDCDC'}}/>
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