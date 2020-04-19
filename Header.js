import React from 'react';
import { StyleSheet, Text, View,Image, TouchableWithoutFeedback, Button, Linking ,TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Page from './page';

const Stack = createStackNavigator();

function Header ({navigation}){
    return(
<Stack.Navigator>
    <Stack.Screen name="My Book" component={Page} 
   options={{
    headerLeft: () =>  <TouchableOpacity onPress={() =>navigation.openDrawer()}>
    <Image style={styles. iconStyle} source= {require('./img/menu.png')}/>
    </TouchableOpacity>,
     headerRight: () =>  <TouchableOpacity onPress={() => Linking.openURL("https://www.youtube.com/")}>
     <Image style={styles. iconStyle} source= {require('./img/search.png')}/>
     </TouchableOpacity>,
    title:"My Book",
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#00b49f' },
    
  }}
    />
  </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        padding: 8,
        backgroundColor: "#00b49f",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingBottom: 20,
        height: 80,

    },
    textStyle: {
        color: "#F8F8F8",
        fontSize: 20,
        fontWeight: 'bold',

    },
    iconStyle: {
        marginLeft: 15,
        marginRight: 15,
        height: 20,
        width: 20
    }

});

export default Header;
