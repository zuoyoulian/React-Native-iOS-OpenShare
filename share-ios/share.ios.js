'use strict'
import {
  DeviceEventEmitter,
  Linking,
  AlertIOS
} from 'react-native';


import openShare from 'React-Native-iOS-OpenShare'


export default class Share {
  
	// 判断是否安装
	 IsQQInstalled() {
	  return new Promise(function(resolve, reject){
        Linking.canOpenURL('weixin://').then(function(ret){
          resolve(ret)
        })
      })
	}
    IsWeiboInstalled() {
	  return new Promise(function(resolve, reject){
        Linking.canOpenURL('weibosdk://request').then(function(ret){
          resolve(ret)
        })
      })
	}
	IsWeixinInstalled() {
		return new Promise(function(resolve, reject){
        Linking.canOpenURL('weixin://').then(function(ret){
          resolve(ret)
        })
      })
	}
	
	// 授权登录
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
  
  qqLogin(callBack: Function) {
	openShare.qqLogin();
	openShare.addListener('QQLoginCallBack');
	DeviceEventEmitter.addListener(
      'QQLoginCallBack',
      (response) => {
        callBack(response)
        openShare.removeListeners(1);
        DeviceEventEmitter.removeAllListeners('QQLoginCallBack');
      }
    );
  }
  
  weiboLogin(callBack: Function) {
	openShare.weiboLogin();
	openShare.addListener('WeiboLoginCallBack');
	DeviceEventEmitter.addListener(
      'WeiboLoginCallBack',
      (response) => {
        callBack(response)
        openShare.removeListeners(1);
        DeviceEventEmitter.removeAllListeners('WeiboLoginCallBack');
      }
    );
  }
  
  
  // 分享
  /*
	参数info格式：
	  title 标题
	  desc 描述
	  thumbnail 缩略图  图片传地址
	  image  原图   图片传地址
	  link  链接
  */
  
  // 分享到微博
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
  
  // 分享到QQ好友
  shareToQQFriends(info: Object, callBack: Function) {
	  openShare.shareToQQFriendsWithInfo(info);
	  openShare.addListener('QQShareCallBack');
	  console.log('1111111')
	  DeviceEventEmitter.addListener(
	    'QQShareCallBack',
	    (response) => {
	      callBack(response)
	      openShare.removeListeners(1);
	      DeviceEventEmitter.removeAllListeners('QQShareCallBack');
	    }
	  );
  }
  
  //  分享QQ空间
    shareToQQZone(info: Object, callBack: Function) {
	  openShare.shareToQQZoneWithInfo(info);
	  openShare.addListener('QQShareCallBack');
	  DeviceEventEmitter.addListener(
	    'QQShareCallBack',
	    (response) => {
	      callBack(response)
	      openShare.removeListeners(1);
	      DeviceEventEmitter.removeAllListeners('QQShareCallBack');
	    }
	  );
    }
    
    // 分享QQ收藏
    shareToQQFavorites(info: Object, callBack: Function) {
	  openShare.shareToQQFavoritesWithInfo(info);
	  openShare.addListener('QQShareCallBack');
	  DeviceEventEmitter.addListener(
	    'QQShareCallBack',
	    (response) => {
	      callBack(response)
	      openShare.removeListeners(1);
	      DeviceEventEmitter.removeAllListeners('QQShareCallBack');
	    }
	  );
    }
    
    // 分享QQ传文件到我的电脑
    shareToQQDataline(info: Object, callBack: Function) {
	  openShare.shareToQQDatalineWithInfo(info);
	  openShare.addListener('QQShareCallBack');
	  DeviceEventEmitter.addListener(
	    'QQShareCallBack',
	    (response) => {
	      callBack(response)
	      openShare.removeListeners(1);
	      DeviceEventEmitter.removeAllListeners('QQShareCallBack');
	    }
	  );
    }
	
	// 分享微信好友
	shareToWeixinSession(info: Object, callBack: Function) {
	  openShare.shareToWeixinSessionWithInfo(info)
	  openShare.addListener('WeixinShareCallBack');
	  DeviceEventEmitter.addListener(
	    'WeixinShareCallBack',
	    (response) => {
	      callBack(response)
	      openShare.removeListeners(1);
	      DeviceEventEmitter.removeAllListeners('WeixinShareCallBack');
	    }
	  );
	}
	
	// 分享微信朋友圈
	shareToWeixinTimeline(info: Object, callBack: Function) {
	  openShare.shareToWeixinTimelineWithInfo(info)
	  openShare.addListener('WeixinShareCallBack');
	  DeviceEventEmitter.addListener(
	    'WeixinShareCallBack',
	    (response) => {
	      callBack(response)
	      openShare.removeListeners(1);
	      DeviceEventEmitter.removeAllListeners('WeixinShareCallBack');
	    }
	  );
	}
	
	// 分享微信收藏
	shareToWeixinFavorite(info: Object, callBack: Function) {
	  openShare.shareToWeixinFavoriteWithInfo(info)
	  openShare.addListener('WeixinShareCallBack');
	  DeviceEventEmitter.addListener(
	    'WeixinShareCallBack',
	    (response) => {
	      callBack(response)
	      openShare.removeListeners(1);
	      DeviceEventEmitter.removeAllListeners('WeixinShareCallBack');
	    }
	  );
	}
}

module.exports = new Share();


