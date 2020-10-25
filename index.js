import { registerRootComponent } from 'expo';

import App from './App';

// import {YellowBox} from 'react-native';
//
// YellowBox.ignoreWarnings(['Warning: ...']);
//
// console.disableYellowBox = true;

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
