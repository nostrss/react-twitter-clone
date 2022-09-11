import React, { useState, useEffect } from 'react';
import { dbService } from '../fbase';
import Nweet from '../components/Nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  // const getNweets = async () => {
  //   const dbnweets = await dbService.collection('nweets').get();
  //   dbnweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setNweets((prev) => [nweetObject, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getNweets();
    dbService.collection('nweets').onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: Date.now(),
      creatorID: userObj.uid,
    });
    setNweet('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder=' what is on your mind?'
          maxLength={120}
          onChange={onChange}
          value={nweet}
        />
        <input type='submit' value='Nweet' />
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorID === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
