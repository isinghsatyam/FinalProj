import React, { Component } from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import AsyncStorage from '@react-native-community/async-storage';


@inject('signIn')
@observer
class Profile extends Component{
    constructor(props){
        super(props);
        this.props = props;
    }

    componentDidMount(){
        getUserDetail = async () => {
            const email =await AsyncStorage.getItem('token');
            this.props.signIn.getUserFromDatabase(email);
        }
        getUserDetail();
    }

    render(){
        const {userDetails} = this.props.signIn;
        return(
            <View style={{flex :1}}>
                <Image  source={{ uri: userDetails.image_path}} 
                        style={styles.imagePicker} />
                <Text style={styles.text}>{userDetails.username}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerButton :{
        height : 30,
        width : 30,
        marginRight : 10
    },   
    imagePicker :{
        height : 120,
        width : 120,
        borderRadius : 50,
        borderWidth :3,
        alignSelf : 'center',
    },
    text :{
        fontSize : 30,
        color : 'red'
    }
})

export default Profile;