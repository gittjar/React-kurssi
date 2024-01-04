// Content.tsx
import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map((part, i) => (
        <div key={i}>
          <h2>{part.name}</h2>
          <p>Exercise count: {part.exerciseCount}</p>
          {part.kind === "basic" && <div className='courseparts'>Description: {part.description}</div>}
          {part.kind === "group" && <p>Group project count: {part.groupProjectCount}</p>}
          {part.kind === "background" && (
            <>
            <div className='courseparts'>
              Description: {part.description}
            </div>
              <p>Background material: {part.backgroundMaterial}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Content;