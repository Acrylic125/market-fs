import { hash } from "bcrypt"
import { hashPassword, verifyPassword } from "../user/password"

function testPassword(shouldMatch: boolean,
                      actualPassword: string, 
                      password: string = actualPassword) {
    test(`${actualPassword} and ${password} should ${(shouldMatch) ? 'match' : 'not match'}.`,
        (done) => {
            hashPassword(password).then((hashed) => 
                expect(verifyPassword(hashed, password)).toBe(shouldMatch))
        }
    );
}

test(`'abc' and 'abc' password should match.`, () => testPassword(true, "abc", "abc"))
test(`'cJ@EDJw1s1sjejK@!K@K1sK!kwsk1kI$1AA1sxE' and 'cJ@EDJw1s1sjejK@!K@K1sK!kwsk1kI$1AA1sxE' password should match.`, () => 
    testPassword(true, "cJ@EDJw1s1sjejK@!K@K1sK!kwsk1kI$1AA1sxE", "cJ@EDJw1s1sjejK@!K@K1sK!kwsk1kI$1AA1sxE"))
test(`'cJ@EDJw1s1sjejK@!K@K1sK!kwsk1kI$1AA1sxE' and 'caJ@EDJw1s1sjejK@!K@K1sK!kwsk1kI$1AA1sxE' password should not match.`, () =>
    testPassword(true, "cJ@EDJw1s1sjejK@!K@K1sK!kwsk1kI$1AA1sxE", "acJ@EDJw1s1sjejK@!K@K1sK!kwsk1kI$1AA1sxE"))
