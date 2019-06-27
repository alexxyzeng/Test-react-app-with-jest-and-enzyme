import React, { useState } from 'react';
import styles from './index.css';

export default function() {
  const [myState, setMyState] = useState('Welcome to Umi');
  const changeState = () => setMyState('Welcome to Jest and Enzyme');
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
        </li>
        <li>
          <div id="intro">{myState}</div>
          <button onClick={changeState}>Change</button>
        </li>
      </ul>
    </div>
  );
}
