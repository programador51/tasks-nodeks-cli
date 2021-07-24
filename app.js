// const { showMenu, pause } = require('./helpers/mensajes');
const { inquirerMenu,
    pause,
    readInput,
    listTasksDelete,
    showCheckList,
    confirm } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Task = require('./models/task');
const Tasks = require('./models/tasks');

require('colors');

const main = async () => {
    let opt = '';

    const tasks = new Tasks();

    const dbTasks = readDB();

    if (dbTasks) {
        tasks.loadTasksFromArray(dbTasks);
    }

    do {
        // PRINT MENU AND CHOSE AN OPTION
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Descripcion: ');
                tasks.createTask(desc);
                break;

            case '2':
                tasks.completeList();
                break;

            case '3':
                tasks.listTasks(true);
                break;

            case '4':
                tasks.listTasks(false);
                break;

            case '5':
                const ids = await showCheckList(tasks.listArray);
                tasks.toggleComplete(ids);
                break;

            case '6':
                const id = await listTasksDelete(tasks.listArray);

                if (id !== '0') {
                    const confirmedDel = await confirm('Estas seguro?');


                    if (confirmedDel === true) {
                        tasks.deleteTask(id);
                    }
                }


        }

        saveDB(tasks.listArray);

        // PROPMT TO HIT ENTER IN ORDER TO COTINUE
        await pause();

    } while (opt !== '0');
}

main();