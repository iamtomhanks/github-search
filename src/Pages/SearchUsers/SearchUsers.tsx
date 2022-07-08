import { Avatar, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InfiniteScroll } from '../../Components/InfiniteScroll';
import { useSearchUsers } from '../../Hooks';
import './SearchUsers.css';

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('search-term') || '');
  const { data, hasNextPage, fetchNextPage, isLoading } = useSearchUsers(searchTerm);

  useEffect(() => {
    localStorage.setItem('search-term', searchTerm);
  }, [searchTerm]);

  return (
    <>
      <TextField
        className="user-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        label="Search for a Github User"
        variant="standard"
      />
      <InfiniteScroll showSpinner={hasNextPage || isLoading} onScrollToBottom={fetchNextPage}>
        {data?.pages?.map((page) => {
          return page.users.map((user) => {
            return (
              <Link key={user.login} className="list-item" to={`/user/${user.login}`}>
                <Avatar className="avatar" src={user.avatarUrl} sx={{ width: 64, height: 64 }} />
                <span className="username">{user.login}</span>
                <span className="repo-count">{user.repositories?.totalCount || 0} Repos</span>
              </Link>
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
};

export { SearchUsers };
