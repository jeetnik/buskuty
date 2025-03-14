-- CreateTable
CREATE TABLE "BusTimetable" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departureTimes" TEXT[],

    CONSTRAINT "BusTimetable_pkey" PRIMARY KEY ("id")
);
