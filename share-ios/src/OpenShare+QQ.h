//
//  OpenShare+QQ.h
//  openshare
//
//  Created by LiuLogan on 15/5/15.
//  Copyright (c) 2015年 OpenShare <http://openshare.gfzj.us/>. All rights reserved.
//

#import "OpenShare.h"

@interface OpenShare (QQ)
/**
 *  连接QQ平台。可以分享到：qq好友／qq空间。只需要appId：http://op.open.qq.com/index.php?mod=appinfo&act=main&appid=1103194207#mobile|center
 *  需要添加CFBundleURLSchemes：
 *  <array>
 *  <string>tencent1103194207</string>
 *  <string>tencent1103194207.content</string>
 *  <string>QQ41C1685F</string> 16进制表示的appid，可以通过new Number(1103194207).toString(16).toUpperCase()获取。
 *  @param appId 所申请的应用的APP ID
 */
+(void)connectQQWithAppId:(NSString *)appId;
+(BOOL)isQQInstalled;

+(void)shareToQQFriends:(OSMessage*)msg Success:(shareSuccess)success Fail:(shareFail)fail;
+(void)shareToQQZone:(OSMessage*)msg Success:(shareSuccess)success Fail:(shareFail)fail;
+(void)shareToQQFavorites:(OSMessage*)msg Success:(shareSuccess)success Fail:(shareFail)fail;
+(void)shareToQQDataline:(OSMessage*)msg Success:(shareSuccess)success Fail:(shareFail)fail;
+(void)QQAuth:(NSString*)scope Success:(authSuccess)success Fail:(authFail)fail;


@end
