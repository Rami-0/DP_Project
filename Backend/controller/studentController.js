const dboperations = require('../model/dboperations');

// Get all students
exports.getAllStudents = async (req, res) => {
	try {
		const students = await dboperations.getStudents();
		res.status(200).json(students);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
	const studentId = req.params.id;
	try {
		const student = await dboperations.getStudent(studentId);
		if (!student) {
			return res.status(404).json({ error: 'Student not found' });
		}
		res.status(200).json(student);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

// Create a new student
exports.createStudent = async (req, res) => {
	const studentData = req.body;
	try {
		const result = await dboperations.addStudent(studentData);
		res.status(201).json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
};
