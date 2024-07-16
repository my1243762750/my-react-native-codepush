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