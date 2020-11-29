import App from './App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);

AppRegistry.registerComponent(appName, () => App);
