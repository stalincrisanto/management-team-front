import { periodKeys } from '@/modules/period/hooks/period.keys';
import { periodService } from '@/modules/period/services/period.services';
import { useInfiniteQuery } from '@tanstack/react-query';

export const REPORT_PERIODS_PAGE_SIZE = 3;

export const useReportPeriods = (seasonId: string) => {
  const query = useInfiniteQuery({
    queryKey: [
      ...periodKeys.lists(),
      'report',
      {
        seasonId,
        size: REPORT_PERIODS_PAGE_SIZE,
      },
    ],

    initialPageParam: 0,

    queryFn: ({ pageParam }) =>
      periodService.getAll({
        seasonId,
        page: pageParam,
        size: REPORT_PERIODS_PAGE_SIZE,
      }),

    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.currentPage + 1;

      if (nextPage >= lastPage.totalPages) {
        return undefined;
      }

      return nextPage;
    },

    enabled: Boolean(seasonId),

    staleTime: 30 * 1000,
  });

  const periods = query.data?.pages.flatMap((page) => page.content) ?? [];

  const totalElements = query.data?.pages[0]?.totalElements ?? 0;

  return {
    ...query,
    periods,
    totalElements,
  };
};
