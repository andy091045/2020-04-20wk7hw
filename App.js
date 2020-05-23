import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedbac, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { navigationRef } from './RootNavigation';
import Header from './Header';
import Page from './page';
import MapView, { Marker } from 'react-native-maps';
import mapStyle from "./styles/mapStyle.json";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { Icon } from "react-native-elements";
import axios from "axios";
import metroJson from "./styles/metro.json";
const UBIKE_URL =
  "https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/json/preview";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>

      <View style={styles.bb}>
        <View style={styles.bb1}>
          <Image style={styles.arrow} source={require('./img/img_user_photo.png')} />
          <Text style={styles.bw1}>GamexHCl</Text>
          <Text style={styles.bw1}>gdlab2017@gmail.com</Text>
          <Image style={styles.bd} source={require('./img/down_arrow.png')} />
        </View>

      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
const App = () => {
  const [region, setRegion] = React.useState({
    longitude: 121.545334,
    latitude: 25.024624,
    longitudeDelta: 0.01,
    latitudeDelta: 0.02,
  });
  const [marker, setMarker] = React.useState({
    coord: {
      longitude: 121.545334,
      latitude: 25.024624,
    },
    name: "國北教大",
    address: "台北市和平東路二段134號",

  });



  const [onCurrentLocation, setOnCurrentLocation] = React.useState(false);
  const [metro, setMetro] = React.useState(metroJson);
  const [ubike, setUbike] = React.useState([]);
  const onRegionChangeComplete = (rgn) => {
    if (
      Math.abs(rgn.latitude - region.latitude) > 0.0020 ||
      Math.abs(rgn.longitude - region.longitude) > 0.0020
    ) {
      setRegion(rgn);
      setOnCurrentLocation(false);
    }
  };
  const getUbikeAsync = async () => {
    let response = await axios.get(UBIKE_URL);
    setUbike(response.data);
  };
  const setRegionAndMarker = (location) => {
    setRegion({
      ...region,
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
    setMarker({
      ...marker,
      coord: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      },
    });
  };

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setRegionAndMarker(location);
    setOnCurrentLocation(true);
  };

  React.useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      getLocation();
      getUbikeAsync();
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        region={region}
        style={{ flex: 1 }}
        showsTraffic
        provider="google"

        onRegionChangeComplete={onRegionChangeComplete}
        customMapStyle={mapStyle}
      >
        {metro.map((site) => (
          <Marker
            coordinate={{ latitude: site.latitude, longitude: site.longitude }}
            key={`${site.id}${site.line}`}
            title={site.name}
            description={site.address}
          >
            <Image
              source={require("./img/metro.png")}
              style={{ width: 26, height: 28 }}
              resizeMode="contain"
            />
          </Marker>
        ))}
        {ubike.map((site) => (
          <Marker
            coordinate={{
              latitude: Number(site.lat),
              longitude: Number(site.lng),
            }}
            key={site.sno}
            title={`${site.sna} ${site.sbi}/${site.tot}`}
            description={site.ar}
          >
            <Image
              source={require("./img/ubike.png")}
              style={{ width: 26, height: 28 }}
              resizeMode="contain"
            />
          </Marker>
        ))}
        <Marker
          coordinate={marker.coord}
          title={marker.name}
          description={marker.address}
        >
        </Marker>
      </MapView>
      {!onCurrentLocation && (
        <Icon
          raised
          name="ios-locate"
          type="ionicon"
          color="black"
          containerStyle={{
            backgroundColor: "#517fa4",
            position: "absolute",
            right: 20,
            bottom: 40,
          }}
          onPress={getLocation}
        />
      )}
    </View>

    // <NavigationContainer ref={navigationRef}>
    //   <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
    //     drawerContentOptions={{
    //       activeTintColor: '#fff',
    //       inactiveTintColor: '#5c5c5c',
    //       activeBackgroundColor: '#00b49f',
    //       itemStyle: {
    //         height: 60, width: 320,
    //         marginLeft: 0, marginBottom: 0,
    //         borderRadius: 0, bottom: 0
    //       },
    //       labelStyle: {
    //         marginTop: 5,
    //         marginLeft: 20
    //       }
    //     }}
    //     initialRouteName='My Book'
    //   >
    //     <Drawer.Screen name="Home" component={Header}
    //       options={{
    //         drawerIcon: ({ focused }) => (
    //           focused
    //             ? <Image source={{ uri: "https://github.com/tsaiyuyes7/wk4_Zeplin_HW/blob/master/assets/icon/touch/icon_drawer_home_pressed.png?raw=true" }} style={styles.bh} />
    //             : <Image source={{ uri: "https://github.com/tsaiyuyes7/wk4_Zeplin_HW/blob/master/assets/icon/untouch/icon_drawer_home.png?raw=true" }} style={styles.bh} />
    //         )
    //       }}
    //     />
    //     <Drawer.Screen name="My Book" component={Header}
    //       options={{
    //         drawerIcon: ({ focused }) => (
    //           focused
    //             ? <Image source={{ uri: "https://github.com/tsaiyuyes7/wk4_Zeplin_HW/blob/master/assets/icon/touch/icon_drawer_mybook_pressed.png?raw=true" }} style={styles.bh} />
    //             : <Image source={{ uri: "https://github.com/tsaiyuyes7/wk4_Zeplin_HW/blob/master/assets/icon/untouch/icon_drawer_mybook.png?raw=true" }} style={styles.bh} />
    //         )
    //       }}
    //     />
    //     <Drawer.Screen name="Favorite" component={Header}
    //       options={{
    //         drawerIcon: ({ focused }) => (

    //           <Image
    //             style={styles.bh}
    //             source={{ uri: "https://github.com/tsaiyuyes7/wk4_Zeplin_HW/blob/master/assets/icon/untouch/icon_drawer_favorites.png?raw=true" }}
    //           />
    //         )
    //       }}
    //     />
    //     <Drawer.Screen name="Setting" component={Header}
    //       options={{
    //         drawerIcon: ({ focused }) => (
    //           <Image
    //             style={styles.bh}
    //             source={{ uri: "https://github.com/tsaiyuyes7/wk4_Zeplin_HW/blob/master/assets/icon/untouch/icon_drawer_setting.png?raw=true" }}
    //           />
    //         )
    //       }}
    //     />
    //     <Drawer.Screen name="About us" component={Header}
    //       options={{
    //         drawerIcon: ({ focused }) => (
    //           <Image
    //             style={styles.bh}
    //             source={{ uri: "https://github.com/tsaiyuyes7/wk4_Zeplin_HW/blob/master/assets/icon/icon_drawer_aboutus.png?raw=true" }}
    //           />
    //         )
    //       }}
    //     />
    //   </Drawer.Navigator>
    // </NavigationContainer>

  );
}

const styles = StyleSheet.create({



  container:
  {
    borderColor: '#000',
    backgroundColor: "#000",
    color: '#000',
  },

  headdd:
  {
    width: 50,
    height: 50,
    left: 4
  },
  headd:
  {
    width: 50,
    height: 50,
    right: 4
  },
  bb:
  {
    backgroundColor: "#ebebeb",
    width: 304,
    height: 163,
    bottom: 5

  },
  bb1:
  {
    backgroundColor: "#00b49f",
    width: 320,
    height: 170,
  },
  arrow:
  {
    width: 70,
    height: 70,
    margin: 10,
    marginLeft: 15,
    marginTop: 35
  },
  bw1:
  {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 22
  },

  bh:
  {
    height: 30,
    width: 30,
    marginLeft: 20,
    marginTop: 5
  },

  bd:
  {
    position: "absolute",
    width: 30,
    height: 30,
    marginLeft: 230,
    marginTop: 130
  }

});
export default App;
