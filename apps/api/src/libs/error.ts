import Logger from "./logger";

class ErrorHandler {
  public async handleError(error: Error,/*  responseStream: Response */): Promise<void> {
    Logger.error(error.message);
    //await fireMonitoringMetric(error);
    //await crashIfUntrustedErrorOrSendResponse(error, responseStream);
  };
}

export const errorHandler = new ErrorHandler();
