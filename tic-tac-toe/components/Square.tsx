type Player = "X" | "O" | "BOTH" | null;

export default function ({
    winner,
    value,
    onClick
}: {
    winner: Player;
    value: Player;
    onClick: () => void;
}) {
    // 값이 없을 경우 onClick 함수를 통해 데이터를 변경하고 disabled 처리함
    if (!value) {
        return (
            <button
                className="square"
                onClick={onClick}
                disabled={Boolean(winner)}
            ></button>
        );
    }
    // 값이 정해진 칸일 경우 그 값으로 채워줌
    return (
        <button
            className={`square square_${value.toLocaleLowerCase()}`}
            onClick={onClick}
        >
            {value}
        </button>
    );
}
