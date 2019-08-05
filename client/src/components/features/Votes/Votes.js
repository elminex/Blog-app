import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Votes = ({ editAndLoadVotes, id, singlePost }) => {
  console.log(singlePost);

  const voteHandler = (action) => {
    let newVote = singlePost.votes;
    if (action === "up") {
      newVote += 1;
      console.log("+1")
    } else {
      console.log("-1")
      newVote -= 1;
    }
    console.log(newVote);
    editAndLoadVotes(id, newVote);
  }

  return (
    <div>
      Votes: {singlePost.votes}
      <button onClick={() => voteHandler("up")}><FontAwesomeIcon icon={faThumbsUp} /></button>
      <button onClick={() => voteHandler("down")}><FontAwesomeIcon icon={faThumbsDown} /></button>
    </div>
  )
};

export default Votes;
