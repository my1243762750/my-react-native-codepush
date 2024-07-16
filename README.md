```markdown
### Code Push 功能说明

#### 1. 全局安装 Code Push CLI

```bash
npm install -g code-push-cli
```

#### 2. 在 React Native 中安装 Code Push

```bash
npm install react-native-code-push --save
```

#### 3. 在代码中 App.tsx 添加相关配置

（此步骤具体实现根据项目需求配置）

#### 4. Android 的相关配置

1. 在 `android/settings.gradle` 文件末尾，添加如下内容：
   ```gradle
   include ':app', ':react-native-code-push'
   project(':react-native-code-push').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-code-push/android/app')
   ```

2. 在 `android/app/build.gradle` 文件末尾，添加如下内容：
   ```gradle
   apply from: "../../node_modules/react-native-code-push/android/codepush.gradle"
   ```

3. 修改 `MainApplication` 文件：
   - 如果是 `MainApplication.kt`:
     ```kotlin
     // 1. Import the plugin class.
     import com.microsoft.codepush.react.CodePush
     
     class MainApplication : Application(), ReactApplication {
     
         override val reactNativeHost: ReactNativeHost =
         object : DefaultReactNativeHost(this) {
             // 2. Override the getJSBundleFile method in order to let
             // the CodePush runtime determine where to get the JS
             // bundle location from on each app start
             override fun getJSBundleFile(): String {
                 return CodePush.getJSBundleFile() 
             }
         }
     }
     ```
   - 如果是 `MainApplication.java`:
     ```java
     // 1. Import the plugin class.
     import com.microsoft.codepush.react.CodePush;
     
     public class MainApplication extends Application implements ReactApplication {
         private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
             // 2. Override the getJSBundleFile method in order to let
             // the CodePush runtime determine where to get the JS
             // bundle location from on each app start
             @Override
             protected String getJSBundleFile() {
                 return CodePush.getJSBundleFile();
             }
         };
     }
     ```

#### 5. 打包 APK 或 IPA 到 App Center 上面去

（此步骤具体实现根据项目需求配置）
```