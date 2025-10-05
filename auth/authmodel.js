// auth.module.ts
// auth.module.js
const { Module } = require('@nestjs/common');
const { JwtModule } = require('@nestjs/jwt');
const { PassportModule } = require('@nestjs/passport');
const { AuthService } = require('./auth.service');
const { JwtStrategy } = require('./jwt.strategy');
const { AuthController } = require('./auth.controller');

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey', // .env se lo
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
class AuthModule {}

module.exports = { AuthModule };

