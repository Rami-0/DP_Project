// @ts-nocheck
const database = require('../database');
const router = require('../routerconfig');

// Get all employees
router.get('/employees', async (req: any, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
	try {
		const employees = await database.db('EXEC GetAllEmployees');
		res.json(employees);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get all employees not assigned to a company
router.get('/employees/free', async (req: any, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
	try {
		const employees = await database.db('EXEC GetUsersNotAssignedToCompany');
		res.json(employees);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get employee by ID
router.get('/employees/:id', async (req: { params: { id: any } }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
	const employeeId = req.params.id;

	try {
		const employee = await database.db('EXEC GetEmployeeById @EmployeeId', {
			EmployeeId: employeeId,
		});
		if (employee.length > 0) {
			res.json(employee);
		} else {
			res.status(404).json({ error: 'Employee not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Add a new employee
router.post('/employees', async (req: { body: { FirstName: any; LastName: any; MiddleName: any; Email: any; }; }, res: { json: (arg0: { success: boolean; employeeId: any; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
	const { FirstName, LastName, MiddleName, Email } = req.body;

	try {
		const result = await database.db('EXEC InsertEmployee @FirstName, @LastName, @MiddleName, @Email', {
			FirstName,
			LastName,
			MiddleName,
			Email,
		});
		const newEmploeeyId = result[0].EmployeeID; // Assuming your stored procedure returns the new company ID

		// Assuming that `result` contains the inserted employee information, adjust accordingly
		res.json({ success: true, employeeId: newEmploeeyId });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Update an existing employee
router.put('/employees/:id', async (req: { params: { id: any; }; body: { FirstName: any; LastName: any; MiddleName: any; Email: any; }; }, res: { json: (arg0: { success: boolean; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
	const employeeId = req.params.id;
	const { FirstName, LastName, MiddleName, Email } = req.body;

	try {
		const result = await database.db('EXEC UpdateEmployee @EmployeeId, @FirstName, @LastName, @MiddleName, @Email', {
			EmployeeId: employeeId,
			FirstName: FirstName,
			LastName: LastName,
			MiddleName: MiddleName,
			Email: Email,
		});

		// Assuming that `result` contains the update status, adjust accordingly
		res.json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Delete an employee
router.delete('/employees/:id', async (req: { params: { id: any } }, res: { json: (arg0: { success: boolean }) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
	const employeeId = req.params.id;

	try {
		await database.db(`EXEC DeleteEmployee ${employeeId}`);
		res.json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Leave company if enrolled already
router.post('/employees/:id/leave', async (req, res) => {
  const employeeId = req.params.id;

  try {
    // Assuming LeaveCompany is a stored procedure that doesn't return a result set
    const result = await database.db('EXEC LeaveCompany @EmployeeId', {
      EmployeeId: employeeId,
    });

    res.json({ success: true, result: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

