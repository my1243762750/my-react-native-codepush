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

#### 5. ios 的相关配置
1. 修改 `AppDelegate.m` 文件，添加 `#import <CodePush/CodePush.h>` 
2. 将 `return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];`修改为 `return [CodePush bundleURL];`

#### 6. 打包 APK 或 IPA 到 App Center 上面去
1. **检查登录状态：**
   使用以下命令来查看当前是否已登录到 App Center CLI：
   ```bash
   appcenter profile list
   ```
   这会列出所有已登录的 App Center 账号信息，包括用户名、邮箱等。

2. **切换账号：**
   如果需要切换到另一个 App Center 账号，可以使用以下命令注销当前账号：
   ```bash
   appcenter logout
   ```
   然后再使用 `appcenter login` 命令登录到另一个账号。

3. **确认登录账号：**
   登录成功后，可以使用 `appcenter profile list` 命令再次检查，确认已经登录到了正确的账号。

4. 在项目根目录下，创建makefile文件，里面放入如下代码 
   codepush-android:
      appcenter codepush release-react -a 1243762750-qq.com/basic-android-app -d Production
```