-- DropForeignKey
ALTER TABLE "images_gallery" DROP CONSTRAINT "images_gallery_announcementId_fkey";

-- AddForeignKey
ALTER TABLE "images_gallery" ADD CONSTRAINT "images_gallery_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
