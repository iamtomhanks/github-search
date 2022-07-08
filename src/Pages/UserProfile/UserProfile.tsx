import { Avatar, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchUserRepos, useUserProfile } from '../../Hooks';
import './UserProfile.css';
import moment from 'moment';
import { InfiniteScroll } from '../../Components/InfiniteScroll';

const UserProfile = () => {
  const [repoSearchTerm, setRepoSearchTerm] = useState(
    localStorage.getItem('repo-search-term') || ''
  );
  const { username } = useParams();
  const { data: userProfile } = useUserProfile(username);
  const {
    data: userRepos,
    hasNextPage,
    fetchNextPage,
    isLoading
  } = useSearchUserRepos(repoSearchTerm, username);

  useEffect(() => {
    localStorage.setItem('repo-search-term', repoSearchTerm);
  }, [repoSearchTerm]);

  if (!userProfile) return null;

  const { avatarUrl, login, bio, createdAt, email, followers, following, location } = userProfile;

  return (
    <>
      <div className="avatar-and-details">
        <Avatar className="avatar" src={avatarUrl} sx={{ width: 200, height: 200 }} />
        <div>
          <div className="detail">
            <span className="detail-label">Username: </span>
            {login}
          </div>
          {email && (
            <div className="detail">
              <span className="detail-label">Email: </span>
              {email}
            </div>
          )}
          {location && (
            <div className="detail">
              <span className="detail-label">Location: </span>
              {location}
            </div>
          )}
          <div className="detail">
            <span className="detail-label">Join Date: </span>
            {moment(createdAt).format('MMM DD, YYYY')}
          </div>
          <div className="detail">
            <span className="detail-label">Followers: </span>
            {followers?.totalCount || 0}
          </div>
          <div className="detail">
            <span className="detail-label">Following: </span>
            {following?.totalCount || 0}
          </div>
        </div>
      </div>
      <p className="bio">{bio}</p>
      <TextField
        className="repo-search-input"
        value={repoSearchTerm}
        onChange={(e) => setRepoSearchTerm(e.target.value)}
        label={`Search for ${login}'s Repositories`}
        variant="standard"
      />
      <InfiniteScroll showSpinner={hasNextPage || isLoading} onScrollToBottom={fetchNextPage}>
        {userRepos?.pages.map((page) => {
          return page.repos.map((repo) => {
            const { name, forks, stargazers, url } = repo;
            return (
              <a key={name} className="list-item" href={url} target="_blank" rel="noreferrer">
                <span className="repo-name">{name}</span>
                <div className="forks-and-stars">
                  <span>{forks.totalCount} Forks</span>
                  <span>{stargazers.totalCount} Stars</span>
                </div>
              </a>
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
};

export { UserProfile };
