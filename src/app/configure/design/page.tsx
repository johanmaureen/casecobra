interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams;
  return <div>Design Configuration Page id: {id}</div>;
};

export default Page;
