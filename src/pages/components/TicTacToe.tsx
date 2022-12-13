import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState<string[][]>([]);

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', 'X', ''],
      ['0', '', ''],
    ]);
  };

  useEffect(() => {
    resetGame();
  }, []);

  const handleCellClick = (
    evt: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>
  ) => {
    const { currentTarget } = evt;
    console.log(currentTarget);
  };

  const renderBoard = () => {
    return (
      <div className='h-full w-full bg-white grid grid-cols-3 grid-rows-3'>
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              className='border flex justify-center items-center'
              key={Math.random()}
              onClick={handleCellClick}
            >
              {cell}
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div>
      <section className='bg-gray-300 py-16 text-center px-4 md:px-section h-screen flex flex-col justify-center '>
        <h2 className='text-3xl mb-5 font-bold'>Tic Tac Toe</h2>
        <p className='text-xl mb-6'> Welcome to play a game</p>
        <div className='flex flex-row flex-wrap justify-between items-center w-full'>
          <div className='hidden : md:block'>Score 1</div>
          <div className='relative mx-0 md:mx-4 w-96 h-96 border-gray-800 mb-10 md:mb-0'>
            {renderBoard()}
          </div>
          <div className='block md:hidden'>Score 1</div>
          <div>Score 2</div>
        </div>
        <p className='mt-10 text-2xl md:text-3xl'>Time here</p>
      </section>
    </div>
  );
};

export default TicTacToe;
