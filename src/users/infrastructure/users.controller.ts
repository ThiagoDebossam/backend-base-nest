import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
    HttpCode,
    Query,
    Put,
} from '@nestjs/common'
import { SignUpDto } from './dtos/sign-up.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { SignUpUseCase } from '../application/usecases/sign-up.usecase'
import { SignInUseCase } from '../application/usecases/sign-in.usecase'
import { UpdateUserUseCase } from '../application/usecases/update-user.usecase'
import { UpdatePasswordUseCase } from '../application/usecases/update-password.usecase'
import { ListUsersUseCase } from '../application/usecases/list-users.usecase'
import { GetUserUseCase } from '../application/usecases/get-user.usecase'
import { DeleteUserUseCase } from '../application/usecases/delete-user.usecase'
import { SignInDto } from './dtos/sign-in.dto'
import { ListUsersDto } from './dtos/list-users.dto'
import { UpdatePasswordDto } from './dtos/update-password.dto'
import { UserOutput } from '../application/dtos/user-output'
import { UserCollectionPresenter, UserPresenter } from './presenters/user.presenter'

@Controller('users')
export class UsersController {
    @Inject(SignUpUseCase.UseCase)
    private signUpUseCase: SignUpUseCase.UseCase

    @Inject(SignInUseCase.UseCase)
    private signInUseCase: SignInUseCase.UseCase

    @Inject(UpdateUserUseCase.UseCase)
    private updateUserUseCase: UpdateUserUseCase.UseCase

    @Inject(UpdatePasswordUseCase.UseCase)
    private updatePasswordUseCase: UpdatePasswordUseCase.UseCase

    @Inject(ListUsersUseCase.UseCase)
    private listUsersUseCase: ListUsersUseCase.UseCase

    @Inject(GetUserUseCase.UseCase)
    private getUserUseCase: GetUserUseCase.UseCase

    @Inject(DeleteUserUseCase.UseCase)
    private deleteUserUseCase: DeleteUserUseCase.UseCase

    static userToResponse(output: UserOutput): UserPresenter {
        return new UserPresenter(output)
    }

    static listUsersToResponse(output: ListUsersUseCase.Output) {
        return new UserCollectionPresenter(output)
    }

    @Post()
    async create(@Body() signUpDto: SignUpDto) {
        const output = await this.signUpUseCase.execute(signUpDto)
        return UsersController.userToResponse(output)
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() signInDto: SignInDto) {
        const output = await this.signInUseCase.execute(signInDto)
        return UsersController.userToResponse(output)
    }

    @Get()
    async search(@Query() searchParams: ListUsersDto) {
        const output = await this.listUsersUseCase.execute(searchParams)
        return UsersController.listUsersToResponse(output)
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const output = await this.getUserUseCase.execute({ id })
        return UsersController.userToResponse(output)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const output = await this.updateUserUseCase.execute({ id, ...updateUserDto })
        return UsersController.userToResponse(output)
    }

    @Patch(':id')
    async updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
        const output = await this.updatePasswordUseCase.execute({ id, ...updatePasswordDto })
        return UsersController.userToResponse(output)
    }

    @HttpCode(204)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.deleteUserUseCase.execute({ id })
    }
}
