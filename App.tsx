import React from 'react';
import codePush from 'react-native-code-push';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    Header,
} from 'react-native/Libraries/NewAppScreen';

const codePushOptions = {
    updateDialog: true,
    installMode: codePush.InstallMode.IMMEDIATE,
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
}

const codePushSyncCallback = (status: string) => {
    console.log('status', status)
};

codePush.sync(
    {
        // updateDialog: true,
        updateDialog: {
            // 是否显示更新描述
            appendReleaseDescription: true,
            // 更新描述的前缀
            descriptionPrefix: '更新内容:',
            title: '升级提示',
            mandatoryContinueButtonLabel: '立即更新',
            mandatoryUpdateMessage: '最新版本已经为您准备好，来High吧',
            optionalUpdateMessage: '可选更新',
            optionalIgnoreButtonLabel: '忽略',
            optionalInstallButtonLabel: '更新',
        },
        installMode: codePush.InstallMode.IMMEDIATE,
        checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    },
    codePushSyncCallback,
);

function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <Header/>
                <View>
                    <Text>react native code push</Text>
                    <Text>haha</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

export default codePush(codePushOptions)(App);
// export default App;
