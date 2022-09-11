import React, { useState } from 'react';
import { dbService } from '../fbase';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure?');
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='Edit Your nweet'
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type='submit' value='update nweet' />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <h4>{nweetObj.text} </h4>
      )}

      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete</button>
          <button onClick={toggleEditing}>Edit</button>
        </>
      )}
    </div>
  );
};

export default Nweet;