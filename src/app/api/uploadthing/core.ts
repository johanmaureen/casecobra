import "dotenv/config";
import sharp from "sharp";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import prisma from "@/app/db/index";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      //console.log("file url", file.ufsUrl);
      const { configId } = metadata.input;
      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();
      const imgMetadata = sharp(buffer).metadata();
      const { width, height } = await imgMetadata;

      console.log("Image dimensions:", width, height);
      console.log("configId:", configId);
      console.log("process.env.DATABASE_URL,", process.env.DATABASE_URL);
      if (!configId) {
        const configuration = await prisma.configuration.create({
          data: {
            imageUrl: file.url,
            width: width || 500,
            height: height || 500,
          },
        });
        console.log("configuration:", configuration);
        return { configId: configuration.id };
      } else {
        const updatedConfiguration = await prisma.configuration.update({
          where: { id: configId },
          data: {
            croppedImageUrl: file.url,
          },
        });
        return { configId: updatedConfiguration.id };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
