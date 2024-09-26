"use client";

import { useState } from "react";
import CreateIssueModal from "../components/CreateIssueModal";
import EditIssueModal from "../components/EditIssueModal";

interface Post {
  id: number;
  title: string;
  description: string;
}

export default function Issues() {
  const [issues, setIssues] = useState([]);
  const [editIssueModal, setEditIssueModal] = useState(false);
  const [editValue, setEditValue] = useState({});

  // Fetch the issues from the API
  const fetchIssues = async () => {
    try {
      const data = await fetch("http://localhost:3001/issues");
      const issues = await data.json();
      setIssues(issues); // Set the issues state
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      setEditIssueModal(true);
      // Call your API to delete the post
      const response = await fetch(`http://localhost:3001/issues/${id}`);
      const issue = await response.json();

      setEditValue(issue);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchIssues();
    } catch (error) {
      // Handle errors here (e.g., show an error notification)
      console.error("Error deleting post:", error);
    }
  };

  const handleDelete = async (id: number) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!isConfirmed) {
      // If the user cancels, exit the function
      return;
    }

    try {
      // Call your API to delete the post
      const response = await fetch(`http://localhost:3001/issues/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Optionally, you can show a success notification
      console.log("Post deleted successfully");
      fetchIssues(); // Refresh the list of issues after deletion
    } catch (error) {
      // Handle errors here (e.g., show an error notification)
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:px-20 sm:py-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl">All Issues</h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {/* Mapping through issues array */}
          {issues.map((post: Post, index: number) => (
            <li
              key={post.id || index}
              className="flex items-center gap-4 mb-4 text-xl"
            >
              <strong>{post.title}</strong>: {post.description}
              <div className="flex items-center gap-1 mt-2">
                <button
                  onClick={() => handleEdit(post.id)}
                  className="mr-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <CreateIssueModal fetchIssues={fetchIssues} />
          <EditIssueModal
            editValue={editValue}
            editIssueModal={editIssueModal}
            setEditIssueModal={setEditIssueModal}
            fetchIssues={fetchIssues}
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>
          Created with love by{" "}
          <a
            className="text-gray-300 hover:text-gray-50 underline"
            href="https://github.com/ArshadChowdhury"
            target="_blank"
          >
            Arshad Chowdhury
          </a>
        </p>
      </footer>
    </div>
  );
}
