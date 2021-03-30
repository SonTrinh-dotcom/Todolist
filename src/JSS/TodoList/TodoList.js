import React, { Component } from "react";
import { Container } from "../../JSS/ToDoListComponents/Container";
import { ThemeProvider } from "styled-components";
import { Dropdown } from "../../JSS/ToDoListComponents/Dropdown";
import { Heading3 } from "../ToDoListComponents/Heading";
import { TextField } from "../ToDoListComponents/TextField";
import { Button } from "../ToDoListComponents/Button";
import { Table, Thead, Tr, Th } from "../ToDoListComponents/Table";
import { connect } from "react-redux";
import {
  addTaskAction,
  changeTheme,
  deleteTask,
  doneTask,
  editTask,
  redoTask,
  updateTask,
} from "../../redux/action/ToDoListActions";
import { ThemeOption } from "../Themes/ThemeManager";

class TodoList extends Component {
  state = {
    taskName: "",
    disabled: true,
  };

  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(editTask(task));
                    }
                  );

                 
                }}
              >
                <i class="fa fa-edit"></i>
              </Button>

              <Button
                onClick={() => {
                  this.props.dispatch(doneTask(task.id));
                }}
              >
                <i class="fa fa-check"></i>
              </Button>

              <Button
                onClick={() => {
                  this.props.dispatch(deleteTask(task.id));
                }}
              >
                <i class="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.props.dispatch(redoTask(task));
                }}
              >
                <i class="fa fa-redo"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTask(task.id));
                }}
              >
                <i class="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTheme = () => {
    return ThemeOption.map((theme, index) => {
      return (
        <option key={index} value={theme.id}>
          {theme.name}
        </option>
      );
    });
  };


  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <Container>
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              this.props.dispatch(changeTheme(value));
            }}
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading3 className="text-left mt-2">To do list</Heading3>
          <TextField
            value={this.state.taskName}
            onChange={(e) => {
              this.setState(
                {
                  taskName: e.target.value,
                },
                console.log(e.target.value)
              );
            }}
            name="taskName"
            label="Task name"
          ></TextField>

          <Button
            className="ml-2"
            onClick={() => {
              let { taskName } = this.state;
              // Create one new object for new task
              let taskInput = {
                id: Date.now(),
                taskName: taskName,
                done: false,
              };

              //Push to redux
              this.props.dispatch(addTaskAction(taskInput));
            }}
          >
            Add task
          </Button>
          {this.state.disabled ? (
            <Button
              disabled
              onClick={() => {
                this.props.dispatch(updateTask(this.state.taskName));
              }}
              className="ml-2"
            >
              Update task
            </Button>
          ) : (
            <Button
              onClick={() => {
                let { taskName } = this.state;
                this.setState(
                  {
                    disabled: true,
                    taskName: "",
                  },
                  () => {
                    this.props.dispatch(updateTask(taskName));
                  }
                );
              }}
              className="ml-2"
            >
              Update task
            </Button>
          )}

          <hr></hr>
          <Heading3>Task to do</Heading3>
          <Table>{this.renderTaskToDo()}</Table>
          <Heading3>Task completed</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }

  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskList: state.ToDoListReducer.taskList,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};

export default connect(mapStateToProps)(TodoList);
