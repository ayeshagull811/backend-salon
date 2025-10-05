// jwt.strategy.js
const { Injectable } = require('@nestjs/common');
const { PassportStrategy } = require('@nestjs/passport');
const { ExtractJwt, Strategy } = require('passport-jwt');

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'yourSecretKey', // .env se lo
    });
  }

  async validate(payload) {
    return { userId: payload.sub, email: payload.email };
  }
}

module.exports = { JwtStrategy };
