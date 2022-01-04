import React from 'react';
import { Dimensions, Platform } from 'react-native';
import { Layout, Navigation, Options } from 'react-native-navigation';
import _ from 'lodash';

import ICONS from 'assets/icons';
import { TestIds } from 'e2e/test-ids';

const platformAnimations = Platform.select({
    android: {
        push: {
            waitForRender: true,
            content: {
                translationX: {
                    from: Dimensions.get('window').width,
                    to: 0,
                    interpolation: { type: 'accelerate' },
                },
            },
        },
        pop: {
            content: {
                translationX: {
                    from: 0,
                    to: Dimensions.get('window').width,
                    interpolation: { type: 'accelerate' },
                },
            },
        },
    },
    ios: {
        push: {
            waitForRender: true,
        },
    },
});

export class NavigationUtils {
    static lastPressedTime = 0;

    static defaultNavigationOptions = {
        animations: {
            setRoot: {
                alpha: {
                    from: 0,
                    to: 1,
                    duration: 350,
                    interpolation: { type: 'accelerate' },
                    waitForRender: true,
                },
                waitForRender: true,
            },
            ...platformAnimations,
        },
        bottomTabs: {
            hideShadow: true,
            elevation: 0,
            titleDisplayMode: 'alwaysShow',
        },
        statusBar: {
            drawBehind: false,
            blur: false,
        },
        topBar: {
            drawBehind: false,
        },
        popGesture: true,
    };

    static bindComponent(component: React.Component, componentId?: string) {
        return Navigation.events().bindComponent(component, componentId);
    }

    static canNavigate() {
        const now = Date.now();

        if (!this.lastPressedTime || this.lastPressedTime + 750 < now) {
            this.lastPressedTime = now;

            return true;
        }

        return false;
    }

    static push(componentId: string, screen: string, props?: SimpleObject, options?: Options) {
        if (this.canNavigate()) {
            return Navigation.push(componentId, {
                component: {
                    id: screen,
                    name: screen,
                    passProps: {
                        ...props,
                    },
                    options,
                },
            });
        }
    }

    static pop(componentId: string) {
        if (this.canNavigate()) {
            return Navigation.pop(componentId);
        }
    }

    static popTo(componentId: string) {
        Navigation.popTo(componentId);
    }

    static popToRoot(componentId: string) {
        Navigation.popToRoot(componentId);
    }

    static showModal(screen: string, id?: string, props?: SimpleObject, options?: Options) {
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            id: id || screen,
                            name: screen,
                            passProps: {
                                ...props,
                            },
                            options: {
                                ...options,
                                topBar: {
                                    ...options?.topBar,
                                    rightButtons: options?.topBar?.rightButtons || [
                                        {
                                            id: 'closeModal',
                                            text: 'Close',
                                            testID: TestIds.Modals.CloseButton,
                                            icon: ICONS.CLOSE,
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
            },
        });
    }

    static mergeOptions(componentId: string, options: Options) {
        const merged = _.merge({}, this.defaultNavigationOptions, options);

        Navigation.mergeOptions(componentId, merged);
    }

    static async setRoot(root: Layout) {
        return Navigation.setRoot({
            root: {
                ...root,
            },
        });
    }
}
