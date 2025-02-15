import { EventEmitter } from 'events';
import { BusEvent } from './BusEvents';
import { EventBus } from './EventBus';

class InMemoryEventBusImpl extends EventEmitter implements EventBus {
    push: EventBus<BusEvent>['push'] = (event) => {
        this.emit(event.type, event);
    };

    subscribe: EventBus<BusEvent>['subscribe'] = (event, listener) => {
        this.on(event, listener);
    };
}

export const InMemoryEventBus = () => new InMemoryEventBusImpl();
