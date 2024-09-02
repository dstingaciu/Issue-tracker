import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ISSUES_API_URL } from "../defs";
import axios from "axios";

export default function UpdateIssuePage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    try {
      axios.get(ISSUES_API_URL + id).then((response) =>{
        setTitle(response.data.title);
        setDescription(response.data.description);
        setLoading(false);
      });
      
    } catch (error) {
      console.error('Error fetching issue:', error);
    }
  }, [id]);

  const updateIssue = async (e) => {
    e.preventDefault();
    try {
      await axios.put(ISSUES_API_URL + id, { title, description });
      navigate('/');
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  return (
    <div>
      {loading ? <h2>Loading...</h2> : (
        <>
        <h2>Update Issue</h2>
        <form onSubmit={updateIssue}>
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
          <button type="submit">Update Issue</button>
        </form>
        </>
      )}
      
    </div>
  );
}