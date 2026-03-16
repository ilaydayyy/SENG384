import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API = "http://localhost:5001/api";

function HomePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) {
      setMessage("Full Name is required.");
      return false;
    }

    if (!email.trim()) {
      setMessage("Email is required.");
      return false;
    }

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await fetch(`${API}/people`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to add person.");
        return;
      }

      setMessage("Person added successfully.");
      setFullName("");
      setEmail("");
    } catch (error) {
      setMessage("Server error.");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Registration</Link>
        <Link to="/people">People List</Link>
      </nav>

      <h1>Registration Form</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ padding: "10px", flex: 1 }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "10px", flex: 1 }}
          />
          <button type="submit" style={{ padding: "10px 16px" }}>
            Add
          </button>
        </div>
      </form>

      {message && <p>{message}</p>}

      <button onClick={() => navigate("/people")} style={{ padding: "10px 16px", marginTop: "10px" }}>
        Go to People List
      </button>
    </div>
  );
}

function PeoplePage() {
  const [people, setPeople] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchPeople = async () => {
    try {
      const res = await fetch(`${API}/people`);
      const data = await res.json();
      setPeople(data);
    } catch (error) {
      setMessage("Failed to fetch people.");
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setEditingId(null);
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) {
      setMessage("Full Name is required.");
      return false;
    }

    if (!email.trim()) {
      setMessage("Email is required.");
      return false;
    }

    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleEdit = (person) => {
    setFullName(person.full_name);
    setEmail(person.email);
    setEditingId(person.id);
    setMessage(`Editing ${person.full_name}`);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!editingId) return;

    try {
      const res = await fetch(`${API}/people/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Update failed.");
        return;
      }

      setMessage("Person updated successfully.");
      resetForm();
      fetchPeople();
    } catch (error) {
      setMessage("Server error.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this person?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API}/people/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Delete failed.");
        return;
      }

      setMessage("Person deleted successfully.");
      fetchPeople();
    } catch (error) {
      setMessage("Server error.");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Registration</Link>
        <Link to="/people">People List</Link>
      </nav>

      <h1>People List</h1>

      {editingId && (
        <form onSubmit={handleUpdate} style={{ marginBottom: "20px" }}>
          <h3>Edit Person</h3>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ padding: "10px", flex: 1 }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "10px", flex: 1 }}
            />
            <button type="submit" style={{ padding: "10px 16px" }}>
              Update
            </button>
            <button type="button" onClick={resetForm} style={{ padding: "10px 16px" }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {message && <p>{message}</p>}

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.length > 0 ? (
            people.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.full_name}</td>
                <td>{person.email}</td>
                <td>
                  <button onClick={() => handleEdit(person)} style={{ marginRight: "8px" }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(person.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No people found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
    </Routes>
  );
}

export default App;