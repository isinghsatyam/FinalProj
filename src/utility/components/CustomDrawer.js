import React, { Component } from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import { DrawerItems } from 'react-navigation-drawer';

@inject('signIn')
@observer
class CustomDrawer extends Component{

    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        const {userDetails} = this.props.signIn;
        console.log(userDetails)
        return(  
            <View style={styles.container}>
                <View style={styles.header}>
                    {userDetails.image_path != '' ? ( 
                                <Image  source={{ uri: userDetails.image_path}} 
                                style={styles.profileAvatar} />)
                            : (
                                <View style={styles.profileAvatar}>
                                    <Text style={styles.profileText}>{userDetails.username[0]}</Text>
                                </View>
                            )                           
                            }
                    <Text style={styles.text}>{userDetails.username}</Text>
                </View>
                <View style={styles.footer}>
                    <DrawerItems {...this.props}/>
                </View>        
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container :{
        flex:1,
    },
    header :{
        flex : 0.3,
        backgroundColor : '#0BDB8F',
        borderBottomColor : '#516096',
        borderBottomWidth : 2,
        paddingTop : 10
    },
    footer :{
        flex : 0.7,
    },   
    profileAvatar :{
        height : 120,
        width : 120,
        borderRadius : 60,
        borderWidth :2,
        borderColor : '#465249',
        alignSelf : 'center',
        backgroundColor : '#516096',
        justifyContent : 'center'
    },
    profileText :{
        fontSize : 60,
        color : '#fff',
        fontWeight : 'bold',
        alignSelf : 'center'
    },
    text :{
        fontSize : 30,
        color : '#343835',
        alignSelf : 'center',
        fontWeight : 'bold'
    },
})

export default CustomDrawer;