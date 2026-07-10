import PeriodDetailView from '@/modules/period/components/view/PeriodDetailView';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <PeriodDetailView id={id} />;
}
