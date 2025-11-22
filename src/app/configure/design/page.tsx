import prisma from "@/app/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }
  console.log("inside degisn/page id: ", id);
  const whereId = id;
  /*
  const results = await prisma.configuration.findMany({
    select: {
      id: true,
      imageUrl: true,
      width: true,
      height: true,
    },
  });
  console.log("inside degisn/page results: ", results);
  */
  const configs = await prisma.configuration.findMany();
  console.log("inside degisn/page configs: ", configs);
  let configuration;
  try {
    configuration = await prisma.configuration.findFirstOrThrow({
      where: { id: whereId },
    });
    console.log("inside degisn/page configuration: ", configuration);
  } catch (err) {
    // Log full error server-side for diagnostics
    // eslint-disable-next-line no-console
    console.error("Prisma error fetching configuration:", err);
    // Render a friendly error message instead of throwing a 500
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-semibold">Database error</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't load the configuration right now. Please try again later.
        </p>
      </div>
    );
  }

  const { imageUrl, width, height } = configuration;

  return (
    <DesignConfigurator
      configId={configuration.id}
      imageUrl={imageUrl}
      imageDimensions={{
        width,
        height,
      }}
    />
  );
};

export default Page;
