import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { SCREENS } from 'app/screens/screen-registry';
// Home root
import HomeScreen from 'app/screens/home';

export const routes = {
    [SCREENS.HOME]: HomeScreen,
};

function sceneCreator(sceneComp: any) {
    class SceneWrapper extends Component {
        static options(passProps: SimpleObject) {
            return sceneComp.options ? sceneComp.options(passProps) : {};
        }

        render() {
            return React.createElement(sceneComp, this.props);
        }
    }

    return SceneWrapper;
}

export default () => {
    for (const r in routes) {
        Navigation.registerComponent(r, () => gestureHandlerRootHOC(sceneCreator(routes[r])));
    }
};
