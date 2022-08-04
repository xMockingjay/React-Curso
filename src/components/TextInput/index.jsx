import './styles.css';

export const TextInput = ({ actionFn, inputValue }) => {
  return (
    <input
        className="text-input" 
        onChange={actionFn}
        placeholder="Type your search" 
        type="text" 
        value={inputValue} 
    />
  );
}