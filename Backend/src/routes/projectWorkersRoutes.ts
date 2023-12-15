// @ts-nocheck 
const database = require('../database');
const router = require('../routerconfig');

// Add an employee to a project
router.post('/:projectId/workers/:employeeId', async (req, res) => {
  const projectId = req.params.projectId;
  const employeeId = req.params.employeeId;

  try {

    if (projectId.length === 0 || employeeId.length === 0) {
      return res.status(404).json({ error: 'Project or employee not found' });
    }

    // Insert the association into the ProjectWorkers table
    await database.db('EXEC AddEmployeeToProject @ProjectId, @EmployeeId', { ProjectId: projectId, EmployeeId: employeeId });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Remove an employee from a project
router.delete('/:projectId/workers/:employeeId', async (req, res) => {
  const projectId = req.params.projectId;
  const employeeId = req.params.employeeId;

  try {
    if (projectId.length === 0 || employeeId.length === 0) {
      return res.status(404).json({ error: 'Project or employee not found' });
    }

    // Remove the association from the ProjectWorkers table
    await database.db('EXEC RemoveEmployeeFromProject @ProjectId, @EmployeeId', { ProjectId: projectId, EmployeeId: employeeId });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
