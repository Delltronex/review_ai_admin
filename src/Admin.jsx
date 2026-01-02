// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./Admin.css";

// function Admin() {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/feedback")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           setData(res.data);
//         } else {
//           setError("Invalid data format from backend");
//         }
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Backend not reachable");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="center">Loading...</p>;
//   if (error) return <p className="error">{error}</p>;
//   if (data.length === 0)
//     return <p className="center">No feedback submitted yet.</p>;

//   const avgRating =
//     data.reduce((sum, item) => sum + item.rating, 0) / data.length;

//   return (
//     <div className="admin-container">
//       <h2>📊 Admin Feedback Dashboard</h2>

//       <div className="metrics">
//         <div className="metric-card">
//           <span>Total Reviews</span>
//           <h3>{data.length}</h3>
//         </div>

//         <div className="metric-card">
//           <span>Average Rating</span>
//           <h3>{avgRating.toFixed(2)}</h3>
//         </div>
//       </div>

//       <hr />

//       <div className="table-wrapper">
//         <table>
//           <thead>
//             <tr>
//               <th>Timestamp</th>
//               <th>Rating</th>
//               <th>Review</th>
//               <th>AI Response</th>
//               <th>Summary</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.timestamp}</td>
//                 <td>{row.rating}</td>
//                 <td>{row.review}</td>
//                 <td>{row.ai_response}</td>
//                 <td>{row.summary}</td>
//                 <td>{row.recommended_action}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Admin;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./Admin.css";

// function Admin() {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/feedback")
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           // ✅ sort latest first
//           const sorted = [...res.data].sort(
//             (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//           );
//           setData(sorted);
//           setFilteredData(sorted);
//         } else {
//           setError("Invalid data format from backend");
//         }
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Backend not reachable");
//         setLoading(false);
//       });
//   }, []);

//   // ✅ Search filter
//   useEffect(() => {
//     if (!search.trim()) {
//       setFilteredData(data);
//     } else {
//       const lower = search.toLowerCase();
//       const result = data.filter((row) =>
//         Object.values(row).some(
//           (val) =>
//             val &&
//             val.toString().toLowerCase().includes(lower)
//         )
//       );
//       setFilteredData(result);
//     }
//   }, [search, data]);

//   if (loading) return <p className="center">Loading...</p>;
//   if (error) return <p className="error">{error}</p>;
//   if (data.length === 0)
//     return <p className="center">No feedback submitted yet.</p>;

//   const avgRating =
//     data.reduce((sum, item) => sum + item.rating, 0) / data.length;

//   // ✅ show only recent 5
//   const recentFive = filteredData.slice(0, 5);

//   return (
//     <div className="admin-container">
//       <h2>📊 Admin Feedback Dashboard</h2>

//       <div className="metrics">
//         <div className="metric-card">
//           <span>Total Reviews</span>
//           <h3>{data.length}</h3>
//         </div>

//         <div className="metric-card">
//           <span>Average Rating</span>
//           <h3>{avgRating.toFixed(2)}</h3>
//         </div>
//       </div>

//       {/* 🔍 Search */}
//       <div className="search-box">
//         <input
//           type="text"
//           placeholder="Search past feedback..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <span>
//           Showing {recentFive.length} of {filteredData.length}
//         </span>
//       </div>

//       <hr />

//       <div className="table-wrapper">
//         <table>
//           <thead>
//             <tr>
//               <th>Timestamp</th>
//               <th>Rating</th>
//               <th>Review</th>
//               <th>AI Response</th>
//               <th>Summary</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recentFive.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.timestamp}</td>
//                 <td>{row.rating}</td>
//                 <td>{row.review}</td>
//                 <td>{row.ai_response}</td>
//                 <td>{row.summary}</td>
//                 <td>{row.recommended_action}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Admin;



import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const PAGE_SIZE = 5;

function Admin() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/feedback")
      .then((res) => {
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setData(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError("Backend not reachable");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="center">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (data.length === 0)
    return <p className="center">No feedback submitted yet.</p>;

  // 🔍 Search filter
  const filtered = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 📄 Pagination logic
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedData = filtered.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const avgRating =
    data.reduce((sum, r) => sum + r.rating, 0) / data.length || 0;

  return (
    <div className="dashboard">
      <h2>📊 Admin Feedback Dashboard</h2>

      {/* Metrics */}
      <div className="stats">
        <div className="stat-card">
          <p>Total Reviews</p>
          <h3>{data.length}</h3>
        </div>
        <div className="stat-card">
          <p>Average Rating</p>
          <h3>{avgRating.toFixed(2)}</h3>
        </div>
      </div>

      {/* Search */}
      <div className="table-header">
        <h3>All Feedback</h3>
        <input
          type="text"
          placeholder="Search feedback..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page on search
          }}
        />
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Rating</th>
                <th>Review</th>
                <th>AI Response</th>
                <th>Summary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, i) => (
                <tr key={i}>
                  <td>{row.timestamp}</td>
                  <td>
                    <span className={`badge rating-${row.rating}`}>
                      {row.rating} ★
                    </span>
                  </td>
                  <td>{row.review}</td>
                  <td>{row.ai_response}</td>
                  <td>{row.summary}</td>
                  <td>{row.recommended_action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ← Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;

