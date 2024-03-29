import './styles.css';

export const Button = ({ disabled, onClick, text }) => (
    <button
        className='button'
        disabled={disabled}
        onClick={onClick}
    >
        {text}
    </button>
);