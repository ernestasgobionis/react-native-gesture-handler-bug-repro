import React, { Component, ComponentType } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default (WrapperComponent: ComponentType<any>) => {
    return class extends Component {
        static options() {
            return {
                topBar: {
                    drawBehind: false,
                    visible: true,
                    title: {
                        text: 'Home',
                    },
                },
            };
        }

        render() {
            return (
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <WrapperComponent {...this.props} />
                </GestureHandlerRootView>
            );
        }
    };
};
