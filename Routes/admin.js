// const express = require('express');
// const { getAllTodos, createTodo, deleteTodo, updateTodo, getTodoById,  } = require('../Handlers/todo');

// const TodosRouter = express.Router();

// TodosRouter.get('/todos',getAllTodos);
// TodosRouter.post('/createTodo',createTodo);
// TodosRouter.put('/updateTodo',updateTodo);
// TodosRouter.delete('/deleteTodo',deleteTodo);
// TodosRouter.get('/todos/:todoID',getTodoById);




// module.exports = TodosRouter;

const express = require('express');
const cors = require('cors');
const { createAdmin, adminLogin, checkAdminByToken } = require('../Handlers/admin');

const adminRouter = express.Router();

adminRouter.post("/create",createAdmin);
adminRouter.post("/adminLogin",adminLogin);
adminRouter.post("/checkadminByToken",checkAdminByToken);

module.exports = adminRouter;