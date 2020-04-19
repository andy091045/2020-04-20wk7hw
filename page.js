import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import BottomBar from './BottomBar';
const Page = () => {
    return (
        <ScrollView>
            <View>
                <Page1 />
                <Page2 />
                <Page3 />
                <BottomBar/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

});
export default Page;