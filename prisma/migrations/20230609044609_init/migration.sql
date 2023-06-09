-- CreateTable
CREATE TABLE "announcements" (
    "id" TEXT NOT NULL,
    "brand" VARCHAR(20) NOT NULL,
    "year" VARCHAR(4) NOT NULL,
    "fuel" INTEGER NOT NULL,
    "kilometers" INTEGER NOT NULL,
    "color" VARCHAR(20) NOT NULL,
    "price_fipe" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images_gallery" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "announcementId" TEXT NOT NULL,

    CONSTRAINT "images_gallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images_gallery" ADD CONSTRAINT "images_gallery_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
