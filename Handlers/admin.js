const {  Admin } = require('../Database/admin');
const jwt = require('jsonwebtoken');

// const getAllTodos = async (req, res) => {
//     console.log("hello")
//     try {
//         const { token } = req.headers;
//         console.log(token)
//         const {status, tag}=req.query;
//         if(status && tag){
//             let user = jwt.decode(token);
//             const todos = await Todos.find({ user: user.id, tag, status });
//             return res.status(200).send(todos);
//         }else if(status){

//             let user = jwt.decode(token);
//             const todos = await Todos.find({ user: user.id, status });
//            return res.status(200).send(todos);
//         }
        
//         let user = jwt.decode(token, process.env.SECRET);
//         console.log(user)
//         const todos = await Todos.find({ user: user.id });
//         res.status(200).send(todos);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// }

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password)
        const user = await Admin.findOne({ email }).populate('password');
        console.log(user)
        if (!user) {
            return res.status(400).send({
                message: "User does not exist"
            })
        }
        else {
            if (user.password === password) {
                const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.SECRET);
                return res.status(200).send({token});
            }
            else {
                return res.status(400).send({
                    message: "Password is incorrect"
                })
            }
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const createAdmin = async (req, res) => {
    try {
        const newUser = req.body; // email, name, and password
        console.log(newUser)
        let existingUser = await Admin.findOne({
            email: newUser.email
        })

        if (existingUser) {
            return res.status(400).send({
                message: "User already exists"
            })
        }

        let user = await Admin(newUser);
        await user.save();
        user = user.toJSON();
        delete user.password;

        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


// const updateTodo = async (req, res) => {
//     try {
//         const { token } = req.headers;
//         let user = jwt.decode(token);
//         let todo = req.body;
//         todo.user = user.id;
//         let updatedtodo = await Todos.findByIdAndUpdate(todo.id, todo, { new: true });
//         res.status(200).send(updatedtodo);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// }

// const deleteTodo = async (req, res) => {
//     try {
//         let {id} = req.body;
//         console.log(id)
//         await Todos.findByIdAndDelete(id);
//         res.status(200).send({ message: 'Todo deleted' });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// }

// const getTodoById = async (req, res) => {
//     try {
//         const { token } = req.headers;
//         const {todoID} =req.params;
//         let user = jwt.decode(token);
//         const todos = await Todos.find({ user: user.id, _id:todoID });
//         res.status(200).send(todos);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// }

const checkAdminByToken = async (req, res) => {
    try {
        const {token} = req.headers;
        const decoded = jwt.verify(token, process.env.SECRET);
        if(decoded){
            return res.status(200).send({token});
        }        // const user = await User.findOne({ _id: decoded._id });
        // if (!user) {
        //     return res.status(400).send({
        //         message: "User does not exist"
        //     })
        // }
        // else {
        //     return res.status(200).send(user);
        // }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}




module.exports = {
    adminLogin,
    createAdmin,checkAdminByToken
}