// const { Sequelize } = require("sequelize");
import { Sequelize } from "sequelize";

const dbConfig = {
	dataBaseName: process.env.NAME_DATABASE,
	userDatabase: process.env.USER_DATABASE,
	passDatabase: process.env.PASS_DATABASE,
	hostDatabase: process.env.HOST_DATABASE,
	typeDatabase: process.env.TYPE_DATABASE,
};

export const fnSequelize = () => {
	const sequelize = new Sequelize(
		dbConfig.dataBaseName,
		dbConfig.userDatabase,
		dbConfig.passDatabase,
		{
			host: dbConfig.hostDatabase,
			dialect: dbConfig.typeDatabase,
			/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
			dialectOptions: {
				multipleStatements: true,
			},
		},
	);

	return sequelize;
};
