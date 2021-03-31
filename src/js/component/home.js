import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

Form.propTypes = {
	inputValue: PropTypes.string,
	setInputValue: PropTypes.func,
	setTodos: PropTypes.func,
	todos: PropTypes.array
};

function Form(props) {
	const submitHandler = event => {
		event.preventDefault();
		if (props.inputValue === "") {
			alert("write down a task");
		} else {
			props.setTodos([
				...props.todos,
				{
					label: props.inputValue,
					id: props.todos.length,
					done: false
				}
			]);
			props.setInputValue("");
			console.log(props.inputValue);
			console.log(props.todos);

			updateList();
		}
	};

	let fetchUrl = "https://assets.breatheco.de/apis/fake/todos/user/bryanmurl";
	// PUT request using fetch w/ async/await
	const updateList = async () => {
		await fetch(fetchUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(props.todos)
		})
			.then(resp => {
				// Response
				if (resp.ok) {
					alert("Well done, We can do it!!");
				}
			})
			.catch(error => {
				//In case of error
				console.error("Error" + error);
			});
	};

	return (
		<form onSubmit={submitHandler} className="input-group">
			<input
				name="item"
				className="form-control"
				type="text"
				value={props.inputValue}
				onChange={e => props.setInputValue(e.target.value)}
			/>
		</form>
	);
}

TodoList.propTypes = {
	todos: PropTypes.array,
	setTodos: PropTypes.func
};

function TodoList(props) {
	function deleteTask(id) {
		const newList = props.todos.filter(element => element.id !== id);
		props.setTodos(newList);
		deleteToDo();
	}

	let fetchUrl = "https://assets.breatheco.de/apis/fake/todos/user/bryanmurl";
	// PUT request using fetch with async/await
	const deleteToDo = async () => {
		await fetch(fetchUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(props.todos)
		})
			.then(resp => {
				if (resp.ok) {
					alert("Well done!, Good going!");
				}
			})
			.catch(error => {
				//In case of error
				console.error("Error" + error);
			});
	};

	return (
		<ul className="list-group">
			{props.todos.map(todo => (
				<li
					key={todo.id}
					className="form-control d-flex justify-content-between align-items-center">
					{todo.label}
					<button
						onClick={() => deleteTask(todo.id)}
						type="button"
						className="btn btn-outline-danger btn-sm float right delete"
						aria-label="Close">
						<i className="fas fa-times"></i>
					</button>
				</li>
			))}
		</ul>
	);
}

//create your first component
export function Home() {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		let fetchUrl =
			"https://assets.breatheco.de/apis/fake/todos/user/bryanmurl";

		const fetchTodo = async () => {
			let resul = await fetch(fetchUrl)
				.then(res => res.json())
				.then(data => setTodos(data))
				.catch(error => console.error("Error:", error));
			console.log(todos);
		};
		fetchTodo();
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6 mx-auto">
					<div className="d-flex justify-content-center">
						<h1>To Do's List</h1>
					</div>
					<Form
						todos={todos}
						setTodos={setTodos}
						inputValue={inputValue}
						setInputValue={setInputValue}
					/>
					<TodoList setTodos={setTodos} todos={todos} />
				</div>
			</div>
		</div>
	);
}

// //include images into your bundle
// import rigoImage from "../../img/rigo-baby.jpg";

// //create your first component
// export function Home() {
// 	return (
// 		<div className="text-center mt-5">
// 			<h1>Hello Rigo!</h1>
// 			<p>
// 				<img src={rigoImage} />
// 			</p>
// 			<a href="#" className="btn btn-success">
// 				If you see this green button... bootstrap is working
// 			</a>
// 			<p>
// 				Made by{" "}
// 				<a href="http://www.4geeksacademy.com">4Geeks Academy</a>, with
// 				love!
// 			</p>
// 		</div>
// 	);
// }
