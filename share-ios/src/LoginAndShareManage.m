//
//  LoginAndShareManage.m
//  Demo_OpenShare
//
//  Created by 左建军 on 16/7/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "LoginAndShareManage.h"
#import "OpenShareHeader.h"

@implementation LoginAndShareManage

// 回调消息
NSString *const QQLoginCallBack = @"QQLoginCallBack";
NSString *const WeixinLoginCallBack = @"WeixinLoginCallBack";
NSString *const WeiboLoginCallBack = @"WeiboLoginCallBack";
NSString *const WeiboShareCallBack = @"WeiboShareCallBack";
NSString *const QQShareCallBack = @"QQShareCallBack";
NSString *const WeixinShareCallBack = @"WeixinShareCallBack";


RCT_EXPORT_MODULE(@"");

//  添加回调消息
- (NSArray<NSString *> *)supportedEvents
{
  return @[QQLoginCallBack, WeixinLoginCallBack, WeiboLoginCallBack,
           WeiboShareCallBack, QQShareCallBack, WeixinShareCallBack];
}

//  QQ授权登录
RCT_EXPORT_METHOD(qqLogin) {
  [OpenShare QQAuth:@"get_user_info" Success:^(NSDictionary *message) {
    
    [self sendEventWithName:QQLoginCallBack body:@{@"title": @"QQ登录成功", @"res": message}];
    
  } Fail:^(NSDictionary *message, NSError *error) {
    
    [self sendEventWithName:QQLoginCallBack body:@{@"title": @"QQ登录失败", @"res": message, @"error": error}];
    
  }];
}

//  微信授权登录
RCT_EXPORT_METHOD(wechatLogin) {
  [OpenShare WeixinAuth:@"snsapi_userinfo" Success:^(NSDictionary *message) {
    
    [self sendEventWithName:WeixinLoginCallBack body:@{@"title": @"微信登录成功", @"res": message}];
    
  } Fail:^(NSDictionary *message, NSError *error) {
    
    [self sendEventWithName:WeixinLoginCallBack body:@{@"title": @"微信登录失败", @"res": message, @"error": error}];
    
  }];
}

//  微博登录
RCT_EXPORT_METHOD(weiboLogin) {
  [OpenShare WeiboAuth:@"all" redirectURI:@"http://sina.com" Success:^(NSDictionary *message) {
    
    NSMutableDictionary* data = [self change:message];
    [self sendEventWithName:WeiboLoginCallBack body:@{@"title": @"微博登录成功", @"res": data}];
    
  } Fail:^(NSDictionary *message, NSError *error) {
    
    NSMutableDictionary* data = [self change:message];
    [self sendEventWithName:WeiboLoginCallBack body:@{@"title": @"微博登录失败", @"res": data, @"error": error}];
    
  }];
}
//处理 返回数据中的expirationDate值，因为值的格式有问题，转换成 string 后才能符合 json 的格式要求。
- (NSMutableDictionary*)change: (NSDictionary *)message {
  
  NSMutableDictionary* data = [message mutableCopy];
  if ([message objectForKey:@"expirationDate"]) {
    
    NSDateFormatter *dateToStringFormatter = [[NSDateFormatter alloc] init];
    [dateToStringFormatter setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
    
    NSDate *date= [data objectForKey:@"expirationDate"];
    NSString *strDate = [dateToStringFormatter stringFromDate:date];
    
    data = [message mutableCopy];
    
    [data setObject:strDate forKey:@"expirationDate"];
  }
  return data;
  
}

//  分享微博
RCT_EXPORT_METHOD(shareToWeiboWithInfo:(NSDictionary *)info){
  [self _shareToWeiboWithInfo:info];
}
- (void)_shareToWeiboWithInfo:(NSDictionary *)info {
  // 创建分享对象
  OSMessage *message = [[OSMessage alloc] init];
  message.title = info[@"title"];
  message.desc = info[@"desc"];
  message.image = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"image"]]]];
  message.thumbnail = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"thumbnail"]]]];
  message.link = info[@"link"];
  [OpenShare shareToWeibo:message Success:^(OSMessage *message) {
    
    [self sendEventWithName:WeiboShareCallBack body:@{@"title": @"微博分享成功"}];
    
  } Fail:^(OSMessage *message, NSError *error) {
    NSLog(@"error = %@", error);
    [self sendEventWithName:WeiboShareCallBack body:@{@"title": @"微博分享失败"}];
    
  }];
}

//  分享QQ好友
RCT_EXPORT_METHOD(shareToQQFriendsWithInfo:(NSDictionary *)info){
  // 创建分享对象
  OSMessage *message = [[OSMessage alloc] init];
  message.title = info[@"title"];
  message.desc = info[@"desc"];
  message.image = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"image"]]]];
  message.thumbnail = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"thumbnail"]]]];
  message.link = info[@"link"];
  
  [OpenShare shareToQQFriends:message Success:^(OSMessage *message) {
    NSLog(@"message = %@", message);
    [self sendEventWithName:QQShareCallBack body:@{@"title": @"QQ好友分享成功"}];
  } Fail:^(OSMessage *message, NSError *error) {
    NSLog(@"error = %@", error);
    [self sendEventWithName:QQShareCallBack body:@{@"title": @"QQ好友分享失败"}];
  }];
}

//  分享QQ空间
RCT_EXPORT_METHOD(shareToQQZoneWithInfo:(NSDictionary *)info){
  // 创建分享对象
  OSMessage *message = [[OSMessage alloc] init];
  message.title = info[@"title"];
  message.desc = info[@"desc"];
  message.image = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"image"]]]];
  message.thumbnail = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"thumbnail"]]]];
  message.link = info[@"link"];
  
  [OpenShare shareToQQZone:message Success:^(OSMessage *message) {
    NSLog(@"message = %@", message);
    [self sendEventWithName:QQShareCallBack body:@{@"title": @"QQ空间分享成功"}];
  } Fail:^(OSMessage *message, NSError *error) {
    NSLog(@"error = %@", error);
    [self sendEventWithName:QQShareCallBack body:@{@"title": @"QQ空间分享失败"}];
  }];
}

//  分享QQ收藏
RCT_EXPORT_METHOD(shareToQQFavoritesWithInfo:(NSDictionary *)info){
  // 创建分享对象
  OSMessage *message = [[OSMessage alloc] init];
  message.title = info[@"title"];
  message.desc = info[@"desc"];
  message.image = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"image"]]]];
  message.thumbnail = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"thumbnail"]]]];
  message.link = info[@"link"];
  
  [OpenShare shareToQQFavorites:message Success:^(OSMessage *message) {
    NSLog(@"message = %@", message);
    [self sendEventWithName:QQShareCallBack body:@{@"title": @"QQ收藏分享成功"}];
  } Fail:^(OSMessage *message, NSError *error) {
    NSLog(@"error = %@", error);
    [self sendEventWithName:QQShareCallBack body:@{@"title": @"QQ收藏分享失败"}];
  }];
}

//  分享QQ共享
RCT_EXPORT_METHOD(shareToQQDatalineWithInfo:(NSDictionary *)info){
  [self _shareToQQDatalineWithInfo:info];
}
-(void)_shareToQQDatalineWithInfo:(NSDictionary *)info{
  // 创建分享对象
  OSMessage *message = [[OSMessage alloc] init];
  message.title = info[@"title"];
  message.desc = info[@"desc"];
  message.image = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"image"]]]];
  message.thumbnail = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"thumbnail"]]]];
  message.link = info[@"link"];
  
  [OpenShare shareToQQDataline:message Success:^(OSMessage *message) {
    NSLog(@"message = %@", message);
    [self sendEventWithName:QQShareCallBack body:@{@"title": @"QQ共享分享成功"}];
  } Fail:^(OSMessage *message, NSError *error) {
    [self sendEventWithName:QQShareCallBack body:@{@"title": @"QQ共享分享失败"}];
  }];
}


//  分享微信好友
RCT_EXPORT_METHOD(shareToWeixinSessionWithInfo:(NSDictionary *)info) {
  // 创建分享对象
  OSMessage *message = [[OSMessage alloc] init];
  message.title = info[@"title"];
  message.desc = info[@"desc"];
  message.image = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"image"]]]];
  message.thumbnail = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"thumbnail"]]]];
  message.link = info[@"link"];
  
  [OpenShare shareToWeixinSession:message Success:^(OSMessage *message) {
    
    [self sendEventWithName:WeixinShareCallBack body:@{@"title": @"微信好友分享成功"}];
    
  } Fail:^(OSMessage *message, NSError *error) {
    [self sendEventWithName:WeixinShareCallBack body:@{@"title": @"微信好友分享失败"}];
  }];
}

//  分享微信朋友圈
RCT_EXPORT_METHOD(shareToWeixinTimelineWithInfo:(NSDictionary *)info) {
  // 创建分享对象
  OSMessage *message = [[OSMessage alloc] init];
  message.title = info[@"title"];
  message.desc = info[@"desc"];
  message.image = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"image"]]]];
  message.thumbnail = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"thumbnail"]]]];
  message.link = info[@"link"];
  
  [OpenShare shareToWeixinTimeline:message Success:^(OSMessage *message) {
    [self sendEventWithName:WeixinShareCallBack body:@{@"title": @"微信朋友圈分享成功"}];
  } Fail:^(OSMessage *message, NSError *error) {
    [self sendEventWithName:WeixinShareCallBack body:@{@"title": @"微信朋友圈分享失败"}];
  }];
}

//  分享微信收藏
RCT_EXPORT_METHOD(shareToWeixinFavoriteWithInfo:(NSDictionary *)info) {
  // 创建分享对象
  OSMessage *message = [[OSMessage alloc] init];
  message.title = info[@"title"];
  message.desc = info[@"desc"];
  message.image = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"image"]]]];
  message.thumbnail = [[UIImage alloc] initWithData:[NSData dataWithContentsOfURL:[NSURL URLWithString:info[@"thumbnail"]]]];
  message.link = info[@"link"];
  
  [OpenShare shareToWeixinFavorite:message Success:^(OSMessage *message) {
    [self sendEventWithName:WeixinShareCallBack body:@{@"title": @"微信收藏分享成功"}];
  } Fail:^(OSMessage *message, NSError *error) {
    [self sendEventWithName:WeixinShareCallBack body:@{@"title": @"微信收藏分享失败"}];
  }];
}

@end
