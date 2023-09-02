const bcrypt = require("bcrypt");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
	if (!created_at) return { ...otherProperties };
	return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
	return arr.reduce((ref, element) => {
		ref[element[key]] = element[value];
		return ref;
	}, {});
};

exports.formatComments = (comments, idLookup) => {
	return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
		const article_id = idLookup[belongs_to];
		return {
			article_id,
			author: created_by,
			...this.convertTimestampToDate(restOfComment),
		};
	});
};

exports.encryptPassword = (user) => {
	return bcrypt.hash(user.password, 10).then((hashedPassword) => {
		const currentUser = {...user}
		currentUser.password = hashedPassword
		return currentUser
	})
};

exports.encryptPasswords = (usersArr) => {
	const hashedUsersPromisesArray = usersArr.map(exports.encryptPassword)
	return Promise.all(hashedUsersPromisesArray).then((hashedUsersArray) => {
		return hashedUsersArray
	})
	
};
