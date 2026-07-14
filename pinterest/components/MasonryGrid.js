'use client';
import { List } from 'react-window';
import { useState, useEffect, useCallback } from 'react';

export default function MasonryGrid({ photos, children: PhotoCard }) {
  const [columnCount, setColumnCount] = useState(3);
  const cardHeight = 280; // image height + padding

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumnCount(2);
      else if (width < 1024) setColumnCount(3);
      else setColumnCount(4);
    };
    updateColumns();  
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Transform photos into rows for the list
  const rows = [];
  for (let i = 0; i < photos.length; i += columnCount) {
    rows.push(photos.slice(i, i + columnCount));
  }

  const Row = ({ index, style }) => (
    <div style={style} className="flex gap-4 justify-center">
      {rows[index].map((photo, idx) => (
        <div key={photo.id} className="flex-1 min-w-0">
          {PhotoCard({ photo, index: index * columnCount + idx })}
        </div>
      ))}
    </div>
  );

  return (
    <List
      height={window.innerHeight - 120}
      itemCount={rows.length}
      itemSize={cardHeight}
      width="100%"
    >
      {Row}
    </List>
  );
}