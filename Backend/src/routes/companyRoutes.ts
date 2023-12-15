// @ts-nocheck
const database = require('../database');
const router = require('../routerconfig');

// Get all companies
router.get('/companies', async (req: any, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
	try {
		const companies = await database.db('EXEC GetAllCompanies');
		res.json(companies);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get company by ID
router.get('/companies/:id', async (req: { params: { id: any } }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
	const companyId = req.params.id;

	try {
		const company = await database.db(`EXEC GetCompanyById ${companyId}`, []);
		if (company.length > 0) {
			res.json(company);
		} else {
			res.status(404).json({ error: 'Company not found' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Add a new company
router.post('/companies', async (req: { body: { name: any } }, res: { json: (arg0: { success: boolean; companyId: any }) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
	const { name } = req.body;
	
	try {
		const result = await database.db(`EXEC InsertCompany ${name}`);
		const newCompanyId = result[0].CompanyId; // Assuming your stored procedure returns the new company ID
		res.json({ success: true, companyId: newCompanyId });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Update an existing company
router.put('/companies/:id', async (req: { params: { id: any }; body: { name: any } }, res: { json: (arg0: { success: boolean }) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
	const companyId = req.params.id;
	const { name } = req.body;

	try {
		await database.db(`EXEC UpdateCompany ${companyId}, ${name}`);
		res.json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// //? Delete a company --- TODO: Needs triggers that will delete everything relevant to the company
router.delete('/companies/:id', async (req: { params: { id: any } }, res: { json: (arg0: { success: boolean }) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
	const companyId = req.params.id;

	try {
		await database.db(`EXEC DeleteCompany ${companyId}`);
		res.json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get all users for a company
router.get('/:companyId/employees', async (req, res) => {
  const companyId = req.params.companyId;

  try {
    // Assuming you have a stored procedure to get all users for a specific company
    const users = await database.db('EXEC GetEmployeesByCompany @CompanyId', { CompanyId: companyId });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
