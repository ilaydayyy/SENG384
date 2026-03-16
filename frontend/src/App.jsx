import { useEffect, useState } from "react";

const API = "http://localhost:5001/api";

function App() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const url = editingId ? `${API}/people/${editingId}` : `${API}/people`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
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
        setMessage(data.error || "Operation failed.");
        return;
      }

      setMessage(editingId ? "Person updated successfully." : "Person added successfully.");
      resetForm();
      fetchPeople();
    } catch (error) {
      setMessage("Server error.");
    }
  };

  const handleEdit = (person) => {
    setFullName(person.full_name);
    setEmail(person.email);
    setEditingId(person.id);
    setMessage(`Editing ${person.full_name}`);
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
      <h1>People Manager</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
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
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={{ padding: "10px 16px" }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {message && <p>{message}</p>}

      <h2>People List</h2>

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
                  <button onClick={() => handleDelete(person.id)}>Delete</button>
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

export default App;