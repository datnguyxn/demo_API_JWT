import passport from 'passport';
import Strategy from 'passport-jwt';
import User from "../models/user.js";
import GooglePlusTokenStrategy from 'passport-google-plus-token';

const JwtStrategy = Strategy.Strategy;

passport.use(new JwtStrategy({
    jwtFromRequest: Strategy.ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.JWT_ACCESS_TOKEN
}, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);
            if (!user) {
                return done(new Error('User not found'), false);
            } else {
                done(null, user);
            }
        } catch (error) {
            done(error, false);
        }
}))

passport.use(new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        const isExistingUser = await User.findOne({googleId: profile.id, level: "google"});
        if (isExistingUser) {
            return done(null, isExistingUser);
        } else {
            const newUser = new User({
                level: "google",
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                password: profile.id
            });
            await newUser.save();
            done(null, newUser);
        }
    } catch (error) {
        done(error, false, error.message);
    }
}))
