const bcrypt = require("bcrypt");
const testUsers = require("./usersData");
const { writeFile } = require("fs/promises");
const { encryptPasswords } = require("../../seeds/utils");

function hashPasswords() {
	return encryptPasswords(testUsers).then((hashedUsers) => {
		return writeFile("db/data/development-data/users.js", JSON.stringify(hashedUsers)).then(() => {
			console.log("passwords hashed!");
		});
	});
}
hashPasswords();
