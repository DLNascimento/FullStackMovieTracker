-- CreateEnum
CREATE TYPE "MovieStatus" AS ENUM ('WANT_TO_WATCH', 'WATCHED');

-- CreateTable
CREATE TABLE "MovieEntry" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "posterPath" TEXT,
    "status" "MovieStatus" NOT NULL,
    "rating" DOUBLE PRECISION,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovieEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovieEntry" ADD CONSTRAINT "MovieEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
