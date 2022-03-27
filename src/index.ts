import { NativeModules, Platform } from "react-native";
import { WakeLockModule } from "./types";
import { useEffect } from "react";

const WakeLockNativeModule: WakeLockModule = NativeModules.RNWakeLock || {
   setWakeLock: async () => { return true; },
   releaseWakeLock: async () => { return true; },
   isWakeLocked: async () => { return false; }
};

if (!NativeModules.RNWakeLock && Platform.OS === "android") {
  throw new Error(`react-native-android-wake-lock: Native Module is null. Steps to fix:
• Run \`react-native-link react-native-android-wake-lock\` in the project root
• Rebuild and run the app
• Manually link the library if necessary
• If you're getting this error while testing, you didn't read the README. #shame
If none of these fix the issue, open an issue on Github: https://github.com/gretzky/react-native-android-wake-lock`);
}

const WakeLockInterface = {
  ...WakeLockNativeModule,
  setWakeLock(): Promise<boolean> {
    return WakeLockNativeModule.setWakeLock();
  },
  releaseWakeLock(): Promise<boolean> {
    return WakeLockNativeModule.releaseWakeLock();
  },
  isWakeLocked(): Promise<boolean> {
    return WakeLockNativeModule.isWakeLocked();
  },
};

const useWakeLock = () => {
  useEffect(() => {
    async function setWakeLock() {
      await WakeLockInterface.setWakeLock();
    }

    setWakeLock();

    return () => {
      async function releaseWakeLock() {
        await WakeLockInterface.releaseWakeLock;
      }

      releaseWakeLock();
    };
  }, []);
};

export { WakeLockNativeModule, WakeLockInterface, useWakeLock };
