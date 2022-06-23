export const seedData = {
  entries: [
    {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      createdAt: Date.now(),
      status: 'pending'
    },
    {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      createdAt: Date.now() - 1000000,
      status: 'in-progress'
    },
    {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      createdAt: Date.now() - 100000,
      status: 'finished'
    },
  ]
}