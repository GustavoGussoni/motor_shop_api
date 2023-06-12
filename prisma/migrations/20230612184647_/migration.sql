-- CreateTable
CREATE TABLE "announcements" (
    "id" TEXT NOT NULL,
    "name_car" VARCHAR(20) NOT NULL,
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

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "cpf" VARCHAR(12) NOT NULL,
    "cellphone" VARCHAR(11) NOT NULL,
    "birthdate" DATE NOT NULL,
    "description" VARCHAR NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "is_advertiser" BOOLEAN NOT NULL DEFAULT false,
    "password" VARCHAR(128) NOT NULL,
    "addressId" VARCHAR NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images_gallery" ADD CONSTRAINT "images_gallery_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
