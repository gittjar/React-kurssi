
// Header.tsx
interface HeaderProps {
    name: string;
  }
  
  export const Header: React.FC<HeaderProps> = ({ name }) => {
    return <h1>{name}</h1>;
  };