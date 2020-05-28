import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import {Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen ( {navigation} ) {

    return (

        <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>
         
            <Input
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='Name'
            leftIcon=
                {
                <Icon
                name='user'
                size={24}
                color="#009788"
                />
                }
            />
      
            <Button
                title="Go to Gallery"
                type="solid"
                buttonStyle={{backgroundColor: "#009788"}}
                onPress={() =>  navigation.navigate('Gallery')}
            />
      
        </ImageBackground>

    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
});
