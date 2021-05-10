import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import TodoList from "./TodoList";
import Header from "./Header";
import Form from "./Form";
import Description from "./Description";

const urlAPI = "http://localhost:4000/todos";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(urlAPI);
        const data = await res.json();
        //console.log("DATA: ", data);
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const restTemplate = (template, data) => {
    return fetch(template.url, {
      method: template.method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : null,
    });
  };

  const addTask = async ({ title, description }) => {
    const exists = todos.find((item) => title === item.title);

    //console.log(`Title: ${title}, Desc: ${description}`);

    if (exists) {
      return alert(`The task ${title} is already on the list`);
    }

    if (title === undefined || title === "") {
      return alert("You need to write a title for the task you want to add");
    }

    if (description === undefined || description === "") {
      return alert(
        "You need to write a description for the task you want to add"
      );
    }

    const template = {
      url: urlAPI,
      method: "POST",
    };
    const data = {
      title,
      description,
      check: false,
    };

    try {
      const res = await restTemplate(template, data);
      //console.log("RESPONSE: ", res);
      const task = await res.json();

      setTodos(todos.concat([task]));
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  const deleteTask = async (id) => {
    const template = {
      url: `${urlAPI}/${id}`,
      method: "DELETE",
    };

    try {
      await restTemplate(template);
      const newTodos = [...todos];
      const filtered = newTodos.filter((item) => item.id !== id);
      //console.log("FILTERED: ", filtered);
      setTodos(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCheck = async (id, title, check) => {
    const template = {
      url: `${urlAPI}/${id}`,
      method: "PATCH",
    };

    const data = {
      title,
      check: !check,
    };

    try {
      const res = await restTemplate(template, data);

      const checkedTask = await res.json();

      const newTodos = [...todos];
      const checked = newTodos.findIndex((item) => item.id === id);
      newTodos[checked] = checkedTask;

      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (id, title) => {
    if (title === " ") {
      return alert("The title can not be left as blank");
    }

    const template = {
      url: `${urlAPI}/${id}`,
      method: "PATCH",
    };

    const data = {
      title,
      check: false,
    };

    try {
      const res = await restTemplate(template, data);
      const editedTask = await res.json();

      const newTodos = [...todos];
      const edited = newTodos.findIndex((item) => item.id === id);
      newTodos[edited] = editedTask;

      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Router>
          <Switch>
            <Route exact path="/">
              <Header counter={todos.length} />

              <TodoList
                tasks={todos}
                delete={deleteTask}
                toggleCheck={toggleCheck}
                editTask={editTask}
              />
              <Form addTask={addTask} />
            </Route>

            <Route path="/description/:id">
              <Description url={urlAPI} tasks={todos} />
            </Route>
          </Switch>
        </Router>
      </Container>
    </>
  );
}

export default Home;
