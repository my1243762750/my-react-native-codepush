```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

### 打包ios
1、通过xcode打开<项目名称>.xcodeproj，在右侧tab页找到Signing & Capabilities，
把自己的Bundle Identifier如xxx.com.meiyang886放进入，xxx是组织的名称也是成为苹果开发者的团队id（如何成为苹果开发者，请查询相关教程），
com.meiyang886是你的域名，可以随意写。
2、在/Users/apple/IdeaProjects/my-react-native/ios/AwesomeProject路径下（请找到你的项目名/ios/ios项目名），新建一个exportOptions.plist文件，代码如下
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>development</string> <!-- 可根据需要调整为 app-store, ad-hoc, enterprise development 等 -->

    <key>teamID</key>
    <string>C6CS3D7Q2R</string> <!-- 替换为你的开发团队的 Team ID -->

    <key>provisioningProfiles</key>
    <dict>
        <key>C6CS3D7Q2R.com.meiyang886</key>
        <string>yang mei</string> <!-- 替换为你的应用程序的 Bundle Identifier 和配置文件的名称 -->
    </dict>
</dict>
</plist>
```
3、在项目/package.json下面的scripts选项添加如下命令：
"bundle-ios": "react-native bundle --platform ios --entry-file index.js --dev false --bundle-output ios/main.jsbundle --assets-dest ios",
"archive-ios": "xcodebuild -workspace ios/AwesomeProject.xcworkspace -scheme AwesomeProject -configuration Release -sdk iphoneos -archivePath ./build/AwesomeProject.xcarchive clean archive",
"build-ios": "xcodebuild -exportArchive -archivePath ./build/AwesomeProject.xcarchive -exportPath ./build/AwesomeProject.ipa -exportOptionsPlist ./ios/AwesomeProject/exportOptions.plist",
"package-ios": "yarn bundle-ios && yarn archive-ios && yarn build-ios",
其中AwesomeProject.xcworkspace 或 AwesomeProject.xcarchive 中的AwesomeProject 需要替换为你的ios项目名称。
这三个命令分别是 `bundle-ios`, `archive-ios`, 和 `build-ios`，它们通常一起使用来完成 React Native 应用在 iOS 平台上的打包和发布流程。
1. **bundle-ios**:
    - 这个命令是用来打包 React Native 应用的 JavaScript 代码。
    - 具体命令是 `react-native bundle --platform ios --entry-file index.js --dev false --bundle-output ios/main.jsbundle --assets-dest ios`。
    - 参数解释：
        - `--platform ios`: 指定打包的平台为 iOS。
        - `--entry-file index.js`: 指定入口文件为 `index.js`，这是 React Native 应用的主 JavaScript 文件。
        - `--dev false`: 表示不在开发模式下打包，生成的 bundle 是用于发布的。
        - `--bundle-output ios/main.jsbundle`: 指定生成的 bundle 文件路径和名称。
        - `--assets-dest ios`: 指定资源文件的输出目录为 `ios` 文件夹下。
    - 生成的 `main.jsbundle` 文件包含了整个 React Native 应用的 JavaScript 代码。

2. **archive-ios**:
    - 这个命令用来将应用程序打包成一个 Xcode 工程的归档文件（archive）。
    - 具体命令是 `xcodebuild -workspace ios/AwesomeProject.xcworkspace -scheme AwesomeProject -configuration Release -sdk iphoneos -archivePath ./build/AwesomeProject.xcarchive clean archive`。
    - 参数解释：
        - `-workspace ios/AwesomeProject.xcworkspace`: 指定 Xcode 工作空间的路径。
        - `-scheme AwesomeProject`: 指定 Xcode 工程的 Scheme。
        - `-configuration Release`: 指定打包的配置为 Release 版本。
        - `-sdk iphoneos`: 指定打包的目标平台为 iOS 设备。
        - `-archivePath ./build/AwesomeProject.xcarchive`: 指定生成的归档文件路径和名称。
        - `clean archive`: 执行清理并打包操作。
    - 这一步操作会生成一个 `.xcarchive` 文件，其中包含了编译后的应用程序和符号文件等。

3. **build-ios**:
    - 这个命令用来导出 Xcode 归档文件为 IPA 文件（iOS 应用程序包）。
    - 具体命令是 `xcodebuild -exportArchive -archivePath ./build/AwesomeProject.xcarchive -exportPath ./build/AwesomeProject.ipa -exportOptionsPlist ./ios/AwesomeProject/exportOptions.plist`。
    - 参数解释：
        - `-archivePath ./build/AwesomeProject.xcarchive`: 指定要导出的归档文件路径和名称。
        - `-exportPath ./build/AwesomeProject.ipa`: 指定生成的 IPA 文件路径和名称。
        - `-exportOptionsPlist ./ios/AwesomeProject/exportOptions.plist`: 指定导出选项的配置文件，这个文件通常包含了打包时的一些配置，比如签名信息和目标设备等。
    - 执行该命令后，将生成一个用于发布到 App Store 或者分发测试的 IPA 文件。

综上所述，这三个命令共同组成了 React Native 应用在 iOS 平台上的完整打包和发布流程，确保应用能够顺利地在设备上运行并且符合 App Store 的要求。

### 打包android
1、生成签名密钥
    - 命令：`$ keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`，最后它会生成一个叫做my-release-key.keystore的密钥库文件
2、设置 gradle 变量
   1、把my-release-key.keystore文件放到你工程中的android/app文件夹下。
   2、编辑~/.gradle/gradle.properties（全局配置，对所有项目有效）或是项目目录/android/gradle.properties（项目配置，只对所在项目有效）。如果没有gradle.properties文件你就自己创建一个，添加如下的代码（注意把其中的****替换为相应密码）
      MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
      MYAPP_RELEASE_KEY_ALIAS=my-key-alias
      MYAPP_RELEASE_STORE_PASSWORD=*****
      MYAPP_RELEASE_KEY_PASSWORD=*****
3、编辑你项目目录下的android/app/build.gradle，添加如下的签名配置：
```
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```
4、在项目/package.json下面的scripts选项添加如下命令：
"package-android": "cd android && ./gradlew assembleRelease",