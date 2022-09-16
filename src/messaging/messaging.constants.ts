export const EXCHANGE_NAME = 'hub-test';

export const QUEUES = {
  EV: 'ev',
};

export const BINDINGS = {
  CARDS: {
    destination: 'ev.card',
    routing_keys: ['ev.card.created', 'ev.card.updated']
  },

  BADGES: {
    destination: 'ev.badge',
  },
};
