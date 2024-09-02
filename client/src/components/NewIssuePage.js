import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISSUES_API_URL } from "../defs";

export default function NewIssuePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const createIssue = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ISSUES_API_URL, {title, description});
      navigate('/');
    } catch (error) {
      console.error('error', error);
    }
  }

  return (
    <div>
      <h2>Create New Issue</h2>
      <form onSubmit={createIssue}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Issue</button>
      </form>
    </div>
  );
}