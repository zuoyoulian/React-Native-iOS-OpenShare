# React-Native-iOS-OpenShare

实现了QQ、微信、微博的登录和分享功能。
#### built from[OpenShare](https://github.com/100apps/openshare)

## 安装
1. 在工程目录下运行命令：npm install https://github.com/zuoyoulian/React-Native-iOS-OpenShare.git --save；  
2. 在Xcode工程目录下新建“New Group”，并命名“OpenShare”；  
3. 在OpenShare下添加文件，选择`node_modules` --> `React-Native-iOS-OpenShare` --> 'share-ios' --> `src`下所有的文件进行添加；  
4. 打开Info.plist文件`Open As => Source code`，在文件中添加

```
<key>CFBundleURLTypes</key>
	<array>
		<dict>
			<key>CFBundleURLName</key>
			<string>RNShare</string>
			<key>CFBundleURLSchemes</key>
			<array>
				<string>wx508e4ac1aebc3477</string>
				<string>tencent1105466267</string>
				<string>tencent1105466267.content</string>
				<string>QQ41E4139B</string>
				<string>wb3196575651</string>
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
[OpenShare connectQQWithAppId:@"1105466267"];
[OpenShare connectWeiboWithAppKey:@"3196575651"];
[OpenShare connectWeixinWithAppId:@"wx508e4ac1aebc3477"];
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
