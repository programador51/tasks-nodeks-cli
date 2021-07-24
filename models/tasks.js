const Task = require("./task");

class Tasks{
    constructor(){
        this._list = {};
    }

    /**
     * Create a new task
     * 
     * @param {string} desc - Description of the task to create
     */
    createTask(desc = ''){
        const task = new Task(desc);

        this._list[task.id] = task;
    }

    get listArray(){
        const list = [];

        Object.keys(this._list).forEach(key=>{
            list.push(this._list[key]);
        })

        return list;
    }

    /**
     * Load the tasks from the json file
     * 
     * @param {Object[]} tasks - List of tasks
     * @param {string} tasks[].desc - Description of task
     * @param {string} tasks[].id - ID of the db task
     * @param {Date} tasks[].completedOn - Date of the finished task
     */
    loadTasksFromArray(tasks = []){
        tasks.forEach(task=>{
            this._list[task.id] = task;
        });
    }

    completeList(){
        this.listArray.forEach((task,i)=>{
            const index = `${i+1}`.green;
            const { desc,completedOn } = task;

            const state = (completedOn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${index}. ${desc} :: ${state}`);
        })
    }

    /**
     * List the tasks of the system
     * 
     * @param {boolean} completed - If true, will list the completed, if not, the pending ones
     */
    listTasks(completed = true){
        let index = 0;

        this.listArray.forEach(task=>{
            const { desc,completedOn } = task;

            const state = (completedOn) ? 'Completada'.green : 'Pendiente'.red;

            if(completed === true){
                if(completedOn!==null){
                    index+=1;
                    console.log(`${index.toString().green} ${desc} :: ${state}`);
                }
            }else{
                if(completedOn===null){
                    index+=1;
                    console.log(`${index.toString().green} ${desc} :: ${state}`);
                }
            }

        })
    }

    toggleComplete (ids = []){
        ids.forEach(id=>{
            const task = this._list[id];

            if(!task.completedOn){
                task.completedOn = new Date().toISOString();
            }
        });

        this.listArray.forEach(task=>{
            if(!ids.includes(task.id)){
                this._list[task.id].completedOn = null
            }
        })
    }
    
    /**
     * Delete a task
     * 
     * @param {string} id - Id of the task to delete
     */
    deleteTask(id = ''){
        if(this._list[id]){
            delete this._list[id];
        }
    }
}

module.exports = Tasks;