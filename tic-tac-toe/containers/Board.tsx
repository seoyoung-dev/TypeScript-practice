import { useEffect, useState } from "react";
import Square from "../components/Square";
type Player = "X" | "O" | "BOTH" | null;

function calculateWinner(squares: Player[]) {
    // 이길 수 있는 모든 경우의 수

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    // 0부터 9까지 도는 for문

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

export default function () {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
        Math.round(Math.random() * 1) === 1 ? "X" : "O"
    );
    // winner: 그 칸을 먹은 사람
    const [winner, setWinner] = useState<Player>(null);

    function setSquareValue(index: number) {
        const newData = squares.map((val, i) => {
            if (i === index) {
                return currentPlayer;
            }
            return val;
        });
        setSquares(newData);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    function reset() {
        setSquares(Array(9).fill(null));
        setWinner(null);
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
    }
    // 클릭할 때마다 위너가 발생했는지 확인해야 함
    useEffect(() => {
        const w = calculateWinner(squares);
        if (w) {
            setWinner(w);
        }

        // 모든 칸이 선택되었는데 승자가 없을 경우
        // filter의 조건: target이 null일 경우
        // 만약 9칸이 다 채워졌다면 빈 배열이 될 것 이고, 이때 length는 0
        // filter한 배열의 결과가 true일 경우 "BOTH"
        // 배열의 결과가 true가 되려면 length가 0이어야 함
        if (!w && !squares.filter((target) => target === null).length) {
            setWinner("BOTH");
        }
        console.log("render");
    });
    return (
        <div>
            {winner && winner !== "BOTH" && <p>Congratulations {winner}!</p>}
            {winner && winner === "BOTH" && (
                <p>
                    Congratulations
                    <br />
                    you're both winners!
                </p>
            )}

            <p>Hey {currentPlayer}, it's your turn!</p>
            <div className="grid">
                {Array(9)
                    .fill(null)
                    .map((_, i) => {
                        return (
                            <Square
                                winner={winner}
                                key={i}
                                onClick={() => setSquareValue(i)}
                                value={squares[i]}
                            />
                        );
                    })}
            </div>
            <button className="reset" onClick={reset}>
                RESET
            </button>
        </div>
    );
}
