import About from "./About";
import Productcard from "./productcard";
import "./App.css";
function greet() {
  return "Welcome";
}

function student() {
  return {
    name: "sam",
    age: 19
  };
}

function age_checker() {
  const stu = student();
  return stu.age >= 18 ? "Adult" : "Child";
}

function Home() {
  const a = 27;
  const b = 27;
  const name = "sam";
  const stu = student();
  const fruits = ["apple", "mango", "banana"];
  const rollnumbers = [1, 2, 3, 4, 5, 6];

  return (
    <div>
      <h1>HOME COMPONENT</h1>
      <p>number is {a}</p>
      <p>sum is {a + b}</p>
      <p>My name is {name}</p>
      <h2>{greet()}</h2>
      <h2>{name.toUpperCase()}</h2>
      <p> age is {stu.age}</p>
      <h2>roll number = {rollnumbers[2]}</h2>
      <h2>{fruits.join(", ")}</h2>
      <About />
      <h2 style={{ color: "red" }}>
        {name} is an {age_checker()}
      </h2>
      <Productcard 
        name="Iphone 17" 
        price="100000" 
        specs="12gb/512gb" 
        stock={5} 
      />
    </div>
  );
}

export default Home;