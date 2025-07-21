import { Body, Controller, HttpCode, Post, Put, UseGuards, Request, Delete, Param, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminData } from './dto/AdminData';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UpdateAdmin } from './dto/updateAdmin';
import { ApiTags } from '@nestjs/swagger';
import createQuestionnaireDto, { UpdateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { ShopItemType } from '@prisma/client';
import TreatmentCreateDto, { ContentModifyDto } from 'src/treatment/dto/treatment-create.dto';
import { ExperimentalGroupService } from '../experimental-group/experimental-group.service';
import { CreateExperimentalGroupDto, UpdateExperimentalGroupDto } from '../experimental-group/dto/create-experimental-group.dto';
import { AssignUserToGroupDto, BulkAssignUsersDto } from '../experimental-group/dto/assign-user-group.dto';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly experimentalGroupService: ExperimentalGroupService,
  ) {}

  @Post()
  @HttpCode(200)
  async createAdmin(@Body() adminData: AdminData) {
    return await this.adminService.createAdmin(adminData);
  }

  @Put()
  @HttpCode(200)
  async updateAdmin(@Request() req: any, @Body() adminData: UpdateAdmin) {
    const id = req.admin.id;
    return this.adminService.updateAdmin(id, adminData);
  }

  @Delete()
  @HttpCode(204)
  async deleteAdmin(@Request() req: any) {
    const id = req.user.id;
    return this.adminService.deleteAdmin(id);
  }

  @Post('treatment/create')
  @HttpCode(200)
  async createTreatment(@Body() treatmentData: TreatmentCreateDto) {
    return await this.adminService.createTreatment(treatmentData);
  }

  @Put('treatment/update/:id')
  @HttpCode(200)
  async updateTreatment(@Param('id') id: string, @Body() treatmentData?: { name?: string; description?: string }) {
    return this.adminService.updateTreatment(id, treatmentData);
  }

  @Put('treatment/:treatmentId/questionnaire/:questionnaireId')
  @HttpCode(200)
  async addQuestionnaireToTreatment(@Param('treatmentId') treatmentId: string, @Param('questionnaireId') questionnaireId: string) {
    return this.adminService.addQuestionnaireToTreatment(treatmentId, questionnaireId);
  }

  @Delete('treatment/:treatmentId/questionnaire/:questionnaireId')
  @HttpCode(200)
  async removeQuestionnaireFromTreatment(@Param('treatmentId') treatmentId: string, @Param('questionnaireId') questionnaireId: string) {
    return this.adminService.removeQuestionnaireFromTreatment(treatmentId, questionnaireId);
  }

  @Put('treatment/update/modules/:id')
  @HttpCode(204)
  async updateModulesFromTreatment(@Param('id') id: string, @Body() modules: { id: string; order: number }[]) {
    return this.adminService.updateModulesFromTreatment(id, modules);
  }

  @Put('treatment/:id/create-module')
  @HttpCode(200)
  async createModuleForTreatment(@Param('id') id: string) {
    return this.adminService.createModuleForTreatment(id);
  }

  @Post('module/create')
  @HttpCode(200)
  async createModule(@Body() moduleData: { name: string; description: string }) {
    return await this.adminService.createModule(moduleData);
  }

  @Get('module/:id')
  @HttpCode(200)
  async getModuleById(@Param('id') id: string) {
    return await this.adminService.getModuleById(id);
  }

  @Put('module/update/:id')
  @HttpCode(200)
  async updateModule(@Param('id') id: string, @Body() moduleData: { name?: string; description?: string }) {
    return await this.adminService.updateModule(id, moduleData);
  }

  @Put('module/update/activities/:id')
  @HttpCode(204)
  async updateActivitiesFromModules(@Param('id') id: string, @Body() activitiesData: { id?: string; order?: number }[]) {
    return await this.adminService.updateActivitiesFromModules(id, activitiesData);
  }

  @Get('user')
  @HttpCode(200)
  async getUsers() {
    return await this.adminService.getUsers();
  }

  @Put('user/:id')
  @HttpCode(204)
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { patient_code?: string; password?: string; treatmentId?: string; sendQuestionnaire?: boolean },
  ) {
    return await this.adminService.updateUser(id, userData);
  }

  @Post('user/create')
  @HttpCode(201)
  async createUser(
    @Body()
    userData: {
      patient_code: string;
      password: string;
      email: string;
      treatment?: { id: string; delayed: boolean };
      sendQuestionnaire?: boolean;
    },
  ) {
    return await this.adminService.createUser(userData);
  }

  @Delete('user/delete/:patient_code')
  @HttpCode(204)
  async deleteUser(@Param('patient_code') patient_code: string) {
    return await this.adminService.deleteUser(patient_code);
  }

  @Post('questionnaire/create')
  @HttpCode(201)
  async createQuestionnaire(@Body() questionnaireData: createQuestionnaireDto) {
    return await this.adminService.createQuestionnaire(questionnaireData);
  }

  @Put('questionnaire/update/:id')
  @HttpCode(200)
  async updateQuestionnaire(@Param('id') id: string, @Body() questionnaireData: UpdateQuestionnaireDto) {
    return await this.adminService.updateQuestionnaire(id, questionnaireData);
  }

  @Delete('questionnaire/delete/:id')
  async deleteQuestionnaire(@Param('id') id: string) {
    return await this.adminService.deleteQuestionnaire(id);
  }

  @Post('notification/create')
  @HttpCode(201)
  async createNotification(@Body() notificationData: { title: string; content: string }) {
    return await this.adminService.createNotification(notificationData);
  }

  @Put('notification/:notificationId/notify-user/:userId')
  @HttpCode(200)
  async notifyUser(@Param('notificationId') notificationId: string, @Param('userId') userId: string) {
    return await this.adminService.notifyUser(notificationId, userId);
  }

  @Post('shop-item')
  @HttpCode(201)
  async createShopItem(@Body() shopItemData: { type: ShopItemType; price: number; content_url: string }) {
    return await this.adminService.createShopItem(shopItemData);
  }

  @Put('activity/:id/update-content')
  @HttpCode(200)
  async updateActivityContent(@Param('id') id: string, @Body() contents: ContentModifyDto[]) {
    return await this.adminService.updateContentsInActivity(id, contents);
  }

  @Delete('activity/:id/diconect-content/:contentId')
  @HttpCode(200)
  async deleteActivityContent(@Param('id') id: string, @Param('contentId') contentId: string) {
    return await this.adminService.disconectContentFromActivity(id, contentId);
  }

  @Get('user/:patient_code')
  @HttpCode(200)
  async getUserById(@Param('patient_code') patient_code: string) {
    return await this.adminService.getUserById(patient_code);
  }

  @Delete('content-delete/:id')
  @HttpCode(200)
  async deleteContent(@Param('id') id: string) {
    return await this.adminService.deleteContent(id);
  }

  @Get('users-paginated')
  @HttpCode(200)
  async getUsersPaginated(@Query('page') page: number, @Query('size') size: number, @Query('code') code?: string) {
    const parsedPage = Number(page);
    const parsedSize = Number(size);
    return this.adminService.getUsersPaginated(parsedPage, parsedSize, code);
  }

  // ========== EXPERIMENTAL GROUPS ENDPOINTS ==========

  @Post('experimental-groups')
  @HttpCode(201)
  async createExperimentalGroup(@Body() createGroupDto: CreateExperimentalGroupDto) {
    return await this.experimentalGroupService.createGroup(createGroupDto);
  }

  @Get('experimental-groups')
  @HttpCode(200)
  async getAllExperimentalGroups() {
    return await this.experimentalGroupService.getAllGroups();
  }

  @Get('experimental-groups/:id')
  @HttpCode(200)
  async getExperimentalGroupById(@Param('id') id: string) {
    return await this.experimentalGroupService.getGroupById(id);
  }

  @Put('experimental-groups/:id')
  @HttpCode(200)
  async updateExperimentalGroup(@Param('id') id: string, @Body() updateGroupDto: UpdateExperimentalGroupDto) {
    return await this.experimentalGroupService.updateGroup(id, updateGroupDto);
  }

  @Delete('experimental-groups/:id')
  @HttpCode(204)
  async deleteExperimentalGroup(@Param('id') id: string) {
    return await this.experimentalGroupService.deleteGroup(id);
  }

  @Post('experimental-groups/assign-user')
  @HttpCode(200)
  async assignUserToExperimentalGroup(@Body() assignUserDto: AssignUserToGroupDto) {
    return await this.experimentalGroupService.assignUserToGroup(assignUserDto.userId, assignUserDto.groupId);
  }

  @Post('experimental-groups/bulk-assign')
  @HttpCode(200)
  async bulkAssignUsersToGroup(@Body() bulkAssignDto: BulkAssignUsersDto) {
    return await this.experimentalGroupService.bulkAssignUsers(bulkAssignDto.userIds, bulkAssignDto.groupId);
  }

  @Get('experimental-groups/:id/participation-summary')
  @HttpCode(200)
  async getGroupParticipationSummary(@Param('id') id: string) {
    return await this.experimentalGroupService.getGroupParticipationSummary(id);
  }

  @Post('experimental-groups/users/:userId/start-program')
  @HttpCode(200)
  async startUserProgram(@Param('userId') userId: string) {
    return await this.experimentalGroupService.startUserProgram(userId);
  }

  @Post('experimental-groups/users/:userId/invalidate')
  @HttpCode(200)
  async invalidateUser(@Param('userId') userId: string, @Body() body: { reason: string }) {
    return await this.experimentalGroupService.invalidateUser(userId, body.reason);
  }
}
