import { genSalt, hash, compare } from 'bcrypt';

export async function hashPassword(password: string) {
    const salt = await genSalt(15);
    return hash(password, salt);
}

export async function verifyPassword(hash: string, testPassword: string) {
    return compare(testPassword, hash);
}

// Testing bcrypt.
// hashPassword("Donkey").then( async (hashed) => {
//     console.log(hashed);
//     var verf = await verifyPassword(hashed, "Donkey");
//     console.log(verf);
//     var verf = await verifyPassword(hashed, "Donke2y");
//     console.log(verf);
//     var verf = await verifyPassword(hashed, "donkey");
//     console.log(verf);
   
// });