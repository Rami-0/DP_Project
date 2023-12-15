// @ts-nocheck
const database = require('../database');
const router = require('../routerconfig');

// ** Related to companies ** //
// Get all projects by company ID
router.get('/:id/projects', async (req: { params: { companyId: any , id: any} }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
	const companyId = req.params.id;
	try {
		const projects = await database.db('EXEC GetProjectsByCompany @CompanyID', { CompanyID: companyId });
		res.json(projects);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});
// Get project by ID
router.get('/:companyID/projects/:id', async (req: { params: { id: any; companyID: any } }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
	const { id, companyID } = req.params;

	try {
		const project = await database.db('EXEC GetProjectByIdForCompany @ProjectId, @CompanyID', {
			ProjectId: id,
			CompanyID: companyID,
		});

		if (project.length > 0) {
			// Ensure that the project belongs to the specified company and the owner is the ExecutorCompanyID
			res.json(project);
		} else {
			res.status(404).json({ error: 'Project not found or does not belong to the specified company' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});
// Add a new project
router.post(
	'/:companyID/projects/create',
	async (
		req: { params: { companyID: number }; body: { Name: any; ProjectManagerID: any; StartDate: any; EndDate: any; Priority: any; ExecutorCompanyID: Number } },
		res: { json: (arg0: { success: boolean; projectId: any }) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } },
	) => {
		const { Name, ProjectManagerID, StartDate, EndDate, Priority, ExecutorCompanyID } = req.body;
		const CustomerCompanyID = req.params.companyID;

		try {
			const result = await database.db('EXEC InsertProject @Name, @ProjectManagerID, @StartDate, @EndDate, @Priority, @CustomerCompanyID, @ExecutorCompanyID', {
				Name,
				ProjectManagerID,
				StartDate,
				EndDate,
				Priority,
				CustomerCompanyID,
				ExecutorCompanyID,
			});

			const newProjectId = result[0].ProjectID; // Assuming your stored procedure returns the new project ID
			res.json({ success: true, projectId: newProjectId });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
);
// Update an existing project
router.put(
	'/:companyID/projects/:id',
	async (
		req: { params: { id: number; companyID: number }; body: { Name: string; ProjectManagerID: number; StartDate: Date | any; EndDate: Date | any; Priority: number } },
		res: { json: (arg0: { success: boolean }) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } },
	) => {
		const { id, companyID } = req.params;
		// Destructure project properties from the request body
		const { Name, ProjectManagerID, StartDate, EndDate, Priority } = req.body;

		try {
			// Replace the SQL query with your stored procedure and parameters
			const result = await database.db('EXEC UpdateProject @ProjectId, @Name, @ProjectManagerID, @StartDate, @EndDate, @Priority, @companyID', {
				ProjectId: id,
				Name: Name,
				ProjectManagerID: ProjectManagerID,
				StartDate: StartDate,
				EndDate: EndDate,
				Priority: Priority,
				companyID: companyID,
			});

			// Assuming that `result` contains the update status, adjust accordingly
			res.json({ success: true });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	},
);
// Delete a project
router.delete('/:companyID/projects/:id', async (req: { params: { id: any; companyID: number } }, res: { json: (arg0: { success: boolean }) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
	const projectId = req.params.id;

	try {
		// Replace the SQL query with your stored procedure and parameters
		await database.db('EXEC DeleteProject @ProjectId', {
			ProjectId: projectId,
      CompanyId: companyId
		});

		res.json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});


// ** Related to employees ** //



module.exports = router;
