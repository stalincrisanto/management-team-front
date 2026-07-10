export const periodKeys = {
  all: ['periods'] as const,
  lists: () => [...periodKeys.all, 'list'] as const,
  list: (seasonId: string, page: number, size: number) =>
    [...periodKeys.lists(), seasonId, page, size] as const,
  detail: (id: string) => [...periodKeys.all, 'detail', id] as const,

  create: ['periods', 'create'] as const,
  update: ['periods', 'update'] as const,
  delete: ['periods', 'delete'] as const,

  createIncome: ['periods', 'income', 'create'] as const,
  updateIncome: ['periods', 'income', 'update'] as const,
  deleteIncome: ['periods', 'income', 'delete'] as const,

  createExpense: ['periods', 'expense', 'create'] as const,
  updateExpense: ['periods', 'expense', 'update'] as const,
  deleteExpense: ['periods', 'expense', 'delete'] as const,
};

export const catalogKeys = {
  activeSeason: ['seasons', 'active'] as const,
  incomeTypes: ['catalogs', 'income-types'] as const,
  expenseCategories: ['catalogs', 'expense-categories'] as const,
};
