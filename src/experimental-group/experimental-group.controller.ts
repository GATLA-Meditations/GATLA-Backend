import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExperimentalGroupService } from './experimental-group.service';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreateExperimentalGroupDto, UpdateExperimentalGroupDto } from './dto/create-experimental-group.dto';
import { AssignUserToGroupDto, BulkAssignUsersDto, RemoveUserFromGroupDto } from './dto/assign-user-group.dto';
import { ExperimentalGroupDto, GroupParticipationSummaryDto } from './dto/experimental-group.dto';

@ApiTags('Experimental Groups')
@Controller('experimental-groups')
@UseGuards(AdminGuard)
export class ExperimentalGroupController {
  constructor(private readonly experimentalGroupService: ExperimentalGroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo grupo experimental' })
  @ApiResponse({
    status: 201,
    description: 'Grupo experimental creado exitosamente',
    type: ExperimentalGroupDto,
  })
  async createGroup(@Body() createGroupDto: CreateExperimentalGroupDto): Promise<ExperimentalGroupDto> {
    return this.experimentalGroupService.createGroup(createGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los grupos experimentales' })
  @ApiResponse({
    status: 200,
    description: 'Lista de grupos experimentales',
    type: [ExperimentalGroupDto],
  })
  async getAllGroups(): Promise<ExperimentalGroupDto[]> {
    return this.experimentalGroupService.getAllGroups();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un grupo experimental por ID' })
  @ApiResponse({
    status: 200,
    description: 'Grupo experimental encontrado',
    type: ExperimentalGroupDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Grupo experimental no encontrado',
  })
  async getGroupById(@Param('id') id: string): Promise<ExperimentalGroupDto> {
    return this.experimentalGroupService.getGroupById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un grupo experimental' })
  @ApiResponse({
    status: 200,
    description: 'Grupo experimental actualizado exitosamente',
    type: ExperimentalGroupDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Grupo experimental no encontrado',
  })
  async updateGroup(@Param('id') id: string, @Body() updateGroupDto: UpdateExperimentalGroupDto): Promise<ExperimentalGroupDto> {
    return this.experimentalGroupService.updateGroup(id, updateGroupDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un grupo experimental' })
  @ApiResponse({
    status: 204,
    description: 'Grupo experimental eliminado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'No se puede eliminar un grupo con usuarios asignados',
  })
  @ApiResponse({
    status: 404,
    description: 'Grupo experimental no encontrado',
  })
  async deleteGroup(@Param('id') id: string): Promise<void> {
    return this.experimentalGroupService.deleteGroup(id);
  }

  @Post('assign-user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Asignar un usuario a un grupo experimental' })
  @ApiResponse({
    status: 200,
    description: 'Usuario asignado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Grupo experimental no encontrado',
  })
  async assignUserToGroup(@Body() assignUserDto: AssignUserToGroupDto): Promise<void> {
    return this.experimentalGroupService.assignUserToGroup(assignUserDto.userId, assignUserDto.groupId);
  }

  @Post('bulk-assign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Asignar múltiples usuarios a un grupo experimental' })
  @ApiResponse({
    status: 200,
    description: 'Usuarios asignados exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Grupo experimental no encontrado',
  })
  async bulkAssignUsers(@Body() bulkAssignDto: BulkAssignUsersDto): Promise<void> {
    return this.experimentalGroupService.bulkAssignUsers(bulkAssignDto.userIds, bulkAssignDto.groupId);
  }

  @Post('remove-user')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remover un usuario de su grupo experimental' })
  @ApiResponse({
    status: 200,
    description: 'Usuario removido exitosamente',
  })
  async removeUserFromGroup(@Body() removeUserDto: RemoveUserFromGroupDto): Promise<void> {
    return this.experimentalGroupService.removeUserFromGroup(removeUserDto.userId, removeUserDto.reason);
  }

  @Get(':id/participation-summary')
  @ApiOperation({ summary: 'Obtener resumen de participación del grupo' })
  @ApiResponse({
    status: 200,
    description: 'Resumen de participación del grupo',
    type: GroupParticipationSummaryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Grupo experimental no encontrado',
  })
  async getGroupParticipationSummary(@Param('id') id: string): Promise<GroupParticipationSummaryDto> {
    return this.experimentalGroupService.getGroupParticipationSummary(id);
  }

  @Post('users/:userId/start-program')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar el programa para un usuario específico' })
  @ApiResponse({
    status: 200,
    description: 'Programa iniciado exitosamente',
  })
  async startUserProgram(@Param('userId') userId: string): Promise<void> {
    return this.experimentalGroupService.startUserProgram(userId);
  }

  @Post('users/:userId/invalidate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Invalidar la participación de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario invalidado exitosamente',
  })
  async invalidateUser(@Param('userId') userId: string, @Body() body: { reason: string }): Promise<void> {
    return this.experimentalGroupService.invalidateUser(userId, body.reason);
  }
}
