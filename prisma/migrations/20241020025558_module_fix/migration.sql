-- DropForeignKey
ALTER TABLE "ActivityContent" DROP CONSTRAINT "ActivityContent_activityId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityContent" DROP CONSTRAINT "ActivityContent_contentId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleActivity" DROP CONSTRAINT "ModuleActivity_activityId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleActivity" DROP CONSTRAINT "ModuleActivity_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "TreatmentModule" DROP CONSTRAINT "TreatmentModule_module_id_fkey";

-- DropForeignKey
ALTER TABLE "TreatmentModule" DROP CONSTRAINT "TreatmentModule_treatment_id_fkey";

-- AddForeignKey
ALTER TABLE "TreatmentModule" ADD CONSTRAINT "TreatmentModule_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentModule" ADD CONSTRAINT "TreatmentModule_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleActivity" ADD CONSTRAINT "ModuleActivity_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleActivity" ADD CONSTRAINT "ModuleActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityContent" ADD CONSTRAINT "ActivityContent_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityContent" ADD CONSTRAINT "ActivityContent_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
