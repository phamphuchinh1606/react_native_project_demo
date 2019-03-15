import React from 'react';
import {createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

import Welcome from './src/containers/welcome';

const headerOptions = {
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerTitleStyle: {
        color: '#fff'
    },
    headerBackground: (
        <LinearGradient
            colors={['#2079ae', '#54ace0']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
        />
    ),
    headerStyle: {
        // borderBottomColor: brandPrimary
        borderBottomWidth: 0
        // backgroundColor: '#2997d8'
    }
}

const HomeStack = createStackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            ...headerOptions,
            header: null
        }
    }
}, {
    initialRouteName: 'Welcome',
    navigationOptions: ({ screenProps }) => {
        return {
            ...headerOptions,
            tabBarLabel: 'Trang chủ',
            tabBarVisible: false
        }
    }
});

const MainNavigator = createBottomTabNavigator({
        Home: HomeStack,
    },{
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarOptions: {
                activeTintColor: '#2997d8',
                inactiveTintColor: '#919191'
            },
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                let iconSize = 26;
                let iconType = 'Ionicons';
                if (routeName === 'Home') {
                    iconName = 'ios-home';
                } else if (routeName === 'Buildings') {
                    iconName = `building${focused ? '' : '-o'}`;
                    iconSize = 22;
                    iconType = 'FontAwesome';
                } else if (routeName === 'Locations') {
                    iconName = 'location-pin';
                    iconType = 'Entypo';
                    iconSize = 28;
                } else if (routeName === 'Account') {
                    iconSize = 32;
                    iconName = 'ios-person';
                } else if (routeName === 'Appointment') {
                    iconSize = 22;
                    iconName = `calendar${focused ? '' : '-o'}`;
                    iconType = 'FontAwesome';
                }
                return <Icon name={iconName} style={{ color: tintColor, fontSize: iconSize }} type={iconType} />;
            }
        }),
        initialRouteName: 'Home'
    }
);

const AppNavigator = createStackNavigator({
    Main: createSwitchNavigator({ MainNavigator })
}, {
    defaultNavigationOptions: { header: null },
    initialRouteName: 'Main'
});
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;