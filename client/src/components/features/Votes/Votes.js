import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './Votes.scss';

const Votes = ({ editAndLoadVotes, id, singlePost }) => {
  const voteHandler = (action) => {
    let newVote = singlePost.votes;
    if (action === "up") {
      newVote += 1;
    } else {
      newVote -= 1;
    }
    editAndLoadVotes(id, newVote);
  }

  return (
    <div className="votes">
      <button className="btn-thumb btn-thumb-up" onClick={() => voteHandler("up")}>
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      Votes: {singlePost.votes}
      <button className="btn-thumb btn-thumb-down" onClick={() => voteHandler("down")}>
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>
    </div>
  )
};

export default Votes;
