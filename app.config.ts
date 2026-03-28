import { ConfigContext, ExpoConfig } from "expo/config";

import { version } from "./package.json";

const EAS_PROJECT_ID = "1f27cdcc-e5b1-48f3-9e70-9a90f1cd7620";
const PROJECT_SLUG = "refil-vendor-mobile";
const OWNER = "luxa-digitals";

const APP_NAME = "Refil Vendor";
const SCHEME = "com.luxa.refilvendor";

const appIcons = {                 
  lightBg: "#F8810B",
  darkBg: "#F8810B",
} as const;

const IOS_ICON = "./assets/appIcons/icon.png"; // Needs setup
const ADAPTIVE_ICON = { 
  bgColor: appIcons.lightBg,
  fgImage: "./assets/appIcons/android-icon-foreground.png",
  bgImage: "./assets/appIcons/android-icon-background.png",
  mcImage: "./assets/appIcons/android-icon-monochrome.png",
}; // Needs setup

const SPLASH_ICON = {
  image: "./assets/appIcons/splash-icon.png",
  bgColor: appIcons.lightBg,
  darkImage: "./assets/appIcons/splash-icon.png",
  darkBgColor: appIcons.darkBg,
};

// Environment-specific overrides
function getDynamicAppConfig(
  environment: "development" | "preview" | "production"
) {
  if ( environment === "production" ) {
    return {
      name: APP_NAME,
      scheme: SCHEME,
    };
  }

  if ( environment === "preview" ) {
    return {
      name: `${APP_NAME} (Preview)`,
      scheme: `${SCHEME}.preview`,
    };
  }

  return {
    name: `${APP_NAME} (Dev)`,
    scheme: `${SCHEME}.dev`,
  };
}

// CONFIG

export default ( { config }: ConfigContext ): ExpoConfig => {
  const env =
    ( process.env.APP_ENV as "development" | "preview" | "production" ) ||
    "development";

  const { name, scheme } =
    getDynamicAppConfig( env );

  return {
    ...config,
    name,
    slug: PROJECT_SLUG,
    version,
    orientation: "portrait",
    icon: IOS_ICON,
    scheme,
    userInterfaceStyle: "automatic",
    platforms: [ "android", "ios" ],
    ios: {
      supportsTablet: false,
      bundleIdentifier: scheme,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: ADAPTIVE_ICON.bgColor,
        foregroundImage: ADAPTIVE_ICON.fgImage,
        backgroundImage: ADAPTIVE_ICON.bgImage,
        monochromeImage: ADAPTIVE_ICON.mcImage,
      },
      package: scheme,
    },
    "plugins": [
      "expo-router",
      "expo-font",
      "expo-image",
      "expo-web-browser",
      [
        "expo-splash-screen",
        {
          "image": SPLASH_ICON.image,
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": SPLASH_ICON.bgColor,
          "dark": {
            "backgroundColor": SPLASH_ICON.darkBgColor,
          }
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    owner: OWNER,
    runtimeVersion: {
      policy: "fingerprint",
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
  };
};