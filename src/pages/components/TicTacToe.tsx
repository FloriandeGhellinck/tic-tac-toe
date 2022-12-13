import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { updateConstructorTypeNode, updateJsxFragment } from 'typescript';

type Container = number[];

type Dictionary<T> = { [key: string]: T };

interface GameContainers {
  rows: Container;
  columns: Container;
  diagonal: Container;
  inverseDiagonal: Container;
}

const INITIAL_SCORE = {
  X: 0,
  O: 0,
};

const TicTacToe = () => {
  const [board, setBoard] = useState<string[][]>([]);
  const [player, setPlayer] = useState<string>('X');
  const [status, setStatus] = useState<string>('');
  const [containers, setContainers] = useState<Dictionary<GameContainers>>();
  const [score, setScore] = useState<Dictionary<number>>(INITIAL_SCORE);

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);

    setContainers({
      O: {
        rows: Array(3).fill(0),
        columns: Array(3).fill(0),
        diagonal: Array(3).fill(0),
        inverseDiagonal: Array(3).fill(0),
      },
      X: {
        rows: Array(3).fill(0),
        columns: Array(3).fill(0),
        diagonal: Array(3).fill(0),
        inverseDiagonal: Array(3).fill(0),
      },
    });

    setStatus('');

    setPlayer('X');
  };

  useEffect(() => {
    resetGame();
  }, []);

  const checkDraw = () =>
    board.every((row) => row.every((cell) => cell !== ''));

  const checkWinner = () => {
    const currentPlayerContainers = containers![player];
    if (currentPlayerContainers.rows.some((value) => value === 3)) {
      return true;
    }
    if (currentPlayerContainers.columns.some((value) => value === 3)) {
      return true;
    }
    if (currentPlayerContainers.diagonal.every((value) => value === 1)) {
      return true;
    }
    if (currentPlayerContainers.inverseDiagonal.every((value) => value === 1)) {
      return true;
    }
    return false;
  };

  const updatePlayer = () => {
    setPlayer(player === 'O' ? 'X' : 'O');
  };

  const updateScore = () => {
    const newScore = { ...score };

    newScore[player] += 1;

    setScore(newScore);
  };

  const updateGame = () => {
    if (checkWinner()) {
      setStatus('won');

      updateScore();

      setTimeout(() => {
        resetGame();
      }, 2000);

      return;
    }

    if (checkDraw()) {
      setStatus('draw');

      setTimeout(() => {
        resetGame();
      }, 2000);
    }
    updatePlayer();
  };

  const handleCellClick = (
    evt: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    // console.log(evt);
    const { currentTarget } = evt;
    // console.log(currentTarget);
    const { id } = currentTarget;
    console.log(id);

    const [_, rowIndex, cellIndex] = id.split('-');

    const newBoard = [...board];
    newBoard[+rowIndex][+cellIndex] = player;
    // (
    //   <Image href='../../../public/O_bright.svg' alt='O bright' />
    // );

    setBoard(newBoard);

    const newContainers = { ...containers };
    newContainers[player].rows[+rowIndex] += 1;
    newContainers[player].columns[+cellIndex] += 1;

    if (cellIndex === rowIndex) {
      newContainers[player].diagonal[+cellIndex] += 1;
    }
    if (+rowIndex + +cellIndex === 3 - 1) {
      newContainers[player].inverseDiagonal[+cellIndex] += 1;
    }

    setContainers(newContainers);
    updateGame();
  };

  const renderStatusOverlay = () => {
    if (status === '') return;

    let message = '';

    if (status === 'draw') {
      message = 'Draw';
    }

    if (status === 'won') {
      message = `${player} won`;
    }

    return (
      <div className='absolute inset-0 w-full h-full font-bold text-2xl flex items-center justify-center bg-gray-600'>
        <p className='w-11/12 break-words'>{message}</p>
      </div>
    );
  };

  const renderBoard = () => {
    return (
      <div className='h-full w-full bg-white grid grid-cols-3 grid-rows-3'>
        {board.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            const identifier = `cell-${rowIndex}-${cellIndex}`;
            return (
              <div
                className='border flex justify-center items-center '
                id={identifier}
                key={identifier}
                onClick={handleCellClick}
                onKeyDown={handleCellClick}
                role='button'
                tabIndex={3 * rowIndex * cellIndex}
              >
                {cell !== '' && (
                  <Image
                    src={`/images/${cell}_dark.svg`}
                    alt={`Cell ${identifier}`}
                    className='h-11/12 w-11/12'
                    width={1}
                    height={1}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    );
  };

  const renderPlayerScore = (player: string) => (
    <>
      <p className='font-bold text-2xl mb-3'>Player {player}</p>
      <p className='text-5xl md:text-7xl'>{score[player]}</p>
    </>
  );

  return (
    <div>
      <section className='bg-gray-300 py-16 text-center px-4 md:px-section h-screen flex flex-col justify-center '>
        <h2 className='text-3xl mb-5 font-bold'>Tic Tac Toe</h2>
        <p className='text-xl mb-6'> Welcome to play a game</p>
        <div className='flex flex-row flex-wrap justify-between items-center w-full md:px-10 lg:px-20'>
          <div className='hidden : md:block'>{renderPlayerScore('X')}</div>
          <div className='relative mx-0 md:mx-4 w-96 h-96 border-gray-800 mb-10 md:mb-0'>
            {renderStatusOverlay()}
            {renderBoard()}
          </div>
          <div className='block md:hidden'>{renderPlayerScore('X')}</div>
          <div>{renderPlayerScore('O')}</div>
        </div>
        <p className='mt-10 text-2xl md:text-3xl'>Time here</p>
      </section>
    </div>
  );
};

export default TicTacToe;
