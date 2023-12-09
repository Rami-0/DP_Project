var config = require('../dbconfig');
const sql = require('mssql');

async function getStudents() {
	try {
		let pool = await sql.connect(config);
		let products = await pool.request().query('SELECT * from tb_student');
		return products.recordsets;
	} catch (error) {
		console.log(error);
	}
}

async function getStudent(E_ID) {
	try {
		let pool = await sql.connect(config);
		let product = await pool.request().input('input_parameter', sql.Int, E_ID).query('SELECT * from tb_student where Id = @input_parameter');
		return product.recordsets;
	} catch (error) {
		console.log(error);
	}
}
async function addStudent(student) {
	try {
		let pool = await sql.connect(config);
		let insertElement = await pool
			.request()
			.input('ID', sql.Int, student[0].ID)
			.input('Name', sql.NVarChar, student[0].Name)
			.input('Group', sql.NVarChar, student[0].Group)
			.input('age', sql.Int, student[0].age)
			// .query('INSERT INTO YourTableName (Id, Name, [Group], age) VALUES (@Id, @Name, @Group, @age)');
			.execute('InsertStudent');
		return insertElement.recordsets;
	} catch (err) {
		console.error(err);
		throw err;
	}
}

module.exports = {
	getStudents: getStudents,
	getStudent: getStudent,
	addStudent: addStudent,
};
