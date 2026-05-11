import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WebView} from 'react-native-webview';
import {images} from '../assets';
import {AppBackground} from '../components/AppBackground';
import {colors, radii} from '../styles/theme';
import {useScreenInsets} from '../styles/useScreenInsets';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const loadingHtml = `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body {
        margin: 0;
        height: 100%;
        overflow: hidden;
        background:
          radial-gradient(circle at 48% 40%, rgba(141, 231, 255, .9) 0 3%, transparent 20%),
          radial-gradient(circle at 50% 50%, #215dff 0, #0c1c48 45%, #020610 100%);
      }
      .wrap {
        position: relative;
        height: 100%;
        width: 100%;
      }
      .orb {
        position: absolute;
        inset: 24%;
        border-radius: 50%;
        background:
          radial-gradient(circle at 38% 30%, #ffffff 0 7%, #8de7ff 8% 19%, transparent 20%),
          radial-gradient(circle at 50% 55%, rgba(141, 231, 255, .92), rgba(25, 92, 255, .48) 46%, rgba(3, 8, 22, .18) 68%);
        box-shadow:
          0 0 34px rgba(141, 231, 255, .86),
          inset 0 0 42px rgba(255, 255, 255, .22);
        animation: float 1.9s ease-in-out infinite alternate;
      }
      .ring {
        position: absolute;
        inset: 19%;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,.34);
        box-shadow: inset 0 0 22px rgba(141,231,255,.22);
        animation: ring 1.8s ease-out infinite;
      }
      .ring.two {
        inset: 10%;
        animation-delay: .42s;
      }
      .flash {
        position: absolute;
        left: 45%;
        top: 13%;
        width: 18%;
        height: 70%;
        background: linear-gradient(180deg, #ffffff, #8de7ff 38%, #ffd36e 78%, transparent);
        clip-path: polygon(52% 0, 27% 39%, 48% 39%, 31% 100%, 78% 34%, 55% 34%);
        filter: drop-shadow(0 0 16px rgba(255,255,255,.96));
        opacity: .88;
        animation: flash 1.15s steps(2, end) infinite;
      }
      .spark {
        position: absolute;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #ffffff;
        box-shadow: 0 0 15px #8de7ff;
        animation: spark 1.4s ease-in-out infinite alternate;
      }
      .spark.one { left: 20%; top: 30%; }
      .spark.two { right: 19%; top: 44%; animation-delay: .35s; }
      .spark.three { left: 33%; bottom: 22%; animation-delay: .7s; }
      @keyframes float {
        from { transform: scale(.94) translateY(7px); }
        to { transform: scale(1.04) translateY(-7px); }
      }
      @keyframes ring {
        from { transform: scale(.68); opacity: .86; }
        to { transform: scale(1.18); opacity: 0; }
      }
      @keyframes flash {
        0%, 70%, 100% { opacity: .42; transform: scale(.96); }
        74%, 90% { opacity: 1; transform: scale(1.06); }
      }
      @keyframes spark {
        from { opacity: .24; transform: scale(.72); }
        to { opacity: 1; transform: scale(1.25); }
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="ring"></div>
      <div class="ring two"></div>
      <div class="orb"></div>
      <div class="flash"></div>
      <div class="spark one"></div>
      <div class="spark two"></div>
      <div class="spark three"></div>
    </div>
  </body>
</html>
`;

export function SplashScreen({navigation}: Props) {
  const insets = useScreenInsets();

  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Onboarding'), 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <AppBackground source={images.backgroundSplash} overlay={0.36}>
      <View style={[styles.screen, {paddingBottom: insets.edgeBottom, paddingHorizontal: insets.horizontal, paddingTop: insets.top}]}>
        <View style={styles.webPanel}>
          <WebView
            originWhitelist={['*']}
            scrollEnabled={false}
            source={{html: loadingHtml}}
            style={styles.webView}
            automaticallyAdjustContentInsets={false}
          />
        </View>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  webPanel: {
    aspectRatio: 1,
    backgroundColor: colors.panelStrong,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    maxWidth: 304,
    overflow: 'hidden',
    width: '76%',
  },
  webView: {
    backgroundColor: 'transparent',
    flex: 1,
  },
});
