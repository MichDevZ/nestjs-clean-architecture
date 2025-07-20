import { EventMap } from "./event-map";


export interface IEventBus {
  emit<K extends keyof EventMap>(eventName: K, data: EventMap[K]): Promise<void>;
  on<K extends keyof EventMap>(eventName: K, callback: (data: EventMap[K]) => Promise<void>): void;
}