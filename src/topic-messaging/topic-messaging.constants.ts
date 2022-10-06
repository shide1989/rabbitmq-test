export const EXCHANGES = {
  TOPIC: 'hub-events.topic',
  DIRECT: 'hub-tasks.direct',
};

export const BINDINGS = {
  PAP_TO_WSS: {
    EVENTS: [
      {
        // Session update example
        EXCHANGE: EXCHANGES.TOPIC,
        ROUTING_KEY: 'routing.event.pap.session.#', // # -> any single word
        DEAD_ROUTING_KEY: 'dead.routing.event.pap.session.updated',
        QUEUE: 'event.pap.session.updated',
        DEAD_QUEUE: 'dead.event.pap.session.updated',
      },
    ],
  },
};
