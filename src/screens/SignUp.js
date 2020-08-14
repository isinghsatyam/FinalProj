import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import ImagePicker from 'react-native-image-picker';
import Realm from 'realm';
import {addUserToDatabase} from '../database/AuthHandler';
import { AuthSchema } from '../database/Schema';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            email: '',
            password: '',
            imagePath : '',
            isEmailValid: false,
            isPasswordValid: false,
            isUsernameValid : false,
            alreadyRegistered : false,
        };
    }
    validateUsername = () => {
        const usernameReg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
        (usernameReg.test(this.state.username)) ? this.setState({ isUsernameValid: true }) : this.setState({ isUsernameValid: false });
    }
    validateEmail = () => {
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        (emailReg.test(this.state.email)) ? this.setState({ isEmailValid: true }) : this.setState({ isEmailValid: false });
    }
    validatePassword = () => {
        const passwordReg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
        (passwordReg.test(this.state.password)) ? this.setState({ isPasswordValid: true }) : this.setState({ isPasswordValid: false });
    }

    registerUser = async () =>{
        try{
            const realm = new Realm({schema: [AuthSchema]})
            const getAllUserFromDatabase = realm.objects('user_details')
            if (this.state.username === '' || this.state.email == '' || this.state.password == '') {
                Alert.alert('Empty field', 'Please Enter some value in each field')
            }
            else if (( this.state.isUsernameValid && this.state.isEmailValid && this.state.isPasswordValid)) {
                for(let getUser of getAllUserFromDatabase){
                    if(getUser.email == this.state.email)
                        this.setState({alreadyRegistered : true})
                }
                if(this.state.alreadyRegistered)
                {
                    Alert.alert('Failed','You already registered .. try diffrent credential')
                }
                else{
                    const userDetails = {
                        username : this.state.username,
                        email : this.state.email,
                        password : this.state.password,
                        imagePath : this.state.imagePath
                    }
                    await addUserToDatabase(userDetails);
                    Alert.alert('Registered','your credential is stored');
                    this.props.navigation.navigate('SignIn')
                }      
            }
            else if (!this.state.isUsernameValid ){
              Alert.alert('Wrong Input', 'Please Enter Valid username')
            }
            else if (!this.state.isEmailValid ){
              Alert.alert('Wrong Input', 'Please Enter Valid email')
            }
            else if (!this.state.isPasswordValid ){
              Alert.alert('Wrong Input', 'Please Enter Valid password')
            }
        }catch(error){
            alert(error);
        }
        
    }

    chooseFile = () => {
      var options = {
        title: 'Select Image',
        customButtons: [
          { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, response => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          //let source = response;
          let source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            imagePath: source,
          });
        }
      });
    };

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#42275a" barStyle="light-content" />
                <LinearGradient
                style={styles.header}
                colors={['#42275a','#cc2b5e']}>
                    <View>
                        <TouchableOpacity style={styles.imagePicker}
                          onPress ={this.chooseFile.bind(this)}
                          >
                            <Image 
                              source={{ uri: this.state.imagePath.path}} 
                              style={styles.imagePicker} />
                          </TouchableOpacity>
                    </View>
                </LinearGradient>
            
            <View style={styles.footer}>
                <View style={styles.itemPosition}>
                    <FontAwesome name="user-o" color="#42275a" size={25} />
                    <TextInput
                    placeholder="Username"
                    autoCapitalize="none"
                    style={styles.textInput}
                    value={this.state.username}
                    onChangeText={(username) => {this.setState({username: username},() =>this.validateUsername())}}
                                                   
                    />
                </View>
                <View style={styles.itemPosition}>
                    <MaterialCommunityIcons name="email" color="#42275a" size={25} />
                    <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    value={this.state.email}
                    onChangeText={(email) => {this.setState({email: email},() => this.validateEmail())}}
                    />
                </View>
                <View style={styles.itemPosition}>
                    <MaterialCommunityIcons name="lock-outline" color="#42275a" size={25} />
                    <TextInput
                    placeholder="Enter your Password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    style={styles.textInput}
                    value={this.state.password}
                    onChangeText={(password) => {this.setState({password: password},() => this.validatePassword())}}
                    />
                </View>
                <TouchableOpacity onPress={() => this.registerUser()}>
                    <LinearGradient
                    style={styles.button}
                    colors={['#42275a','#cc2b5e']}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('SignIn')}>
                    <LinearGradient
                    style={styles.button}
                    colors={['#42275a','#cc2b5e']}>
                    <Text style={styles.buttonText}>Back</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0BDB8F',
  },
  header: {
    flex: 0.3,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderBottomRightRadius : 40,
    borderBottomLeftRadius : 40
  },
  footer: {
    flex: 0.7,
    marginTop: 30,
    paddingHorizontal: 25,
    justifyContent: 'flex-start',
  },
  itemPosition: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 30,
    alignContent: 'center',
    alignSelf: 'center',
  },
  pickerPosition: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  imagePicker :{
    height : 120,
    width : 120,
    borderRadius : 50,
    borderWidth :3,
    alignSelf : 'center',
  },
  headingText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: -15,
    paddingLeft: 10,
    color: '#5C5C5C',
    fontSize: 20,
    fontWeight : 'bold',
    borderBottomColor: '#42275a',
    borderBottomWidth: 3,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: '#0BDB8F',
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  picker: {
    height: 40,
    width: 120,
    borderWidth: 2,
    borderColor: '#0BDB8F',
  },
  divider :{
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    color: '#42275a',
    paddingTop : 15,
  }
});
