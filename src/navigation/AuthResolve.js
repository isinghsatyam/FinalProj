import React, {useEffect, useState, Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { inject, observer } from 'mobx-react';

@inject('signIn')
@observer
export default class AuthResolve extends Component {
  constructor(props){
    super(props);
    this.props = props;
  }

  componentDidMount(){
      const checkToken = async () =>{
        const token = await AsyncStorage.getItem('token');
        if(token == null)
            {
                setTimeout(() => this.props.navigation.navigate('SignIn'), 3000)
            }
        else{    
            this.props.signIn.getUserFromDatabase(token);
            setTimeout(() => this.props.navigation.navigate('DashBoard'), 3000)
        }
      }
      checkToken();
  }
  render(){

    return (
      <LinearGradient style={styles.container} colors={['#42275a','#cc2b5e']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Hi there!</Text>
          </View>
          <View style={styles.footer}>
              <Text style={styles.footerText}>Welcome to the DigiShop...</Text>
              <Image
                  source ={require('../utility/assets/appIcon.png')}
                  style={styles.appIcon}
              />
          </View>
        </View>
      </LinearGradient>
    );
  } 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.4,
    justifyContent: 'flex-end',
  },
  footer: {
    flex: 0.6,
    backgroundColor: '#e4f2dc',
    borderTopRightRadius : 80,
    borderTopWidth : 2,
    borderTopColor : '#42275a'
  },
  appIcon :{
    height : 150,
    width : 150,
    alignSelf : 'center',
    marginTop : 80
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 50,
    marginLeft: 20,
  },
  footerText: {
    color: '#42275a',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop : 20,
    marginLeft: 20,
  },
});
