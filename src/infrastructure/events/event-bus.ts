import { Injectable } from "@nestjs/common";
import { IEventBus } from "src/application/events/event-bus";
import { EventMap } from "src/application/events/event-map";


type Callback<K extends keyof EventMap> = (data: EventMap[K]) => Promise<void>;

@Injectable()
export class SimpleEventBus implements IEventBus {
  private listeners: {
    [K in keyof EventMap]?: Callback<K>[];
  } = {};

  on<K extends keyof EventMap>(eventName: K, callback: Callback<K>): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName]!.push(callback);
  }

  async emit<K extends keyof EventMap>(eventName: K, data: EventMap[K]): Promise<void> {
    const callbacks = this.listeners[eventName] || [];
    for (const callback of callbacks) {
      await callback(data);
    }
  }
}