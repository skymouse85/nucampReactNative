import RenderCampsite from '../features/campsites/RenderCampsite'
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { COMMENTS } fomr './shared/comments';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    return <RenderCampsite campsite={campsite} />;
};

export default CampsiteInfoScreen;