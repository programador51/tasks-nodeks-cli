const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type:'list',
        name:'opcion',
        message:'Que desea hacer ?',
        choices:[
            {
                value:'1',
                name:`${'1.'.green} Crear tarea`
            },
            {
                value:'2',
                name:`${'2.'.green} Listar tarea`
            },
            {
                value:'3',
                name:`${'3.'.green} Listar tareas completadas`
            },
            {
                value:'4',
                name:`${'4.'.green} Listar tareas pendientes`
            },
            {
                value:'5',
                name:`${'5.'.green} Completar tarea`
            },
            {
                value:'6',
                name:`${'6.'.green} Borrar tarea`
            },
            {
                value:'0',
                name:`${'0.'.green} Salir`
            }
        ]
    }
]

const inquirerMenu = async() => {
    console.clear();
    console.log('=================================='.green);
    console.log('=========== MENU ================='.white);
    console.log('==================================\n'.green);

    const opt = await inquirer.prompt(questions);
    return opt.opcion;
}

const pause = async() => {

    const question = {
        type:'input',
        name:'enter',
        message:`Presione ${'Enter'.green} para continuar`
    }

    await inquirer.prompt(question)
}

const readInput = async message =>{
    const question = [
        {
            type:'input',
            name:'desc',
            message,
            validate(value){
                if(value.length===0){
                    return 'Ingresa un valor'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

/**
 * List and navigate throught the task list
 * 
 * @param {Object[]} tasks - List of tasks
 * @param {string} tasks[].desc - Description of task
 * @param {string} tasks[].id - ID of the db task
 * @param {Date} tasks[].completedOn - Date of the finished task
 * @returns {string} id of the task to delete
 */
const listTasksDelete = async(tasks) =>{
    const choices = tasks.map((task,i)=>{

        const index = `${i+1}`.green;
        return{
            value:task.id,
            name:`${index} ${task.desc}`
        }
    });

    const questions = [
        {
            type:'list',
            name:'id',
            message:'Borrar',
            choices
        }
    ];

    choices.unshift({
        value:'0',
        name:'0.'.green + 'Cancelar'
    })

    const { id } = await inquirer.prompt(questions);
    return id;
}

const confirm = async message => {
    const question = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

/**
 * List and navigate throught the task list
 * 
 * @param {Object[]} tasks - List of tasks
 * @param {string} tasks[].desc - Description of task
 * @param {string} tasks[].id - ID of the db task
 * @param {Date} tasks[].completedOn - Date of the finished task
 * @returns {string} id of the task to delete
 */
 const showCheckList = async(tasks) =>{
    const choices = tasks.map((task,i)=>{

        const index = `${i+1}`.green;
        return{
            value:task.id,
            name:`${index} ${task.desc}`,
            checked:(task.completedOn) ? true : false
        }
    });

    const questions = [
        {
            type:'checkbox',
            name:'ids',
            message:'Seleccione',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(questions);
    return ids;
}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTasksDelete,
    confirm,
    showCheckList
}