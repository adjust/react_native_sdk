declare module "react-native-adjust" {
    type Environment = "sandbox" | "production";

    interface AdjustAttribution {
        trackerToken: string;
        trackerName: string;
        network: string;
        campaign: string;
        adgroup: string;
        creative: string;
        clickLabel: string;
        adid: string;
    }
  
    enum LogLevel {
      Verbose,
      Debug,
      Info,
      Warn,
      Error,
      Assert,
      Suppress
    }
  
    export class AdjustConfig {
      constructor(appToken: string, environment: Environment) {}
  
      public setLogLevel(level: LogLevel): void {}

      public setAttributionCallbackListener(callback: (attribution: AdjustAttribution) => void): void {}
  
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
        return "sandbox";
      }
      static get EnvironmentProduction(): Environment {
        return "production";
      }
    }
  
    export const Adjust = {
      create: (adjustConfig: AdjustConfig): void => {},
      componentWillUnmount: (): void => {}
    };
}
