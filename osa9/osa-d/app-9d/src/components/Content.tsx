interface CoursePart {
    name: string;
    exerciseCount: number;
  }
  
  interface ContentProps {
    courseParts: CoursePart[];
  }
  
  export const Content: React.FC<ContentProps> = ({ courseParts }) => {
    return (
      <div>
        {courseParts.map((part) => (
          <p>
            {part.name} {part.exerciseCount}
          </p>
        ))}
      </div>
    );
  };