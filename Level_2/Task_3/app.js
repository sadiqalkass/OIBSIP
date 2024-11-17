const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose")
const date = require("./date")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/taskListDB")

const taskSchema = {
    title: String,
    body: String,
    date: String,
    complete: Boolean
}

const Task = mongoose.model('task', taskSchema);

const task1 = {
    title: "Task 3",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, earum. Similique quasi nemo, esse eveniet voluptatibus, amet quia libero nulla qui ipsam beatae nesciunt illo odit recusandae dolore magnam suscipit!",
    complete: false
}
const task2 = {
    title: "Task 4",
    body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, earum. Similique quasi nemo, esse eveniet voluptatibus.",
    complete: false
}

const testTasks = [task1, task2]
//Task.insertMany(testTasks).then(()=> console.log('tasks Saved'))

app.get('/', (req,res)=>{
    const getTask = async()=>{
        const fudTasks = await Task.find({complete: false})
        if (fudTasks.length === 0) {
            res.render('home', {
                notask: "No Tasks Avalable",
                Tasks : []
            })
        } else {
            res.render('home', {
                notask: null,
                Tasks : fudTasks
            })
        }
    }
    getTask()
})
app.get('/compose', (req,res)=>{
    res.render('compose',{
        editTitle: "",
        editBody: "",
        editTaskId: ""
    })
})

app.get('/completed', (req,res)=>{
    const getComTask = async()=>{
        const fudTasks = await Task.find({complete: true})
        if (fudTasks.length === 0) {
            res.render('completed', {
                notask: "No Tasks Avalable",
                Tasks : []
            })
        } else {
            res.render('completed', {
                notask: null,
                Tasks : fudTasks
            })
        }
    }
    getComTask()
})

app.post('/compose', (req,res)=>{
    if (req.body.id) {
        const getAndUpTask = async ()=>{
            const updatedTask = await Task.findOneAndUpdate({_id: req.body.id}, 
                {title: _.capitalize(req.body.title),
                    body:  req.body.body,
                    date:  date.getDate(),
                    complete: false
                })     
        }
        getAndUpTask()
        res.redirect('/')
    } else {   
        const newTask = {
            title: _.capitalize(req.body.title),
            body:  req.body.body,
            date:  date.getDate(),
            complete: false
        }
        Task.insertMany(newTask).then(() => console.log("New Task saved"))
        res.redirect('/')
    }
})

app.post('/complete', (req,res)=>{
    const getCmpedTask = async ()=>{
        const cmpedTask = await Task.findOneAndUpdate({_id: req.body.taskId}, {complete : true, date: date.getDate()})
        res.redirect('/')
    }
    getCmpedTask()
})

app.post('/update', (req,res)=>{
    const getTaskAnUp = async ()=>{
        const updatedTask = await Task.findById(req.body.taskId)
        res.render('compose', {
            editTitle: updatedTask.title,
            editBody: updatedTask.body,
            editTaskId: updatedTask._id
        })
    }
    getTaskAnUp()
})

app.post('/delete', (req,res)=>{
    const getCmpedTask = async ()=>{
        const cmpedTask = await Task.findByIdAndDelete(req.body.taskId)
        if (req.body.complete) {
            res.redirect('/completed')   
        } else {
            res.redirect('/')
        }
    }
    getCmpedTask()
})


app.listen(3000,()=>{
    console.log('Server up at port 3000..')
})