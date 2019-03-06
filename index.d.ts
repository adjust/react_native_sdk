declare module 'react-native-adjust' {
  type Environment = 'sandbox' | 'production';

  enum LogLevel {
    Verbose,
    Debug,
    Info,
    Warn,
    Error,
    Assert,
    Suppress,
  }

  interface IAttribution {
    trackerToken: string;
    trackerName: string;
    network: string;
    campaign: string;
    adgroup: string;
    creative: string;
    clickLabel: string;
    adid: string;
  }

  interface IEventSuccess {
    message: string;
    timestamp: number;
    adid: string;
    eventToken: string;
    callbackId: string;
    jsonResponse: string;
  }

  interface IEventFailure extends IEventSuccess {
    willRetry: boolean;
  }

  interface ISessionSuccess {
    message: string;
    timestamp: string;
    adid: string;
    jsonResponse: string;
  }

  interface ISessionFailure extends ISessionSuccess {
    willRetry: boolean;
  }

  interface IDeferredDeeplink {
    uri: string;
  }

  export class AdjustEvent {
    constructor(eventToken: string) {}

    public setRevenue(revenue: number, currency: string): void {}
    public addCallbackParameter(key: string, value: string): void {}
    public addPartnerParameter(key: string, value): void {}
    public setTransactionId(transactionId: string): void {}
    public setCallbackId(callbackId: string): void {}
  }

  export class AdjustConfig {
    constructor(appToken: string, environment: Environment) {}

    public setEventBufferingEnabled(isEnabled: boolean): void {}
    public setLogLevel(level: LogLevel): void {}
    public setProcessName(processName: string): void {}
    public setDefaultTracker(dafaultTracker: string): void {}
    public setUserAgent(userAgent: string): void {}
    public setAppSecret(secretId: number, info1: number, info2: number, info3: number, info4: number): void {}
    public setDelayStart(delay: number): void {}
    public setDeviceKnown(isDeviceKnown: boolean): void {}
    public setSdkPrefix(sdkPrefix: string): void {}
    public setReadMobileEquipmentIdentity(readMobileEquipmentIdentity: boolean): void {}
    public setSendInBackground(sendInBackground: boolean): void {}
    public setShouldLaunchDeeplink(shouldLaunchDeeplink: boolean): void {}
    public setAttributionCallbackListener(attributionCallbackListener: (attribution: IAttribution) => void): void {}
    public setEventTrackingSucceededCallbackListener(
      eventTrackingSucceededCallbackListener: (eventSuccess: IEventSuccess) => void,
    ): void {}
    public setEventTrackingFailedCallbackListener(
      eventTrackingFailedCallbackListener: (eventSuccess: IEventFailure) => void,
    ): void {}
    public setSessionTrackingSucceededCallbackListener(
      sessionTrackingSucceededCallbackListener: (sessionSuccess: ISessionSuccess) => void,
    ): void {}
    public setSessionTrackingFailedCallbackListener(
      sessionTrackingFailedCallbackListener: (sessionFailed: ISessionFailure) => void,
    ): void {}
    public setDeferredDeeplinkCallbackListener(
      deferredDeeplinkCallbackListener: (deeplink: IDeferredDeeplink) => void,
    ): void {}

    static get LogLevelVerbose(): LogLevel {
      return LogLevel.Verbose;
    }

    static get LogLevelDebug(): LogLevel {
      return LogLevel.Debug;
    }

    static get LogLevelInfo(): LogLevel {
      return LogLevel.Info;
    }

    static get LogLevelWarn(): LogLevel {
      return LogLevel.Warn;
    }

    static get LogLevelError(): LogLevel {
      return LogLevel.Error;
    }

    static get LogLevelAssert(): LogLevel {
      return LogLevel.Assert;
    }

    static get LogLevelSuppress(): LogLevel {
      return LogLevel.Suppress;
    }

    static get EnvironmentSandbox(): Environment {
      return 'sandbox';
    }
    static get EnvironmentProduction(): Environment {
      return 'production';
    }
  }

  export const Adjust = {
    create(adjustConfig: AdjustConfig): void {},
    trackEvent(adjustEvent: AdjustEvent): void {},
    setEnabled(enabled: boolean): void {},
    isEnabled(callback: (enabled: boolean) => void): void {},
    setOfflineMode(callback: (enabled: boolean) => void): void {},
    setPushToken(token: string): void {},
    appWillOpenUrl(uri: string): void {},
    sendFirstPackages(): void {},
    addSessionCallbackParameter(key: string, value: string): void {},
    addSessionPartnerParameter(key: string, value: string): void {},
    removeSessionCallbackParameter(key: string): void {},
    removeSessionPartnerParameter(key: string): void {},
    resetSessionCallbackParameters(): void {},
    resetSessionPartnerParameters(): void {},
    gdprForgetMe(): void {},
    getIdfa(callback: (idfa: string) => void): void {},
    getGoogleAdId(callback: (googleAdId: string) => void): void {},
    getAdid(callback: (adid: string) => void): void {},
    getAttribution(callback: (attribution: IAttribution) => void): void {},
    getAmazonAdId(callback: (amasonId: string) => void): void {},
    getSdkVersion(callback: (sdkVersion) => void): void {},
    setReferrer(referrer: string): void {},
    componentWillUnmount(): void {},
  };
}
