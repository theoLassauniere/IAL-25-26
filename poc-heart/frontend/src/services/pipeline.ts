import { heartBeatReceiver, RawHeartBeatData } from "./receive";
import { heartBeatFilter } from "./filter";
import { heartBeatBuffer, AveragedHeartBeatData } from "./buffer";
import { heartBeatTransfer } from "./transfer";

class HeartBeatPipeline {
  private isRunning = false;

  start() {
    if (this.isRunning) return;

    this.isRunning = true;

    heartBeatReceiver.addListener((rawData: RawHeartBeatData) => {
      heartBeatFilter.filter(rawData);
    });

    heartBeatFilter.addListener((filteredData: RawHeartBeatData) => {
      heartBeatBuffer.addData(filteredData);
    });

    heartBeatBuffer.addListener((averagedData: AveragedHeartBeatData) => {
      heartBeatTransfer.sendData(averagedData);
    });

    heartBeatTransfer.start();
    heartBeatBuffer.start();
    heartBeatReceiver.start();

    console.log("Pipeline démarré: capteur → filtre → buffer → MQTT");
  }

  stop() {
    if (!this.isRunning) return;

    this.isRunning = false;
    heartBeatReceiver.stop();
    heartBeatBuffer.stop();
    heartBeatTransfer.stop();
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      receiver: heartBeatReceiver.isConnected(),
      buffer: heartBeatBuffer.getStatus(),
      transfer: heartBeatTransfer.getStatus(),
    };
  }
}

export const heartBeatPipeline = new HeartBeatPipeline();

