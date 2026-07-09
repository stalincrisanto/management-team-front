export const seasonKeys = {
  all: ['seasons'] as const,
  active: ['seasons', 'active'] as const,
  detail: (id: string) => ['seasons', id] as const,
  create: ['seasons', 'create'] as const,
  update: ['seasons', 'update'] as const,
  activate: ['seasons', 'activate'] as const,
};
