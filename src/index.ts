import 'react-native-gesture-handler';
import { Platform, UIManager } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Buffer } from 'buffer';

import { NavigationUtils } from 'app/utils/navigation';
import { SCREENS } from './screens/screen-registry';
import registerScreens from 'app/screens';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

global.Buffer = Buffer;

registerScreens();

Navigation.events().registerAppLaunchedListener(async () => {
    NavigationUtils.setRoot({
        stack: {
            children: [
                {
                    component: {
                        id: SCREENS.HOME,
                        name: SCREENS.HOME,
                    },
                },
            ],
        },
    });
});
