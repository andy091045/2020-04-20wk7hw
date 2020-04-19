import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const BottomBar = () => {
    return (
        <View style={styles.viewStyle}>
            <View style={styles.box}>
                <View style={styles.center}>
                    <Image style={styles.Home} source={require('./img/icon_bottomnav_home.png')} />
                    <Text style={styles.word}>Home</Text>
                </View>
                <View style={styles.center}>
                    <Image style={styles.book} source={require('./img/icon_bottomnav_mybook.png')} />
                    <Text style={styles.word}>My book</Text>
                </View>
                <View style={styles.center}>
                    <Image style={styles.Favorites} source={require('./img/icon_bottomnav_favorites.png')} />
                    <Text style={styles.word}>Favorites</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
       
        elevation: 2,
        
    },
    box: {
        backgroundColor: '#ffffff',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        // top: 10,
        zIndex: 2,
        paddingBottom: 15
    },
    word: {

        fontSize: 12,
        color: '#818181',
        lineHeight: 20,

    },
    Home: {
        width: 24,
        height: 24,
    },
    book: {
        width: 24,
        height: 24,
    },
    Favorites: {
        width: 24,
        height: 24,
    },
    center: {
        paddingTop:25,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default BottomBar;