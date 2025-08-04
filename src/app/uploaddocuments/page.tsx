"use client";
import React, { useState } from "react";

const UploadDocument = () => {
  const [form, setForm] = useState({
    title: "",
    file: null,
    type: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!form.title || !form.file || !form.type) {
      alert("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("file", form.file);
      formData.append("type", form.type);
      formData.append("description", form.description);

      const res = await fetch("/api/uploaddocuments", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Document uploaded successfully!");
        setForm({
          title: "",
          file: null,
          type: "",
          description: "",
        });
      } else {
        setMessage("❌ Upload failed:" + (data.message || "Unknown error")  );
      }
    } catch (error) {
      setMessage("❌ An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={() => window.history.back()} style={styles.backButton}>
        ⬅ Back
      </button>

      <h2 style={styles.header}>Upload Document</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Title<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter document title"
          required
          style={styles.input}
        />

        <label style={styles.label}>
          Select File<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="file"
          name="file"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>
          Document Type<span style={{ color: "red" }}>*</span>
        </label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">-- Select Type --</option>
          <option value="PDF">PDF</option>
          <option value="Word">Word</option>
          <option value="Image">Image</option>
          <option value="Other">Other</option>
        </select>

        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional notes or description"
          style={{ ...styles.input, height: "80px", resize: "vertical" }}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fdfdfd",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  backButton: {
    marginBottom: "10px",
    background: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "left",
  },
  header: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    marginTop: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
};

export default UploadDocument;