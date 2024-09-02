import axios from "axios";
import React, { useEffect, useState } from "react";
import { ISSUES_API_URL } from "../defs";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [updateTriggered, setUpdateTriggered] = useState(true);

  useEffect(() => {
    if(updateTriggered) {
      try {
        axios.get(ISSUES_API_URL).then((response) => {
          setIssues(response.data);
        });
      } catch (error) {
        return 'error'
      }
      setUpdateTriggered(false);
    }
  }, [updateTriggered])


  const deleteIssue = async (id) => {
    try {
      await axios.delete(ISSUES_API_URL + id);
      setUpdateTriggered(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Active issues</h2>

      {issues.length === 0 ? (
        <h3>No issues found :(</h3>
      ): 
      <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(issue => (
              <tr key={issue._id}>
                <td>{issue.title}</td>
                <td>{issue.description}</td>
                <td>
                  <Button variant="contained" color="primary" herf={`/update/${issue._id}`}>Edit</Button>
                  {' | '}
                  <Button type="submit" variant="contained" color="secondary" onClick={() => deleteIssue(issue._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
    </div>
  )
}