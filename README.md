# React-Native-iOS-OpenShare

实现了QQ、微信、微博的登录和分享功能。
#### built from[OpenShare](https://github.com/100apps/openshare)

## Demo示例
![登录](https://github.com/zuoyoulian/React-Native-iOS-OpenShare/blob/master/login1.PNG?raw=true) 
![分享](https://github.com/zuoyoulian/React-Native-iOS-OpenShare/blob/master/share1.PNG?raw=true) 

## 文件说明
share-ios文件夹是封装的登录、分享模块；  
share.ios.js是封装的js的函数，在工程中直接调用该文件中的登录或者分享函数；  
授权登录函数说明：  
例如微信授权登录函数： 

```
weixinLogin(callBack: Function) {
   openShare.wechatLogin();
   openShare.addListener('WeixinLoginCallBack');
   DeviceEventEmitter.addListener(
     'WeixinLoginCallBack',
     (response) => {
        callBack(response)
        openShare.removeListeners(1); 
        DeviceEventEmitter.removeAllListeners('WeixinLoginCallBack');
    }
  );
}

参数callBack：是将登录的信息进行回调；
第一行代码：openShare.wechatLogin()，通过oc的openShare对象调用登录方法；  
第二行代码：oc对象openShare添加微信登录的回调监听；
第三行代码：js对象DeviceEventEmitter添加监听，并且注册监听回调函数，当登录成功或者失败，oc对象会将登录信息返回；
回调函数中：callBack(response)是将返回的信息回调给方法调用；
          removeListeners函数，是将监听移除；
```

分享函数说明：  
例如分享到微博：

```
shareToWeibo(info: Object, callBack: Function) {
	openShare.shareToWeiboWithInfo(info);
	openShare.addListener('WeiboShareCallBack');
	DeviceEventEmitter.addListener(
	  'WeiboShareCallBack',
	  (response) => {
	    callBack(response)
	    openShare.removeListeners(1);
	    DeviceEventEmitter.removeAllListeners('WeiboShareCallBack');
	  }
	);
}

参数：
info：分享的信息，
      参数info格式：
	    title 标题
	    desc 描述
	    thumbnail 缩略图  图片传地址
	    image  原图   图片传地址
	    link  链接
callBack：将分享的结果进行回调；
```

## 安装
1. 在工程目录下运行命令：npm install https://github.com/zuoyoulian/React-Native-iOS-OpenShare.git --save；  
2. 在Xcode工程目录下新建“New Group”，并命名“OpenShare”；在OpenShare下添加文件，选择`node_modules` --> `React-Native-iOS-OpenShare` --> 'share-ios' --> `src`下所有的文件进行添加；  
3. 打开Info.plist文件`Open As => Source code`，在文件中添加

```
<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleURLName</key>
			<string>RNShare</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>wxxxxxxxxxxxxxxx</string>
				<string>tencentxxxxxxxxxxx</string>
				<string>tencentxxxxxxxxx.content</string>
				<string>xxxxxxxxx</string>
				<string>wbxxxxxxxxxxx</string>
			</array>
		</dict>
	</array>
	<key>CFBundleVersion</key>
	<string>1</string>
	<key>LSApplicationQueriesSchemes</key>
	<array>
		<string>mqqOpensdkSSoLogin</string>
		<string>mqzone</string>
		<string>mqqapi</string>
		<string>mqqwpa</string>
		<string>mqqOpensdkSSoLogin</string>
		<string>weibosdk</string>
		<string>weixin</string>
		<string>wechat</string>
	</array>
	<key>NSAppTransportSecurity</key>
	<dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
	</dict>
```

## AppDelegate.m
1.添加头文件 `#import "OpenShareHeader.h"`  
2.在`- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions`方法中添加应用在各平台下注册的信息  

```
[OpenShare connectQQWithAppId:@"xxxxxxxxxx"];
[OpenShare connectWeiboWithAppKey:@"xxxxxxx"];
[OpenShare connectWeixinWithAppId:@"xxxxxxxxx"];
```  
3.在`-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation`方法中添加回调代码：  

```
-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation{
  //第二步：添加回调
  if ([OpenShare handleOpenURL:url]) {
    return YES;
  }
  return YES;
}
```
## 使用
代码示例：

```
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
  AlertIOS,
  View
} from 'react-native';

import Share from './node_modules/React-Native-iOS-OpenShare/share-ios/share'

class Demo extends Component {

  constructor(props) {
    super(props);
    
    // 测试分享数据
    this.info = {title: '测试', desc: 'rn分享', thumbnail: 'http://jijia.tuofeng.cn/plan/images/ins_company/ddhrs.jpg', image: 'http://jijia.tuofeng.cn/plan/images/ins_company/ddhrs.jpg', link: 'http://jijia.tuofeng.cn/#plans'};
  }
  
  // 登录授权
   _weixinLogin() {
     Share.IsWeixinInstalled().then(result => {
	   if(result) {
		 Share.weixinLogin(response => {
		   console.log('response', response)
	     })
	   } else {
		   AlertIOS.alert(
              'result',
              '您没有安装微信，无法进行授权登录'
           );
	   }
     })
   }
   _qqLogin() {
     Share.IsQQInstalled().then(result => {
	   if(result) {
	     Share.qqLogin(response => {
	       console.log('response', response)
		 })
	    } else {
		    AlertIOS.alert(
              'result',
              '您没有安装QQ，无法进行授权登录'
           );
	    }
	  }) 
   }
   _weiboLogin() {
     Share.IsWeiboInstalled().then(result => {
	   if(result) {
		 Share.weiboLogin(response => {
		   console.log('response', response)
	     })
	   } else {
		   AlertIOS.alert(
              'result',
              '您没有安装微博，无法进行授权登录'
           );
	   }
     })
   }
  
// 分享
    _shareToWeibo(){
      Share.IsWeiboInstalled().then(result => {
	      if(result) {
		    Share.shareToWeibo(this.info, response => {
			    AlertIOS.alert(
	             'response',
	             JSON.stringify(response)
	           );
		    });
	      } else {
		    AlertIOS.alert(
              'result',
              '您没有安装微博，无法分享'
           );
	      }
      })
    }
    
    _shareToQQFriends(){
      Share.IsQQInstalled().then(result => {
	    if(result) {
		  Share.shareToQQFriends(this.info, response => {
		        console.log('response', response)
			    AlertIOS.alert(
	             'response',
	             JSON.stringify(response)
	           );
		  });
	    } else {
		    AlertIOS.alert(
		      'reslut',
		      '您没有安装QQ，无法分享'
		    )
	    }
      })
    }
    _shareToQQZone(){
	  Share.IsQQInstalled().then(result => {
	    if(result) {
		  Share.shareToQQZone(this.info, response => {
			    AlertIOS.alert(
	             'response',
	             JSON.stringify(response)
	           );
		  });
	    } else {
		    AlertIOS.alert(
		      'reslut',
		      '您没有安装QQ，无法分享'
		    )
	    }
      })
    }
    _shareToQQFavorites(){
	  Share.IsQQInstalled().then(result => {
	    if(result) {
		  Share.shareToQQFavorites(this.info, response => {
			    AlertIOS.alert(
	             'response',
	             JSON.stringify(response)
	           );
		  });
	    } else {
		    AlertIOS.alert(
		      'reslut',
		      '您没有安装QQ，无法分享'
		    )
	    }
      })
    }
    _shareToQQDataline(){
	  Share.IsQQInstalled().then(result => {
	    if(result) {
		  Share.shareToQQDataline(this.info, response => {
			    AlertIOS.alert(
	             'response',
	             JSON.stringify(response)
	           );
		  });
	    } else {
		    AlertIOS.alert(
		      'reslut',
		      '您没有安装QQ，无法分享'
		    )
	    }
      })
    }
    
    _shareToWeixinSession() {
	   Share.IsWeixinInstalled().then(result => {
	    if(result) {
		  Share.shareToWeixinSession(this.info, response => {
		    AlertIOS.alert(
	          'response',
	          JSON.stringify(response)
	        );
		  });
	    } else {
		    AlertIOS.alert(
		      'reslut',
		      '您没有安装微信，无法分享'
		    )
	    }
      }) 
    }
    _shareToWeixinTimeline() {
	    Share.IsWeixinInstalled().then(result => {
	    if(result) {
		  Share.shareToWeixinTimeline(this.info, response => {
			AlertIOS.alert(
	          'response',
	          JSON.stringify(response)
	        );
		  });
	    } else {
		    AlertIOS.alert(
		      'reslut',
		      '您没有安装微信，无法分享'
		    )
	    }
      }) 
    }
    _shareToWeixinFavorite() {
	    Share.IsWeixinInstalled().then(result => {
	    if(result) {
		  Share.shareToWeixinFavorite(this.info, response => {
	        AlertIOS.alert(
	          'response',
	          JSON.stringify(response)
	        );
		  });
	    } else {
		    AlertIOS.alert(
		      'reslut',
		      '您没有安装微信，无法分享'
		    )
	    }
      })
    }


  render() {
    return (
      <View style={styles.container}>
        <Text style={{backgroundColor:'red'}}>登录</Text>
        <TouchableOpacity onPress={this._weixinLogin.bind(this)}>
          <Text style={{height:30}}>WeChat Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._qqLogin.bind(this)}>
          <Text style={{height:30}}>QQ Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Share.weiboLogin}>
          <Text style={{height:30}}>weibo Login</Text>
        </TouchableOpacity>
        
        <Text style={{backgroundColor:'red'}}>分享</Text>
        <Text>QQ分享</Text>
        <TouchableOpacity onPress={this._shareToQQFriends.bind(this)}>
          <Text style={{height:30}}>QQFriends share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._shareToQQZone.bind(this)}>
          <Text style={{height:30}}>QQZone share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._shareToQQFavorites.bind(this)}>
          <Text style={{height:30}}>QQFavorites share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._shareToQQDataline.bind(this)}>
          <Text style={{height:30}}>QQDataline share</Text>
        </TouchableOpacity>
        <Text>微博分享</Text>
        <TouchableOpacity onPress={this._shareToWeibo.bind(this)}>
          <Text style={{height:30}}>weibo share</Text>
        </TouchableOpacity>
        <Text>微信分享</Text>
        <TouchableOpacity onPress={this._shareToWeixinSession.bind(this)}>
          <Text style={{height:30}}>weixinSession share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._shareToWeixinTimeline.bind(this)}>
          <Text style={{height:30}}>weixinTimeline share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._shareToWeixinFavorite.bind(this)}>
          <Text style={{height:30}}>weixinFavorite share</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Demo', () => Demo);
```