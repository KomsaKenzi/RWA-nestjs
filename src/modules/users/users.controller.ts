import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    Param,
    ParseIntPipe,
    Put,
  } from '@nestjs/common';
  import { AuthService } from 'src/auth/auth.service';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  import { LocalAuthGuard } from 'src/auth/local-auth.guard';
  import { createUserDTO } from 'src/dto/createUser.dto';
  import { User } from 'src/entities/user.entity';
  import { UsersService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(
      private userService: UsersService,
      private authService: AuthService,
    ) {}
  
    @Post('register')
    public createUser(@Body() user: createUserDTO): Promise<User> {
      return this.userService.createUser(user);
    }
  
    @UseGuards(LocalAuthGuard)
    @Post('login')
    public login(@Request() req) {
      return this.authService.login(req.user);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('loginWithToken/:username')
    public async loginWithToken(@Param('username') username: string) {
      const user: User = await this.userService.getUser(username);
      return this.authService.login(user);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('getProfileData/:id')
    public getProfileData(@Param('id', ParseIntPipe) id: number) {
      return this.userService.getProfileData(id);
    }
   
  
    @UseGuards(JwtAuthGuard)
    @Get('searchUsers/:name/:userID')
    public searchUsers(
      @Param('name') name: string,
      @Param('userID', ParseIntPipe) userID: number,
    ) {
      return this.userService.searchUsers(name, userID);
    }
  }
  