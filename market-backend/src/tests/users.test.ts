import { hash } from "bcrypt"
import { hashPassword, verifyPassword } from "../user/password"

function testPassword(shouldMatch: boolean,
                      actualPassword: string, 
                      password: string = actualPassword) {
    test(`${actualPassword} and ${password} should ${(shouldMatch) ? 'match' : 'not match'}.`,
        (done) => {
            // expect(
            //     (verifyPassword(hashPassword(password), password))
            // ).resolves.toBe(shouldMatch);
        }
    );
}

testPassword(true, "abc", "abc");
testPassword(true, "cJ@EDJw1s1sjejK@!K@K1sK!kwsk1kI$1AA1sxE", "cJ@EDJw1s1sjejK@!K@K1sK!kwsk1kI$1AA1sxE");
testPassword(true, "cJ@EDJw1s1sjejK@!K@K1sK!kwsk1kI$1AA1sxE", "acJ@EDJw1s1sjejK@!K@K1sK!kwsk1kI$1AA1sxE");
