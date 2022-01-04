import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import withProvider from './provider';
import DraggableItem from 'app/components/reanimated-test/draggable';

class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <DraggableItem />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default withProvider(HomeScreen);
