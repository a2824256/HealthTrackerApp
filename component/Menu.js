import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, TouchableHighlight} from 'react-native';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut(){
        this.props.signout()
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ff6400'}}>
                <View style={{flex: 3}}>
                    <View style={styles.Top}>
                        <View style={{height: 35}}/>
                        <View style={{marginLeft:15, flex: 1,}}>
                            <Text style={{color: '#fff', fontSize: 23}}>Menu</Text>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={styles.Box}>
                            <Text style={{color: '#fff', fontSize: 16}}>Account: {this.props.acc}</Text>
                        </View>
                        <View style={{marginLeft:10,marginRight:10,height: 1, backgroundColor: '#F5F5F5'}}/>
                        <View style={styles.Box}>
                            <Text style={{color: '#fff', fontSize: 16}}>Device ID: {this.props.devId}</Text>
                        </View>
                    </View>
                    <View style={{marginLeft:10,marginRight:10,height: 1, backgroundColor: '#F5F5F5'}}/>
                </View>
                <View style={{flex: 7}}>
                    <View style={{flex: 10}}/>
                    <View style={{flex: 2, backgroundColor: '#f53423',alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableHighlight onPress={this.signOut} underlayColor="#52ABFF"
                                            style={styles.button}>
                            <Text style={{color: '#fff',alignItems: 'center', justifyContent: 'center',}}>Sign Out</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Top: {
        height: Platform.OS == 'ios' ? 64 : 44,
        paddingTop: Platform.OS == 'ios' ? 14 : 0,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    Box: {
        marginTop:45,
        marginLeft:20,
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#fff'
    },
    button:{
        alignItems: 'center',
        // borderWidth: 1,
        // borderRadius: 5,
        // borderColor: '#7a7a7a',
    }
});
