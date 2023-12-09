const router = require('../routerconfig');
// Import the controller for this route
const studentController = require('../controller/studentController');

// Define a route and its handler
/**
 * @swagger
 * /students:
 *   get:
 *     description: Get a list of all students
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/students', studentController.getAllStudents);
/**
 * @swagger
 * /students/{id}:
 *   get:
 *     description: Get a single student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Student not found
 */
router.get('/students/:id', studentController.getStudentById);
/**
 * @swagger
 * /students:
 *   post:
 *     description: Add a new student
 *     parameters:
 *     ID: int
 *     Name: string(10)
 *     Group: string(20)
 *     Age: int
 *     responses:
 *       201:
 *         description: Successfuly created
 *       500:
 *         description: error
 */
router.post('/students', studentController.createStudent);

module.exports = router;
