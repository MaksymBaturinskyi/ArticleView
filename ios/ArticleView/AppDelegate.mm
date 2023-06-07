#import "AppDelegate.h"
#import <UserNotifications/UNUserNotificationCenter.h>
#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>
@import Firebase;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"ArticleView";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  [GMSServices provideAPIKey:@"AIzaSyCAvexlMX-ZD_jiGPUjQV-u7qfFoPK9vNk"];
  self.initialProps = @{};

    if ([FIRApp defaultApp] == nil) {  // Add this line
        [FIRApp configure];  // And this line
      }

  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge) completionHandler:^(BOOL granted, NSError * _Nullable error) {
      if (!error) {
          NSLog(@"Notification authorization granted.");
      }
  }];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}
@end
