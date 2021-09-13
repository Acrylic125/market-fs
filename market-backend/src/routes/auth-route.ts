import { authenticate, use } from 'passport';
import { Strategy } from 'passport-local'; 
import { Router } from 'express'; 
import { findOneByEmail, findOneByUsername } from '../user/user-repo';
import { verifyPassword } from '../user/password';

const EMAIL_IDENTIFIER_REGEX = /@$/gi.compile();

async function resolveUserFromSignInAs(signInAs: string) {
    return (EMAIL_IDENTIFIER_REGEX.test(signInAs)) ? findOneByEmail(signInAs) : findOneByUsername(signInAs);
}

use(new Strategy(async (signInAs, password, done) => {
    var user = await resolveUserFromSignInAs(signInAs);
    if (user) {

    } else {
        done(null, false);
    }
}));

const authRouter = Router();
authRouter.post("/login", authenticate('local'), (request, response) => {

});

export default authRouter;