import { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import User from './components/user/user.component';
import { UserType } from './types/user';
import Pagination from './components/pagination/pagination.component';

const fetchUsers = async (url: string): Promise<UserType[]> => {
  const response = await fetch(url);
  return await response.json();
}

function App() {

  const [users, setUsers] = useState<UserType[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const pageSize:number = 6;

  useEffect(() => {
    const getTotalPages = async () => {
      const data = await fetchUsers('https://jsonplaceholder.typicode.com/users');
      const totalPages = Math.ceil(data.length / pageSize);
      setTotalPages(totalPages);
    }

    getTotalPages();
  }, [])

  useEffect(() => {
    getUsersPerPage();
    console.log("page: " + page);
    console.log("users: " + users.toString());
  }, [page])

  const getUsersPerPage = async () : Promise<void> => {
    const data = await fetchUsers('https://jsonplaceholder.typicode.com/users');
    const start = page*pageSize;
    const end = start + pageSize;
    const usersPerPage = data.slice(start, end);

    setUsers(usersPerPage);
  }

  // const handleClick = (pageNumber: number): void => {
  //   setPage(pageNumber - 1);
  // }
  const handlePageClick = (pageNumber: number): void => {
    setPage(pageNumber);
  }

  return (
    <div className="App">
      <div className="users-container">
        {
          users.map((user) => (
            <User user={user} />
          ))
        }
      </div>
      
      {/* <div>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => handleClick(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div> */}
       <Pagination totalPages={totalPages} currentPage={page} onPageChange={handlePageClick} />
    </div>
  );
}

export default App;
