/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import DeviceInfo from 'react-native-device-info'

class Demo extends Component {

  componentDidMount() {
	console.log('DeviceInfo.getDeviceId()', DeviceInfo.getUniqueID())
  }
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
		   AlertIOS.alert(
	           'response',
	           JSON.stringify(response)
	         );
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
	       AlertIOS.alert(
	           'response',
	           JSON.stringify(response)
	         );
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
		   AlertIOS.alert(
	           'response',
	           JSON.stringify(response)
	         );
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
