import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './Votes.scss';

const Votes = ({ editAndLoadVotes, id, singlePost }) => {
  const thumbUpButton = React.createRef();
  const thumbDownButton = React.createRef();
  const voteHandler = (e) => {
    let newVote = singlePost.votes;
    if (!e.currentTarget.disabled) {
      if (e.currentTarget.name === "up") {
        newVote += 1;
        thumbUpButton.current.disabled = true;
        thumbUpButton.current.classList.add('disabled');
      } else {
        newVote -= 1;
        thumbDownButton.current.disabled = true;
        thumbDownButton.current.classList.add('disabled');
      }
      editAndLoadVotes(id, newVote);
    }
  }

  return (
    <div className="votes">
      <button name="up" ref={thumbUpButton} className="btn-thumb btn-thumb-up" onClick={(e) => voteHandler(e)}>
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      Votes: {singlePost.votes}
      <button ref={thumbDownButton} className="btn-thumb btn-thumb-down" onClick={(e) => voteHandler(e)}>
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>
    </div>
  )
};

export default Votes;
