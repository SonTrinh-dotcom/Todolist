import { DarkThemeToDoList } from "../../JSS/Themes/DarkThemeToDoList";
import {
  add_task,
  change_theme,
  delete_task,
  done_task,
  edit_task,
  redo_task,
  update_task,
} from "../type/ToDoListTypes";
import { ThemeOption } from "../../JSS/Themes/ThemeManager";

const initialState = {
  themeToDoList: DarkThemeToDoList,

  taskList: [
    { id: 1, taskName: "task 1", done: true },
    { id: 2, taskName: "task 2", done: false },
    { id: 3, taskName: "task 3", done: true },
    { id: 4, taskName: "task 4", done: false },
  ],
  taskEdit: { id: 2, taskName: "task 1", done: false },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case add_task: {
      if (action.newTask.taskName.trim() === "") {
        alert("Please add task name");
      }
      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.newTask.taskName
      );

      if (index !== -1) {
        alert("Task name is already exist");
        return { ...state };
      }

      taskListUpdate.push(action.newTask);

      state.taskList = taskListUpdate;

      return { ...state };
    }
    case change_theme: {
      // Find theme based on action with same id

      let theme = ThemeOption.find((theme) => theme.id == action.themeId);

      if (theme) {
        state.themeToDoList = { ...theme.theme };
        console.log(theme);
      }

      return { ...state };
    }
    // eslint-disable-next-line no-fallthrough
    case done_task: {
      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex((task) => task.id === action.taskId);

      if (index !== -1) {
        taskListUpdate[index].done = true;
      }

      return { ...state, taskList: taskListUpdate };
    }

    case delete_task: {
      let taskListUpdate = [...state.taskList];
      taskListUpdate = taskListUpdate.filter(
        (task) => task.id !== action.taskId
      );
      return { ...state, taskList: taskListUpdate };
    }

    case edit_task: {
      return { ...state, taskEdit: action.task };
    }

    case update_task: {
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName };

      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex(
        (task) => task.id === state.taskEdit.id
      );

      if (index !== -1) {
        taskListUpdate[index] = state.taskEdit;
      }

      state.taskList = taskListUpdate;

      state.taskEdit = { id: "-1", taskName: "", done: false };

      return { ...state };
    }

    case redo_task: {
      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex(
        (task) => task.id === action.task.id
      );

      if (index !== -1) {
        taskListUpdate[index].done = false;
      }

      return { ...state, taskList: taskListUpdate };
    }

    default:
      return { ...state };
  }
};
