-- CreateTable
CREATE TABLE "ModulePhrase" (
    "id" TEXT NOT NULL,
    "phrase_id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,

    CONSTRAINT "ModulePhrase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModulePhrase" ADD CONSTRAINT "ModulePhrase_phrase_id_fkey" FOREIGN KEY ("phrase_id") REFERENCES "Phrase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModulePhrase" ADD CONSTRAINT "ModulePhrase_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
