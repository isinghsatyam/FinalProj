import  React  from "react";
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import AuthResolve from '../navigation/AuthResolve';
import DashBoard from '../screens/DashBoard';
import Cart from '../screens/Cart';
import CartButton from '../utility/components/CartButton';
import DrawerButton from '../utility/components/DrawerButton';
import ProductDetails from '../screens/ProductDetails';
import SignOut from '../utility/components/SignOut';
import Profile from '../screens/Profile';
import CustomDrawer from '../utility/components/CustomDrawer';

const StackNavigator = createStackNavigator({
  DashBoard : {
    screen : DashBoard,
    navigationOptions :{
      title: 'Dashboard',
      headerRight: ()=>  (
          <CartButton />
          ),
      headerLeft: ()=>  (
        <DrawerButton />
        ),
      headerStyle: {
        backgroundColor: '#e3e3e3'
      },
      headerStyle :{
        borderBottomColor : 'red',
        borderBottomWidth: 3,
      },
      headerTintColor: '#606070',
    }
  },
  ProductDetails : ProductDetails,
  Cart : Cart,
  //Profile : Profile,
});


const DrawerNavigator = createDrawerNavigator({
  DashBoard: StackNavigator,
  Profile : Profile,
  SignOut : SignOut,
  },{
     contentComponent : CustomDrawer
 }
);


const SwitchNavigator = createSwitchNavigator(
  {
    AuthResolve: AuthResolve,
    SignIn: SignIn,
    SignUp: SignUp,
    DrawerNavigator: DrawerNavigator,
    SignOut : SignOut
  },
  {
    initialRouteName: 'AuthResolve',
  },
);

export default createAppContainer(SwitchNavigator);
