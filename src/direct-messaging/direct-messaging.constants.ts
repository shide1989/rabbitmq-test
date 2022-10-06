export const EXCHANGES = {
  TOPIC: 'hub-events.topic',
  DIRECT: 'hub-tasks.direct',
};

export const BINDINGS = {
  ORDER_TO_PAP: {
    TASKS: [
      {
        // Pump unlock example
        EXCHANGE: EXCHANGES.DIRECT,
        ROUTING_KEY: 'routing.task.unlock.pump',
        DEAD_ROUTING_KEY: 'dead.routing.task.unlock.pump',
        QUEUE: 'task.unlock.pump',
        DEAD_QUEUE: 'dead.task.unlock.pump',
      },
      {
        // Cancel session
        EXCHANGE: EXCHANGES.DIRECT,
        ROUTING_KEY: 'routing.task.cancel.session',
        DEAD_ROUTING_KEY: 'dead.routing.task.cancel.session',
        QUEUE: 'task.cancel.session',
        DEAD_QUEUE: 'dead.task.cancel.session',
      },
    ],
  },
};
