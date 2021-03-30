import { add_task, change_theme, delete_task, done_task, edit_task, new_theme, redo_task, update_task } from "../type/ToDoListTypes";

export const addTaskAction = (newTask) => ({
    type: add_task,
    newTask
})

export const changeTheme = (themeId) => ({
    type: change_theme,
    themeId
})


export const doneTask = (taskId) => ({
    type: done_task,
    taskId
})

export const deleteTask = (taskId) => ({
    type: delete_task,
    taskId
})

export const editTask = (task) => ({
    type: edit_task,
    task
})

export const updateTask = (taskName) => ({
    type: update_task,
    taskName
})

export const redoTask = (task) => ({
    type: redo_task,
    task
})