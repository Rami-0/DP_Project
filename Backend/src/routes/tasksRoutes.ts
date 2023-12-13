// @ts-nocheck
const database = require('../database');
const router = require('../routerconfig');

// Get all tasks
router.get('/tasks', async (req: any, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
  try {
    const tasks = await database.db('EXEC GetAllTasks');
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get task by ID
router.get('/tasks/:id', async (req: { params: { id: any } }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
  const taskId = req.params.id;

  try {
    const task = await database.db('EXEC GetTaskById @TaskId', {
      TaskId: taskId,
    });
    if (task.length > 0) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new task
router.post('/tasks', async (req: { body: { /* Define your task properties here */ }; }, res: { json: (arg0: { success: boolean; taskId: any; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
  // Destructure task properties from the request body
  const { /* Define your task properties here */ } = req.body;

  try {
    // Replace the SQL query with your stored procedure and parameters
    const result = await database.db('EXEC InsertTask /* Add your parameters here */', {
      /* Add your parameters here */
    });
    const newTaskId = result[0].TaskId; // Assuming your stored procedure returns the new task ID

    // Assuming that `result` contains the inserted task information, adjust accordingly
    res.json({ success: true, taskId: newTaskId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an existing task
router.put('/tasks/:id', async (req: { params: { id: any; }; body: { /* Define your task properties here */ }; }, res: { json: (arg0: { success: boolean; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
  const taskId = req.params.id;
  // Destructure task properties from the request body
  const { /* Define your task properties here */ } = req.body;

  try {
    // Replace the SQL query with your stored procedure and parameters
    const result = await database.db('EXEC UpdateTask @TaskId, /* Add your parameters here */', {
      TaskId: taskId,
      /* Add your parameters here */
    });

    // Assuming that `result` contains the update status, adjust accordingly
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a task
router.delete('/tasks/:id', async (req: { params: { id: any } }, res: { json: (arg0: { success: boolean }) => void; status: (arg0: number) => { (): any; new (): any; json: { (arg0: { error: string }): void; new (): any } } }) => {
  const taskId = req.params.id;

  try {
    // Replace the SQL query with your stored procedure and parameters
    await database.db('EXEC DeleteTask @TaskId', {
      TaskId: taskId,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
