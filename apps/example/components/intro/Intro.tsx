import React, { FC } from 'react';

const Intro: FC = () => {
  return (
    <div className={'mb-5'}>
      <h1 className="text-4xl font-bold">
        TantoKit <span className={'text-medium font-normal'}>by Ronin</span>
      </h1>
      <p className={'italic mt-1'}>
        Tantokit is a powerful library designed to simplify the management of wallet connections for Ronin DApps,
        providing seamless integration and enhanced user experience.
      </p>
    </div>
  );
};

export default Intro;
