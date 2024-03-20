-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
