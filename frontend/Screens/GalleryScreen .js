import React from 'react';
import {ScrollView } from 'react-native';
import { Card, Badge, Text } from 'react-native-elements';

import { connect } from 'react-redux';

function GalleryScreen (props) {
    
    let cardList = props.imageList.map((data, e) => {

        let glasses;
        let smile;
        let beard;
        let hair;
        if (data.glasses) {
            glasses = <Badge status = "success" value = "lunettes"/>
        };
        if (data.smile) {
            smile = <Badge status = "success" value = "joyeux"/>
        };
        if (data.beard) {
            beard = <Badge status = "success" value = "barbe"/>
        }; 
        if (data.hair) {
            hair = <Badge status = "success" value = {data.hair}/>
        }; 

        return <Card
            image={{uri: data.url}}>
            <Badge status="success" value={data.gender}/>
            <Badge status="success" value={data.age}/>
            {glasses}
            {smile}
            {beard}
            {hair}
            </Card>  
    });

    return (
        <ScrollView style={{marginTop: 30}}>

            <Text h3 style={{textAlign: 'center'}}>Julie's Gallery</Text>

            {cardList}

        </ScrollView>
    )
};

function mapStateToProps(state) {
    return { imageList: state.imageList }
};

export default connect(
    mapStateToProps,
    null
)(GalleryScreen);