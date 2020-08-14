import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage'; 
import { inject, observer } from 'mobx-react';
import { LoginManager } from 'react-native-fbsdk';

@inject('signIn')
@observer
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            email: "",
            password: '',
            isEmailValid: false,
            isPasswordValid: false,
            userValid : false
        }
    }

    validateEmail = () => {
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        (emailReg.test(this.state.email)) ?( this.props.signIn.getUserFromDatabase(this.state.email), this.setState({ isEmailValid: true })) : this.setState({ isEmailValid: false });
    }
    validatePassword = () => {
        const passwordReg = /^(?=.*\d)(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
        (passwordReg.test(this.state.password)) ? this.setState({ isPasswordValid: true }) : this.setState({ isPasswordValid: false });
    }

    AuthenticateUser = async () =>{
        try{
            const {userDetails} = this.props.signIn;
            console.log(userDetails)
            if ((this.state.email == '' && this.state.password == '')) {
                Alert.alert('Empty field', 'Please Enter some value')
            }
            else if (this.state.isEmailValid && this.state.isPasswordValid) {
                for (let user of userDetails) {
                  if (user.email === this.state.email && user.password === this.state.password) {
                        this.setState({userValid : true})
                      }
                }
                if(this.state.userValid){
                  await AsyncStorage.setItem('token', this.state.email)
                  this.props.navigation.navigate('DashBoard')
                }
                else{
                  Alert.alert('Wrong Input', 'Please Enter correct detail')
                }
            }
            else {
                Alert.alert('invalid Input', 'Please Enter valid detail')
            }
        }catch(error){
            alert(error);
        }
        
    }

    handleFacebookLogin () {
      LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
        function (result) {
          if (result.isCancelled) {
            console.log('Login cancelled')
          } else {
            console.log('Login success with permissions: ' + result.grantedPermissions.toString())
            this.props.navigation.navigate('DashBoard');
          }
        },
        function (error) {
          console.log('Login fail with error: ' + error)
        }
      )
    }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ff512f" barStyle="light-content" />
                <LinearGradient
                style={styles.upperScreen}
                colors={['#ff512f', '#dd2476']}>
                    <View>
                        <Text style={styles.headingText}>Please sign in to continue...</Text>
                    </View>
                </LinearGradient>
            
            <View style={styles.centerScreen}>
                <View style={styles.itemPosition}>
                    <MaterialCommunityIcons name="email" color="#42275a" size={25} />
                    <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    value={this.state.email}
                    onChangeText={(email) => {this.setState({email: email}, () => this.validateEmail())}}
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
                    onChangeText={(password) => {this.setState({password: password}, () => this.validatePassword())}}
                    />
                </View>
                <TouchableOpacity 
                    onPress={() => this.AuthenticateUser()}
                    style={styles.button}>
                    <LinearGradient
                      style={styles.button}
                      colors={['#ff512f', '#dd2476']}>
                      <Text style={styles.buttonText}>SIGN IN</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('SignUp')}
                    style={styles.button}>
                    <LinearGradient
                      style={styles.button}
                      colors={['#ff512f', '#dd2476']}>
                      <Text style={styles.buttonText}>SIGN UP</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.divider}>--------------OR--------------</Text>
                <Button
                  onPress={this.handleFacebookLogin}
                  title="Continue with fb"
                  color="#4267B2"
                />
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
  upperScreen: {
    flex: 0.2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderBottomRightRadius : 40,
    borderBottomLeftRadius : 40
  },
  centerScreen: {
    flex: 0.8,
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

export default SignIn;